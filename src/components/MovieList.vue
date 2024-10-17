<template>
  <div class="movie-list">
    <div
      class="movie-item"
      v-for="groupedMovie in processedMovies"
      :key="`${groupedMovie.title}-${groupedMovie.audioType}`"
      :class="getVipClass(groupedMovie.vip)"
    >
      <div
        class="movie-title"
        :class="{ 'premiere-title': groupedMovie.vip === 'S' }"
      >
        <span class="audio-type">{{ groupedMovie.audioType }}</span>
        <span class="title-left">
          {{ groupedMovie.title }}
        </span>
        <span class="censorship">
          <img
            class="censorship-img"
            :src="getCensorship(groupedMovie.censorship)"
            alt="censorship"
          />
        </span>
      </div>
      <div
        class="exhibition-type"
        :class="{ 'premiere-exhibition': groupedMovie.vip === 'S' }"
      >
        <div v-if="groupedMovie.vip !== 'S'">
          <div v-if="typeof getImage(groupedMovie.exhibition) === 'object'">
            <img
              :src="getImage(groupedMovie.exhibition).threeD"
              alt="3D exhibition-type"
            />
            <img
              :src="getImage(groupedMovie.exhibition).xD"
              alt="XD exhibition-type"
            />
          </div>
          <div v-else>
            <img
              :src="getImage(groupedMovie.exhibition)"
              alt="exhibition-type"
            />
          </div>
        </div>
        <div v-else>
          <img
            v-if="groupedMovie.vip === 'S'"
            src="session/VP_Black_.png"
            alt="vips Image"
          />
        </div>
      </div>
      <div class="audio-times">
        <span
          v-for="session in groupedMovie.sessions"
          :key="session.time"
          :class="getSessionClass(session.places, session.time)"
          class="time"
        >
          {{ formatTime(session.time) }}
        </span>
      </div>
    </div>
  </div>
  <div v-if="!boxOfficeData || !boxOfficeData.BoxOffice">
    <p>Error loading movie data. Please try again later.</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';

const boxOfficeData = ref(null);
const processedMovies = ref(null);
let intervalId = null;

// function to fetch data from a JSON file
async function fetchBoxOfficeData() {
  try {
    const response = await fetch('json/0725-BoxOffice.json');
    boxOfficeData.value = await response.json();
  } catch (error) {
    console.error('Error fetching the data: ', error);
  }
}

// Run when the component is mounted
onMounted(() => {
  fetchBoxOfficeData();
  // setup interval to fetch data every 1 minute
  intervalId = setInterval(() => {
    fetchBoxOfficeData();
  }, 60000);
});

onUnmounted(() => {
  // clear the interval to prevent memory leak when the component is destroyed
  if (intervalId) {
    clearInterval(intervalId);
  }
});

watch(boxOfficeData, newValue => {
  // if data is not available or invalid, reset the processedMovies
  if (!newValue || !newValue.BoxOffice) {
    processedMovies.value = [];
    return;
  }

  const grouped = {};
  const currentTime = new Date();

  newValue.BoxOffice.forEach(movie => {
    const movieTime = parseTime(movie.time);

    // only include movie with future showtimes
    if (movieTime > currentTime) {
      const key = `${getAudioType(movie.audio)}-${movie.movie}-${
        movie.censorship
      }-${movie.exhibition}`;

      // if the movie is not yet grouped, create a new group
      if (!grouped[key]) {
        grouped[key] = {
          audioType: getAudioType(movie.audio),
          title: movie.movie,
          censorship: movie.censorship,
          exhibition: movie.exhibition,
          vip: movie.vip,
          sessions: [],
        };
      }
      grouped[key].sessions.push({
        time: movie.time,
        places: movie.places,
      });
    }
  });

  processedMovies.value = Object.values(grouped);
});

const vipClasses = {
  S: 'vip-premiere',
  H: 'hybrid-premiere',
  N: 'regular-movie',
};

function getVipClass(vip) {
  return vipClasses[vip];
}

const sessionPlaces = {
  M: 'session-available',
  P: 'session-few',
  L: 'session-sold-out',
};

function getSessionClass(places, time) {
  const timeDiff = (parseTime(time) - new Date()) / 60000;

  if (places === 'L') {
    return 'session-sold-out';
  } else if (timeDiff > 0 && timeDiff <= 15) {
    return 'session-starting-soon';
  }
  return sessionPlaces[places] || '';
}

const audioTypes = {
  D: 'DUB',
  L: 'LEG',
  V: 'ORI',
};

function getAudioType(audioCode) {
  return audioTypes[audioCode] || 'Unknown';
}

function getCensorship(censorship) {
  switch (censorship) {
    case '1':
      return 'censure/1.png';
    case '2':
      return 'censure/2.png';
    case '3':
      return 'censure/3.png';
    case '4':
      return 'censure/4.png';
    case '5':
      return 'censure/5.png';
    case '6':
      return 'censure/6.png';
    case '13':
      return 'censure/13.png';
    case '14':
      return 'censure/14.png';
    case '15':
      return 'censure/15.png';
    case '16':
      return 'censure/16.png';
    case '17':
      return 'censure/17.png';
    case '18':
      return 'censure/18.png';
    default:
      return '';
  }
}

function getImage(exhibition) {
  switch (exhibition) {
    case 'NO':
      return 'session/2D_Black_.png';
    case '3D':
      return 'session/3D_Black_.png';
    case 'XD':
      return 'session/XD_Black_.png';
    case 'X3':
      return {
        threeD: 'session/3D_Black_.png',
        xD: 'session/XD_Black_.png',
      };
    default:
      return '';
  }
}

function parseTime(timeStr) {
  if (!timeStr) return null;

  const [hours, minutes] = timeStr.split('h').map(Number);

  if (isNaN(hours) || isNaN(minutes)) return null;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatTime(timeStr) {
  const date = parseTime(timeStr);
  if (!date) return 'Invalid time';

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}
</script>

<style scoped>
/* Premiere Gradient Style */
.premiere-title {
  background: linear-gradient(to right, #d8b67e, #643f11);
}

.premiere-exhibition {
  background: linear-gradient(to top, #d8b67e, #643f11);
  border-radius: 8px;
}

.premiere-icon {
  width: 50px;
  height: auto;
  margin-left: 10px;
}

.time {
  margin: 5px;
}

/* .vip-premiere {
  background-color: gold;
} */
.session-starting-soon {
  background-color: green !important;
  color: white;
}

.session-sold-out {
  background-color: red !important;
  color: white;
}

.movie-list {
  gap: 20px;
  margin: 20px 50px;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.movie-item {
  display: grid;
  grid-template-columns: 2fr 100px 1fr;
  grid-template-rows: auto;
  align-items: stretch;
  gap: 10px;
}

.movie-title,
.exhibition-type,
.time {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 5px;
}

.movie-title,
.exhibition-type,
.time {
  background-color: #cccccc;
  min-height: 50px;
}

.audio-type {
  background-color: #383431;
  color: #dfcbb9;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
}

.title-left {
  flex-grow: 1;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
}

.censorship-img {
  width: 50px;
}
.exhibition-type,
.time {
  display: flex;
  justify-content: center;
}

.exhibition-type img {
  width: 80px;
}
.audio-times {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.time {
  border-radius: 5px;
  min-height: 50px;
  min-width: 60px;
}

.highlight {
  background-color: #4caf50;
}

@media (max-width: 768px) {
  .movie-list {
    margin: 5px;
    min-height: 80vh;
  }

  .movie-item {
    grid-template-columns: 2fr 50px 1fr;
  }

  .exhibition-type img {
    width: 30px;
  }

  .movie-title {
    min-width: 50px;
  }
  .movie-title {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .time {
    margin: 0;
  }

  .audio-times {
    gap: 5px;
  }
  /* .movie-list {
    margin: 10px 20px;
  } */
}
</style>
