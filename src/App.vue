<template>
  <div id="app">
    <MovieList />
    <footer></footer>
  </div>
</template>

<script setup>
import MovieList from './components/MovieList.vue';
</script>

<style>
/* Global styles */
body {
  padding: 0;
  margin: 0;
  background: black;
  height: 100%;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: bold;
}
#app {
  display: grid;
  grid-template-rows: 1fr 200px;
  height: 100vh;
  overflow: hidden;
}

footer {
  background-color: #841f1f;
  bottom: 0;
}
</style>
