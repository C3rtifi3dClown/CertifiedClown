<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { musicReleases } from '../data/mediaData.js'

// ── Player state ──────────────────────────────────────────
const audioEl = ref<HTMLAudioElement | null>(null)

interface NowPlaying {
  key: string
  releaseTitle: string
  trackTitle: string
  audioUrl: string
}

const nowPlaying  = ref<NowPlaying | null>(null)
const isPlaying   = ref(false)
const currentTime = ref(0)
const duration    = ref(0)

const progress = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
)

// ── Select a track (or toggle play/pause if same track) ───
function selectTrack(
  release: { id: number; title: string },
  track:   { n: number; title: string; audioUrl: string | null }
) {
  if (!track.audioUrl) return

  const key = `${release.id}-${track.n}`
  if (nowPlaying.value?.key === key) {
    togglePlayPause()
    return
  }
  nowPlaying.value = {
    key,
    releaseTitle: release.title,
    trackTitle:   track.title,
    audioUrl:     track.audioUrl,
  }
}

// When audioUrl changes, reload the audio element and autoplay
watch(
  () => nowPlaying.value?.audioUrl,
  async (url) => {
    if (!url || !audioEl.value) return
    audioEl.value.pause()
    isPlaying.value = false
    currentTime.value = 0
    duration.value = 0
    await nextTick()
    audioEl.value.load()
    try {
      await audioEl.value.play()
      isPlaying.value = true
    } catch {
      // Autoplay may be blocked by the browser; user can press play manually
    }
  }
)

// ── Playback controls ─────────────────────────────────────
function togglePlayPause() {
  const el = audioEl.value
  if (!el) return
  if (isPlaying.value) {
    el.pause()
  } else {
    el.play().catch(() => {})
  }
}

function seek(e: Event) {
  const val = Number((e.target as HTMLInputElement).value)
  if (audioEl.value) audioEl.value.currentTime = val
}

function formatTime(s: number): string {
  if (!s || isNaN(s)) return '0:00'
  const m   = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ── Audio element event handlers ──────────────────────────
function onTimeUpdate()     { currentTime.value = audioEl.value?.currentTime ?? 0 }
function onLoadedMetadata() { duration.value    = audioEl.value?.duration    ?? 0 }
function onPlay()           { isPlaying.value   = true  }
function onPause()          { isPlaying.value   = false }
function onEnded()          { isPlaying.value   = false }
</script>

<template>
  <div class="view-container">

    <!-- ── Header ─────────────────────────────────── -->
    <header class="music-header animate-in">
      <h1 class="section-title">sounds &amp; noise</h1>
      <p class="music-header__sub">
        home recordings, demos, and the occasional finished thing
      </p>
    </header>

    <!-- ── Release cards ──────────────────────────── -->
    <div class="music-releases">
      <article
        v-for="release in musicReleases"
        :key="release.id"
        class="cassette sketch-box animate-in"
        :style="{ '--rot': release.rot, '--cassette-bg': release.color }"
      >
        <!-- Cassette tape header (decorative) -->
        <div class="cassette__header">
          <div class="cassette__spool" aria-hidden="true">
            <div class="cassette__spool-inner"></div>
          </div>
          <div class="cassette__label">
            <div class="cassette__label-title">{{ release.title }}</div>
            <div class="cassette__label-year">{{ release.year }}</div>
          </div>
          <div class="cassette__spool" aria-hidden="true">
            <div class="cassette__spool-inner"></div>
          </div>
        </div>

        <!-- Description + tags -->
        <div class="cassette__desc">
          <p class="cassette__desc-text">{{ release.description }}</p>
          <div class="cassette__tags">
            <span v-for="tag in release.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- Track list -->
        <ol class="cassette__tracklist" aria-label="Tracks">
          <li
            v-for="track in release.tracks"
            :key="track.n"
            class="cassette__track"
            :class="{ 'cassette__track--playing': nowPlaying?.key === `${release.id}-${track.n}` }"
          >
            <button
              class="cassette__play-btn"
              :aria-label="nowPlaying?.key === `${release.id}-${track.n}` && isPlaying ? 'Pause' : `Play ${track.title}`"
              @click="selectTrack(release, track)"
            >
              {{ nowPlaying?.key === `${release.id}-${track.n}` && isPlaying ? '⏸' : '▶' }}
            </button>
            <span class="cassette__track-num">{{ String(track.n).padStart(2, '0') }}</span>
            <span class="cassette__track-title">{{ track.title }}</span>
            <span class="cassette__track-dur">{{ track.duration }}</span>
          </li>
        </ol>

        <!-- Per-card "now playing" shimmer when this release is active -->
        <div
          v-if="release.tracks.some(t => nowPlaying?.key === `${release.id}-${t.n}`) && isPlaying"
          class="cassette__playing-bar"
          aria-live="polite"
        >
          <span class="cassette__playing-wave" aria-hidden="true">♪ ♫ ♪ ♫ ♪</span>
          now playing…
        </div>
      </article>
    </div>

    <!-- ── Central player bar ─────────────────────── -->
    <!--
      The hidden <audio> element is mounted here so it persists across
      track changes. Controls are rendered as custom UI below.
    -->
    <audio
      v-if="nowPlaying"
      ref="audioEl"
      :src="nowPlaying.audioUrl"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
      @play="onPlay"
      @pause="onPause"
      @ended="onEnded"
    />

    <Transition name="player-slide">
      <div v-if="nowPlaying" class="player-bar sketch-box" role="region" aria-label="Now playing">
        <div class="player-bar__inner">

          <!-- Play / Pause button -->
          <button
            class="player-bar__playbtn"
            :aria-label="isPlaying ? 'Pause' : 'Play'"
            @click="togglePlayPause"
          >
            {{ isPlaying ? '⏸' : '▶' }}
          </button>

          <!-- Track info + progress row -->
          <div class="player-bar__info">
            <div class="player-bar__track-name">
              <span class="player-bar__release">{{ nowPlaying.releaseTitle }}</span>
              <span class="player-bar__sep" aria-hidden="true"> — </span>
              <span class="player-bar__title">{{ nowPlaying.trackTitle }}</span>
            </div>
            <div class="player-bar__progress-row">
              <span class="player-bar__time" aria-label="Current time">{{ formatTime(currentTime) }}</span>
              <input
                type="range"
                class="player-bar__seek"
                :min="0"
                :max="duration || 100"
                :value="currentTime"
                :style="{ '--progress': `${progress}%` }"
                @input="seek"
                aria-label="Seek"
              />
              <span class="player-bar__time" aria-label="Total duration">{{ formatTime(duration) }}</span>
            </div>
          </div>

          <!-- Animated wave when playing -->
          <div class="player-bar__wave" aria-hidden="true">
            <span v-if="isPlaying" class="cassette__playing-wave">♪ ♫ ♪</span>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<style scoped>
/* ── Header ──────────────────────────────────────── */
.music-header {
  padding: 2.5rem 0 0.5rem;
}
.music-header__sub {
  color: var(--ink-mid);
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

/* ── Release cards grid ──────────────────────────── */
.music-releases {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

/* ── Cassette card ───────────────────────────────── */
.cassette {
  transform: rotate(var(--rot, 0deg));
  padding: 0;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.cassette:hover {
  transform: rotate(0deg) translateY(-3px);
  box-shadow: 5px 5px 0 var(--ink);
}

/* Cassette header (tape reel decoration) */
.cassette__header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 1.1rem;
  background: var(--cassette-bg, #fff8e1);
  border-bottom: 2px solid var(--ink);
}

.cassette__spool {
  width: 38px;
  height: 38px;
  border: 2.5px solid var(--ink);
  border-radius: 50%;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}
.cassette__spool-inner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--ink);
  border-radius: 50%;
  background: var(--paper);
}

.cassette__label {
  flex: 1;
  text-align: center;
}
.cassette__label-title {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
}
.cassette__label-year {
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--ink-faint);
}

/* Track list */
.cassette__tracklist {
  list-style: none;
  padding: 0.6rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.cassette__track {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.4rem;
  border-radius: 3px;
  font-size: 0.92rem;
  transition: background 0.12s ease;
}
.cassette__track:hover {
  background: rgba(28, 19, 10, 0.05);
}
.cassette__track--playing {
  background: rgba(28, 19, 10, 0.08);
  font-weight: 600;
}

.cassette__play-btn {
  background: none;
  border: 1.5px solid var(--ink);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  font-size: 0.65rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 0.1s ease, color 0.1s ease;
}
.cassette__play-btn:hover {
  background: var(--ink);
  color: var(--paper);
}

.cassette__track-num {
  font-family: var(--font-display);
  font-size: 0.75rem;
  color: var(--ink-faint);
  width: 1.8em;
  flex-shrink: 0;
}

.cassette__track-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cassette__track-dur {
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: var(--ink-faint);
  flex-shrink: 0;
}

/* Playing bar */
.cassette__playing-bar {
  padding: 0.4rem 1.1rem;
  background: var(--ink);
  color: var(--paper);
  font-family: var(--font-display);
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cassette__playing-wave {
  letter-spacing: 0.15em;
  animation: bounce-wave 1.2s ease-in-out infinite alternate;
}
@keyframes bounce-wave {
  from { letter-spacing: 0.1em; opacity: 0.8; }
  to   { letter-spacing: 0.25em; opacity: 1; }
}

/* ── Note ────────────────────────────────────────── */
.music-note {
  font-size: 0.9rem;
  color: var(--ink-mid);
  background: var(--paper-dark);
  transform: rotate(-0.3deg);
  margin-bottom: 2rem;
}
.music-note code {
  font-family: monospace;
  background: rgba(28, 19, 10, 0.08);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* ── Description + tags inside cassette ─────────── */
.cassette__desc {
  padding: 0.5rem 1.1rem 0.4rem;
  border-bottom: 1px dashed rgba(28, 19, 10, 0.2);
}
.cassette__desc-text {
  font-size: 0.82rem;
  color: var(--ink-mid);
  margin-bottom: 0.4rem;
}
.cassette__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

/* ── Central player bar ──────────────────────────── */
.player-bar {
  margin: 1.5rem 0 2rem;
  background: var(--paper-dark);
  padding: 0.85rem 1.1rem;
  transform: rotate(-0.2deg);
}

.player-bar__inner {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

/* Large play/pause button */
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

/* Track info column */
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

/* Progress row */
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

/* Seek slider — custom cross-browser styling */
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

/* Wave decoration */
.player-bar__wave {
  flex-shrink: 0;
  font-size: 0.75rem;
  min-width: 3.5em;
  text-align: right;
}

/* ── Player slide-up transition ──────────────────── */
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
