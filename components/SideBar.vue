<template>
    <div class="app">
      <div class="sidebar">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <ul class="nav-menu">
                <h3 class="sidebar-title">SideBar Menu</h3>
                <li><i class="bi bi-house"></i> Home</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

  <style lang="scss" scoped>
  .app {
    display: flex;
    overflow-x: hidden; 
  }
  
  .sidebar {
    width: 200px;
    background-color: #333;
    color: white;
    height: 100vh;
    padding: 10px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 1000; /* Ensure sidebar is above other content */
    transition: transform 0.3s ease;
  }
  
  .sidebar-open {
    transform: translateX(0);
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
  
  li {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    padding: 8px 0;
    cursor: pointer;
    transition: background-color 0.2s ease; 
  }
  
  li:hover {
    background-color: #444;
  }
  
  i {
    font-size: 22px;
  }
  
  .toggle-button {
    position: fixed;
    top: 20px;
    left: 10px;
    background: none;
    border: none;
    color: white;
    background: #333;
    padding: 10px;
    border-radius: 10px;
    font-size: 24px;
    cursor: pointer;
    z-index: 1100;
  }
  
  .toggle-button:hover {
    color: #ccc;
  }

  .nav-menu {
    margin-top: 20px;
    li {
        margin-top: 20px;
    }
  }
  .sidebar-title {
    font-size: 24px;
  }
  </style>
  
