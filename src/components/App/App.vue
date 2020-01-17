<template>
  <div 
    id="app"
    @contextmenu.prevent="">
    <Header />
    <router-view/>
  </div>
</template>

 <script>
 import { mapActions } from 'vuex';
 import Header from '../Header/Header';
   export default {
     name: "app",
     components: {
       Header
     },
    methods: mapActions(['fetchCharacters', 'fetchPresets']),
    created(){
      this.fetchCharacters();
      this.fetchPresets();
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
    background-position: center;
    background-size: cover;
    font-family: 'Nunito', sans-serif;
  }
</style>
