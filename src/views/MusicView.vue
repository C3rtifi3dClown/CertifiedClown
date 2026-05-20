<script setup lang="ts">
import { ref } from 'vue'

const releases = [
  {
    id: 1,
    title: 'Untitled EP',
    year: '2024',
    tracks: [
      { n: 1, title: 'intro (for no reason)',  duration: '1:32' },
      { n: 2, title: 'something loud',          duration: '3:04' },
      { n: 3, title: 'something quieter',       duration: '2:48' },
      { n: 4, title: 'end credits',             duration: '4:11' },
    ],
    rot: '-1deg',
    color: '#ffe8e0',
  },
  {
    id: 2,
    title: 'Loose Tracks 2023',
    year: '2023',
    tracks: [
      { n: 1, title: 'voice memo at midnight',  duration: '0:58' },
      { n: 2, title: 'bedroom session #3',       duration: '2:21' },
      { n: 3, title: 'unfinished thing (demo)',  duration: '1:47' },
    ],
    rot: '0.8deg',
    color: '#e8f0ff',
  },
]

// Tiny fake player state — just for UI demo
const playingTrack = ref<string | null>(null)

function togglePlay(key: string) {
  playingTrack.value = playingTrack.value === key ? null : key
}
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
        v-for="release in releases"
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

        <!-- Track list -->
        <ol class="cassette__tracklist" aria-label="Tracks">
          <li
            v-for="track in release.tracks"
            :key="track.n"
            class="cassette__track"
            :class="{ 'cassette__track--playing': playingTrack === `${release.id}-${track.n}` }"
          >
            <button
              class="cassette__play-btn"
              :aria-label="playingTrack === `${release.id}-${track.n}` ? 'Pause' : 'Play'"
              @click="togglePlay(`${release.id}-${track.n}`)"
            >
              {{ playingTrack === `${release.id}-${track.n}` ? '⏸' : '▶' }}
            </button>
            <span class="cassette__track-num">{{ String(track.n).padStart(2, '0') }}</span>
            <span class="cassette__track-title">{{ track.title }}</span>
            <span class="cassette__track-dur">{{ track.duration }}</span>
          </li>
        </ol>

        <!-- Currently playing indicator -->
        <div v-if="release.tracks.some(t => playingTrack === `${release.id}-${t.n}`)"
             class="cassette__playing-bar" aria-live="polite">
          <span class="cassette__playing-wave" aria-hidden="true">♪ ♫ ♪ ♫ ♪</span>
          now playing…
        </div>
      </article>
    </div>

    <!-- ── Placeholder note ───────────────────────── -->
    <div class="music-note sketch-box animate-in">
      <p>
        🎛️ <strong>Note:</strong> these are placeholder UI elements — no actual audio is wired up yet.
        Drop your audio files in <code>/public/audio/</code> and swap the play handler
        with the HTML5 <code>&lt;audio&gt;</code> API or a library like Howler.js.
      </p>
    </div>

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
</style>
