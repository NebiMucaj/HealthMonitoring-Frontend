<template>
  <div id="app">
    <router-view/>
    <Footer/>
   </div>
    
   
  
  
</template>

<script>
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
   Footer
    
  }
}
</script>

<style>

 #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: azure;
      height: 100vh;
    }
    #logoutbutton {
        transition-duration: 0.4s;
        background-color: white;
        border: #008CBA 1px solid;
        padding: 2vw;
        text-align: center;
        text-decoration: none;
        display: block;
        font-size: 2vw;
        margin: 4px 2px;
        cursor: pointer;

    }
    #logoutbutton:hover {
        background-color: #008CBA; 
        color: white;
    }

</style>
