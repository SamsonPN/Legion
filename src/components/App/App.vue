<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

 <script>
 import Header from '../Header/Header';
   export default {
     name: "app",
     components: {
       Header
     }
   }
 </script>
 
<style>
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

  #app{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background-image: url('../../assets/Header-Image.jpg');
    background-size: cover;
    font-family: 'Nunito', sans-serif;
  }
</style>
