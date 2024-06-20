<template>
  <div class="info-field" :class="{ connected: websocketStatus === 'Connected', disconnected: websocketStatus === 'Disconnected', error: websocketStatus === 'Error', hidden: isHidden }">
    <button class="toggle-button" @click="toggleVisibility">
      <i class="bi" :class="{'bi-chevron-down': !isHidden, 'bi-chevron-up': isHidden}"></i> {{ isHidden ? 'Show Info' : 'Hide Info' }}
    </button>
    <p v-show="!isHidden">Status: {{ websocketStatus }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websocketStatus: 'Disconnected',
      websocket: null,
      isHidden: false,
      reconnectInterval: 3000,
      maxReconnectAttempts: 10,
      currentReconnectAttempts: 0
    };
  },
  mounted() {
    this.connectWebSocket();
  },
  methods: {
    connectWebSocket() {
      this.websocket = new WebSocket('ws://localhost:8081');

      this.websocket.onopen = () => {
        this.websocketStatus = 'Connected';
        this.currentReconnectAttempts = 0;
      };

      this.websocket.onclose = () => {
        this.websocketStatus = 'Disconnected';
        if (!this.websocket || this.websocket.readyState !== WebSocket.CLOSED) {
          this.reconnectWebSocket();
        }
      };

      this.websocket.onerror = () => {
        this.websocketStatus = 'Error';
        this.reconnectWebSocket();
      };
    },
    reconnectWebSocket() {
      if (this.currentReconnectAttempts < this.maxReconnectAttempts) {
        setTimeout(() => {
          this.currentReconnectAttempts++;
          this.connectWebSocket();
        }, this.reconnectInterval);
      } else {
        console.log('Exceeded maximum reconnect attempts.');
      }
    },
    toggleVisibility() {
      this.isHidden = !this.isHidden;
    }
  },
  beforeDestroy() {
    if (this.websocket) {
      this.websocket.close();
    }
  }
};
</script>

<style scoped>
.info-field {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px;
  transition: all 0.3s ease;
}

.toggle-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
}

.bi {
  font-size: 1.5rem;
  margin-right: 5px;
}

.hidden {
  height: 20;
  padding: 0;
}

.hidden p {
  display: none;
}

.connected {
  background-color: #28a745;
}

.disconnected {
  background-color: #dc3545;
}

.error {
  background-color: #ffc107;
}
</style>
