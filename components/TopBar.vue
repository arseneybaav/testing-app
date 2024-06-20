<template>
<div class="top-bar">
    <div class="container">
        <div class="bar">
            <h1>Testing App</h1>
            <div class="user-info">
                <span>User Name</span>
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        logout() {

        }
    }
}
</script>

<style lang="scss" scoped>
.top-bar {
    background-color: #333;
}

.bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    color: white;
}

.user-info {
    display: flex;
    gap: 20px;
    
    span {
        margin: auto;
    }
}
</style>
