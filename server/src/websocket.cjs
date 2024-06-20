const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8081 });

const DEFAULT_COLOR = '#FF0000';

const components = [
  { id: 'Part #1', color: '#6CB2EB' },
  { id: 'Part #2', color: '#9FE6A0' },
  { id: 'Part #3', color: '#FFC154' },
];

wss.on('connection', ws => {
  components.forEach(component => {
    ws.send(JSON.stringify({ elementId: component.id, color: component.color }));
  });

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
    try {
      const data = JSON.parse(message);
      const { elementId, color } = data;
      const component = components.find(c => c.id === elementId);
      if (component) {
        component.color = color;
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ elementId, color }));
          }
        });
      } else {
        console.log(`Component ${elementId} not found.`);
        ws.send(JSON.stringify({ elementId, color: DEFAULT_COLOR }));
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
      ws.send(JSON.stringify({ elementId: data.elementId, color: DEFAULT_COLOR }));
    }
  });
});

console.log('WebSocket server running on ws://localhost:8081 / By Arseney <:');
