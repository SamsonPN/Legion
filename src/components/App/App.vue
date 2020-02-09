<template>
  <div 
    id="app">
    <Header v-if="isNotLoginPage"/>
    <router-view />
  </div>
</template>

 <script>
 import Header from '../Header/Header';
   export default {
     name: "app",
     components: {
       Header
     },
    computed: {
      isNotLoginPage(){
        return this.$route.path !== '/';
      }
    }
  }
 </script>
 
<style>

  :root {
    --primary-grid-color: #22FF22;
    --grid-background-color: #151515;
    --grid-line-color: gray;
    --outer-stat-color: #22FF22;
    --inner-stat-color: #22FF22;
    --warrior: red;
    --magician: #1414FF;
    --bowman: #90EE90;
    --thief: #4E4EE4;
    --pirate: orange;
    --lab: #4CF7F8;
  }

  html, body {
    font-size: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  textarea, button, input{
    font-family: inherit;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-color: black;
    background-image: url(../../assets/Header-Image.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Nunito', sans-serif;
  }
</style>
