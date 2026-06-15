<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useGlobalMusicPlayer } from '../../composables/useGlobalMusicPlayer'

const {
  nowPlaying,
  isPlaying,
  currentTime,
  duration,
  progress,
  togglePlayPause,
  seekTo,
  formatTime,
} = useGlobalMusicPlayer()

const isMinimized = ref(false)
const PLAYER_UI_STORAGE_KEY = 'certifiedclown:player:minimized'

onMounted(() => {
  const saved = window.localStorage.getItem(PLAYER_UI_STORAGE_KEY)
  if (saved === 'true') {
    isMinimized.value = true
    return
  }

  if (saved === 'false') {
    isMinimized.value = false
    return
  }

  if (window.matchMedia('(max-width: 640px)').matches) {
    isMinimized.value = true
  }
})

watch(isMinimized, (value) => {
  window.localStorage.setItem(PLAYER_UI_STORAGE_KEY, String(value))
})

function onSeek(event: Event) {
  const next = Number((event.target as HTMLInputElement).value)
  seekTo(next)
}

</script>

<template>
  <Transition name="player-slide">
    <div
      v-if="nowPlaying"
      class="player-floating"
      :class="{ 'player-floating--minimized': isMinimized }"
      role="region"
      aria-label="Now playing"
    >
      <div class="player-bar sketch-box" :class="{ 'player-bar--minimized': isMinimized }">
        <div class="player-bar__inner">
          <button
            class="player-bar__playbtn"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            @click="togglePlayPause"
          >
            {{ isPlaying ? '⏸' : '▶' }}
          </button>

          <div class="player-bar__info">
            <div class="player-bar__track-name">
              <span class="player-bar__release">{{ nowPlaying.releaseTitle }}</span>
              <span class="player-bar__sep" aria-hidden="true"> - </span>
              <span class="player-bar__title">{{ nowPlaying.trackTitle }}</span>
            </div>

            <div v-if="!isMinimized" class="player-bar__progress-row">
              <span class="player-bar__time" aria-label="Current time">{{ formatTime(currentTime) }}</span>
              <input
                type="range"
                class="player-bar__seek"
                :min="0"
                :max="duration || 100"
                :value="currentTime"
                :style="{ '--progress': `${progress}%` }"
                @input="onSeek"
                aria-label="Seek"
              />
              <span class="player-bar__time" aria-label="Total duration">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <div v-if="!isMinimized" class="player-bar__wave" aria-hidden="true">
            <span v-if="isPlaying" class="player-bar__wave-text">♪ ♫ ♪</span>
          </div>

          <button
            class="player-bar__toggle"
            type="button"
            :aria-label="isMinimized ? 'Expand player' : 'Minimize player'"
            @click="isMinimized = !isMinimized"
          >
            {{ isMinimized ? '▴' : '▾' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style src="./GlobalMusicPlayer.css" scoped></style>
