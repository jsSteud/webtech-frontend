<template>
<nav>
    <router-link to="/">Mein Trainingsplan | </router-link>
    <router-link to="/getall">Alle Übungen | </router-link>
    <router-link to="/createnew">Neue Übung</router-link>
</nav>
  <router-view/>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=League+Spartan&display=swap');


#app {
    font-family: 'League Spartan', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
nav {
    padding: 20px;
    text-align: center;
    font-size: 120%;
    /*background-color: white;*/

}

nav a {
    font-weight: bold;
    color: #d6d6d6;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: #4f9b8f;
}

body{
    margin: 0;
}

</style>
<script setup>
</script>