<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

type NavId = 'home' | 'writings' | 'music' | 'fanzines'

const tabs: { id: NavId; label: string; icon: string; to: string }[] = [
  { id: 'home'    , label: 'Home'    , icon: '🏠', to: '/'         },
  { id: 'writings', label: 'Writings', icon: '✏️', to: '/writings' },
  { id: 'music'   , label: 'Music'   , icon: '🎵', to: '/music'    },
  { id: 'fanzines', label: 'Fanzines', icon: '📋', to: '/fanzines' }
]

const activeSection = computed<NavId>(() => {
  if (route.path.startsWith('/writings')) {
    return 'writings'
  }
  if (route.path.startsWith('/music')) {
    return 'music'
  }
  if (route.path.startsWith('/fanzines')) {
    return 'fanzines'
  }
  return 'home'
})
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <!-- Site logo / wordmark -->
      <RouterLink class="navbar__logo" to="/" aria-label="Go to home">
        <span class="navbar__logo-text">certified<span class="navbar__logo-accent">clown</span></span>
      </RouterLink>

      <!-- Tab navigation -->
      <nav class="navbar__tabs" aria-label="Main navigation">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.id"
          class="navbar__tab"
          :class="{ 'navbar__tab--active': activeSection === tab.id }"
          :to="tab.to"
          :aria-current="activeSection === tab.id ? 'page' : undefined"
        >
          <span class="navbar__tab-icon" aria-hidden="true">{{ tab.icon }}</span>
          <span class="navbar__tab-label">{{ tab.label }}</span>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<style src="./Navbar.css" scoped></style>
