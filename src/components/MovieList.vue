<template>
  <div class="movie-list">
    <MovieItem />
  </div>
</template>

<script setup>
import MovieItem from './MovieItem.vue';
</script>

<style>
.movie-list {
  gap: 20px;
  margin: 20px 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

@media (max-width: 768px) {
  .movie-list {
    margin: 5px;
    min-height: 80vh;
  }
}
</style>
