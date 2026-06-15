<script setup lang="ts">
import { musicReleases } from '../../data/mediaData.js'
import { useGlobalMusicPlayer } from '../../composables/useGlobalMusicPlayer.js'

const { nowPlaying, isPlaying, selectTrack } = useGlobalMusicPlayer()
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

  </div>
</template>

<style src="./MusicView.css" scoped></style>
