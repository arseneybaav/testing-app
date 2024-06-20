<template>
    <div>
      <TopBar/>
      <div class="d-flex">
        <SideBar/>
        <MainField/>
        <InfoField/>
        <Dialog/>
      </div>
    </div>
  </template>

  <script setup>
  useHead({
    title: 'Схема'
  })
  </script>
    
  <script>
  import MainField from '../components/MainField.vue';
  import TopBar from '../components/TopBar.vue';
  import SideBar from '../components/SideBar.vue';
  
  export default {
    components: {
      MainField,
      TopBar,
      SideBar
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .d-flex {
    height: 80vh;
  }
  </style>
  