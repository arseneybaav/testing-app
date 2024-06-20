
<template>
    <div class="modal" v-if="isOpen" @mousedown="startDrag">
      <div class="modal-content" :style="{ top: posY + 'px', left: posX + 'px' }">
        <h2>{{ componentId }}</h2>
        <p>Тестовая статичная информация блока {{ componentId }}</p>
        <button @click="closeModal">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isOpen', 'componentId'],
    data() {
      return {
        posX: 0,
        posY: 0,
        isDragging: false,
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      startDrag(e) {
        this.isDragging = true;
        const startX = e.clientX - this.posX;
        const startY = e.clientY - this.posY;
  
        const moveHandler = (e) => {
          if (this.isDragging) {
            this.posX = e.clientX - startX;
            this.posY = e.clientY - startY;
          }
        };
  
        const stopHandler = () => {
          this.isDragging = false;
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', stopHandler);
        };
  
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', stopHandler);
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 400;
    left: 800;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    position: absolute;
    z-index: 1000;
  }
  </style>
  