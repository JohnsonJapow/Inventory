<template>
  
  <div id="app">
    <h3>{{ title }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      title:'Inventory Management Web'
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #c84b2c;
    background-color:#4fedb1ee;
    margin: 0 auto;
    max-width: 600px;
    margin-top:10px;
    padding: 20px;
    box-shadow: 5px 5px 5px 5px rgba(0,0,0,0.1);
    min-height: 50vh;
  }
</style>
