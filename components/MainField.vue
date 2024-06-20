<template>
    <div class="mainfield">
      <h1>Circuit</h1>
      <svg width="800" height="400">
        <g v-for="(component, index) in components" :key="index" :transform="'translate(' + (100 + index * 250) + ', 200)'">
          <rect x="-80" y="-60" width="120" height="120" :fill="component.color" @click="openDialog(component.id)" />
          <text x="-20" y="4" font-size="14" fill="black" text-anchor="middle">{{ component.id }}</text>
        </g>
      </svg>
  
      <Modal :isOpen="isModalOpen" :componentId="modalComponentId" @close="closeModal" />
    </div>
  </template>
  
  
  <script>
  import Modal from '@/components/Modal.vue';
  
  export default {
    components: {
      Modal,
    },
    data() {
      return {
        components: [
          { id: 'Part #1', color: '#6CB2EB' },
          { id: 'Part #2', color: '#9FE6A0' },
          { id: 'Part #3', color: '#FFC154' },
        ],
        isModalOpen: false,
        modalComponentId: '',
        originalColor: '',
        websocket: null,
      };
    },
    mounted() {
      this.websocket = new WebSocket('ws://localhost:8081');
  
      this.websocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const component = this.components.find(c => c.id === data.elementId);
        if (component) {
          component.color = data.color;
        }
      };
    },
    methods: {
      openDialog(componentId) {
        this.isModalOpen = true;
        this.modalComponentId = componentId;
  
        const component = this.components.find(c => c.id === componentId);
        if (component) {
          this.originalColor = component.color;
        }
  
        this.websocket.send(JSON.stringify({ elementId: componentId, color: 'red' }));
      },
      closeModal() {
        this.isModalOpen = false;
        const component = this.components.find(c => c.id === this.modalComponentId);
        if (component && this.originalColor !== '') {
          component.color = this.originalColor;
  
          // Отправка
          this.websocket.send(JSON.stringify({ elementId: this.modalComponentId, color: this.originalColor }));

          this.originalColor = '';
        }
        this.modalComponentId = '';
      },
    },
  };
  </script>
  
  
  <style scoped>
  .mainfield {
    margin: auto;
  }
  
  rect {
    stroke: #333;
    stroke-width: 2;
  }
  
  text {
    font-family: Arial, sans-serif;
    text-anchor: middle;
  }
  </style>
  