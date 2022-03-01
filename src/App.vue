<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/signin">Sign In</router-link> |
    <router-link to="/signup">Sign Up</router-link>
  </div> -->
  <router-view></router-view>

 
</template>

<script setup>
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;900&display=swap");

#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Merriweather", serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #242520;
  margin-top: 60px;
  background-color: #dc7a1f;
  height: 100vh;
  padding: 0;
  margin: 0;
}

</style>
