<template>
  <div class="movie-list">
    <div
      class="movie-item"
      v-for="groupedMovie in groupedMovies"
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
            src="/session/VP_Black_.png"
            alt=""
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
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
// import boxOfficeData from '@/assets/json/0725-BoxOffice.json';

const boxOfficeData = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}json/0725-BoxOffice.json`
    );
    boxOfficeData.value = await response.json();
  } catch (error) {
    console.error('Error fetching the data: ', error);
  }
});

const groupedMovies = computed(() => {
  const grouped = {};
  const currentTime = new Date();

  // check if data has been fetched
  if (!boxOfficeData.value || !boxOfficeData.value.BoxOffice) {
    return [];
  }

  boxOfficeData.value.BoxOffice.forEach(movie => {
    const movieTime = parseTime(movie.time);

    if (movieTime > currentTime) {
      const key = `${getAudioType(movie.audio)}-${movie.movie}-${
        movie.censorship
      }-${movie.exhibition}`;

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

  return Object.values(grouped);
});

function getVipClass(vip) {
  switch (vip) {
    case 'S':
      return 'vip-premiere';
    case 'H':
      return 'hybrid-premiere';
    case 'N':
      return 'regular-movie';
    default:
      return 'regular-movie';
  }
}

function getCensorship(censorship) {
  switch (censorship) {
    case '1':
      return `${process.env.BASE_URL}/censure/1.png`;
    case '2':
      return `${process.env.BASE_URL}/censure/2.png`;
    case '3':
      return `${process.env.BASE_URL}/censure/3.png`;
    case '4':
      return `${process.env.BASE_URL}/censure/4.png`;
    case '5':
      return `${process.env.BASE_URL}/censure/5.png`;
    case '6':
      return `${process.env.BASE_URL}/censure/6.png`;
    case '13':
      return `${process.env.BASE_URL}/censure/13.png`;
    case '14':
      return `${process.env.BASE_URL}/censure/14.png`;
    case '15':
      return `${process.env.BASE_URL}/censure/15.png`;
    case '16':
      return `${process.env.BASE_URL}/censure/16.png`;
    case '17':
      return `${process.env.BASE_URL}/censure/17.png`;
    case '18':
      return `${process.env.BASE_URL}/censure/18.png`;
    default:
      return '';
  }
}

function getSessionClass(places, time) {
  const currentTime = new Date();
  const movieTime = parseTime(time);

  const timeDiff = (movieTime - currentTime) / 60000;

  if (places === 'L') {
    return 'session-sold-out';
  } else if (timeDiff > 0 && timeDiff <= 15) {
    return 'session-starting-soon';
  } else {
    switch (places) {
      case 'M':
        return 'session-available';
      case 'P':
        return 'session-few';
      default:
        return '';
    }
  }
}

function getAudioType(audioCode) {
  switch (audioCode) {
    case 'D':
      return 'DUB';
    case 'L':
      return 'LEG';
    case 'V':
      return 'ORI';
    default:
      return 'Unknown';
  }
}

function getImage(exhibition) {
  switch (exhibition) {
    case 'NO':
      return '/session/2D_Black_.png';
    case '3D':
      return '/session/3D_Black_.png';
    case 'XD':
      return '/session/XD_Black_.png';
    case 'X3':
      return {
        threeD: '/session/3D_Black_.png',
        xD: '/session/XD_Black_.png',
      };
    default:
      return '';
  }
}

function parseTime(timeStr) {
  if (!timeStr) {
    console.error('Invalid time string:', timeStr);
    return null; // Return null for invalid inputs
  }

  const parts = timeStr.split('h');
  if (parts.length !== 2) {
    console.error('Time string is not properly formatted:', timeStr);
    return null;
  }

  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);

  if (isNaN(hours) || isNaN(minutes)) {
    console.error('Time parts are not numbers:', parts);
    return null;
  }

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function formatTime(timeStr) {
  const date = parseTime(timeStr);
  if (!date) {
    return 'Invalid time';
  }

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
