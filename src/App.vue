<template>
<nav>
    <router-link to="/">Mein Trainingsplan</router-link> |
    <router-link to="/getall">Alle Übungen</router-link>
</nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
nav {
    padding: 20px;
    text-align: center;
    background-color: #E0D26C;
    ;
}

nav a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;
}

nav a.router-link-exact-active {
    color: #6c7ae0;
}

body{
    margin: 0;
}

</style>
