<script setup lang="ts">
import GlobalMusicPlayer from '../../components/GlobalMusicPlayer/GlobalMusicPlayer.vue'
import Navbar from '../../components/Navbar/Navbar.vue'
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
    <Navbar />

    <main class="main-content">
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <GlobalMusicPlayer />

    <footer class="site-footer">
      made with ♥ &amp; too much coffee — certifiedclown
    </footer>
  </div>
</template>

<style src="./App.css"></style>
