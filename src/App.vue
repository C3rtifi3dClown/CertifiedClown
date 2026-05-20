<script setup lang="ts">
import { ref } from 'vue'
import type { Component } from 'vue'
import Navbar from './components/Navbar.vue'
import HomeView from './views/HomeView.vue'
import BlogView from './views/BlogView.vue'
import MusicView from './views/MusicView.vue'
import FanzinesView from './views/FanzinesView.vue'

export type Tab = 'home' | 'blog' | 'music' | 'fanzines'

const activeTab = ref<Tab>('home')

const views: Record<Tab, Component> = {
  home:     HomeView,
  blog:     BlogView,
  music:    MusicView,
  fanzines: FanzinesView,
}
</script>

<template>
  <!--
    Hidden SVG filter definitions — apply via CSS:
      filter: url(#sketch-wobble)
    on pseudo-elements to make borders look wobbly.
  -->
  <svg width="0" height="0" aria-hidden="true" style="position:absolute;pointer-events:none">
    <defs>
      <filter id="sketch-wobble" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="3"
                      result="noise" seed="7" />
        <feDisplacementMap in="SourceGraphic" in2="noise"
                           scale="3" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <filter id="sketch-wobble-sm" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3"
                      result="noise" seed="11" />
        <feDisplacementMap in="SourceGraphic" in2="noise"
                           scale="2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>

  <div id="app-shell">
    <Navbar :active-tab="activeTab" @change="activeTab = ($event as Tab)" />

    <main class="main-content">
      <Transition name="page" mode="out-in">
        <component :is="views[activeTab]" :key="activeTab" />
      </Transition>
    </main>

    <footer class="site-footer">
      made with ♥ &amp; too much coffee — certifiedclown
    </footer>
  </div>
</template>

<style>
/* ── Page transition ─────────────────────────────── */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px) rotate(-0.5deg);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px) rotate(0.5deg);
}

/* ── App shell layout ────────────────────────────── */
#app-shell {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
