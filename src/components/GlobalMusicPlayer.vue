<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useGlobalMusicPlayer } from '../composables/useGlobalMusicPlayer'

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

<style scoped>
.player-floating {
  position: fixed;
  left: 50%;
  bottom: calc(0.75rem + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  width: min(860px, calc(100% - 1.25rem));
  z-index: 200;
}

.player-floating--minimized {
  width: min(560px, calc(100% - 1.25rem));
}

.player-bar {
  width: 100%;
  margin: 0;
  background: var(--paper-dark);
  padding: 0.85rem 1.1rem;
  transform: rotate(-0.2deg);
}

.player-bar--minimized {
  padding: 0.55rem 0.75rem;
}

.player-bar__inner {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.player-bar__playbtn {
  background: var(--ink);
  color: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.12s ease, transform 0.1s ease;
  box-shadow: var(--shadow-sketch-sm);
}
.player-bar__playbtn:hover {
  background: var(--ink-mid);
  transform: scale(1.08);
}
.player-bar__playbtn:active {
  transform: scale(0.95);
}

.player-bar__info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.player-bar__track-name {
  font-family: var(--font-display);
  font-size: 0.82rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.player-bar__release {
  color: var(--ink-faint);
  font-size: 0.76rem;
}
.player-bar__sep {
  color: var(--ink-faint);
  margin: 0 0.2em;
}
.player-bar__title {
  font-weight: 700;
  color: var(--ink);
}

.player-bar--minimized .player-bar__track-name {
  font-size: 0.78rem;
}

.player-bar__progress-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.player-bar__time {
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--ink-faint);
  flex-shrink: 0;
  min-width: 2.5em;
}
.player-bar__time:last-child {
  text-align: right;
}

.player-bar__seek {
  -webkit-appearance: none;
  appearance: none;
  flex: 1;
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    var(--ink) var(--progress, 0%),
    rgba(28, 19, 10, 0.18) var(--progress, 0%)
  );
  outline: none;
  cursor: pointer;
  border: none;
}
.player-bar__seek::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 1px 1px 0 var(--ink);
}
.player-bar__seek::-moz-range-thumb {
  width: 14px;
  height: 14px;
  background: var(--paper);
  border: 2px solid var(--ink);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 1px 1px 0 var(--ink);
}

.player-bar__wave {
  flex-shrink: 0;
  font-size: 0.75rem;
  min-width: 3.5em;
  text-align: right;
}

.player-bar__toggle {
  border: 2px solid var(--ink);
  background: var(--paper);
  color: var(--ink);
  border-radius: 4px 8px 5px 8px / 8px 4px 8px 5px;
  min-width: 2rem;
  height: 2rem;
  font-family: var(--font-display);
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: var(--shadow-sketch-sm);
  transition: transform 0.12s ease, background 0.12s ease, color 0.12s ease;
}

.player-bar__toggle:hover {
  transform: translateY(-1px);
  background: var(--ink);
  color: var(--paper);
}

.player-bar__wave-text {
  letter-spacing: 0.15em;
  animation: bounce-wave 1.2s ease-in-out infinite alternate;
}

@keyframes bounce-wave {
  from { letter-spacing: 0.1em; opacity: 0.8; }
  to   { letter-spacing: 0.25em; opacity: 1; }
}

@media (max-width: 640px) {
  .player-floating {
    width: calc(100% - 0.75rem);
    bottom: calc(0.5rem + env(safe-area-inset-bottom));
  }

  .player-floating--minimized {
    width: calc(100% - 1.25rem);
  }

  .player-bar {
    padding: 0.75rem 0.8rem;
  }

  .player-bar--minimized {
    padding: 0.5rem 0.65rem;
  }

  .player-bar__toggle {
    min-width: 1.85rem;
    height: 1.85rem;
  }
}

.player-slide-enter-active,
.player-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.player-slide-enter-from,
.player-slide-leave-to {
  opacity: 0;
  transform: translateY(12px) rotate(-0.5deg);
}
</style>
