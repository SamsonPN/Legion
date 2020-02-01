<template>
  <div 
    id="app">
    <Header 
      v-if="isNotLoginPage"/>
    <router-view />
  </div>
</template>

 <script>
//  import { mapActions } from 'vuex';
 import Header from '../Header/Header';
   export default {
     name: "app",
     components: {
       Header
     },
    // methods: mapActions(['fetchCharacters', 'fetchPresets']),
    // created(){
    //   this.fetchCharacters();
    //   this.fetchPresets();
    // },
    computed: {
      isNotLoginPage(){
        return this.$route.path !== '/';
      }
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
