<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

type NavId = 'home' | 'writings' | 'music' | 'fanzines'

const tabs: { id: NavId; label: string; icon: string; to: string }[] = [
  { id: 'home', label: 'Home', icon: '🏠', to: '/' },
  { id: 'writings', label: 'Writings', icon: '✏️', to: '/writings' },
  { id: 'music', label: 'Music', icon: '🎵', to: '/music' },
  { id: 'fanzines', label: 'Fanzines', icon: '📋', to: '/fanzines' },
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

<style scoped>
/* ── Navbar shell ─────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: var(--paper);
  /* top border looks like a hand-drawn top rule */
  border-bottom: 2.5px solid var(--ink);
  /* subtle under-shadow */
  box-shadow: 0 3px 0 rgba(28, 19, 10, 0.06);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: min(960px, 100%);
  margin: 0 auto;
  padding: 0.6rem 1.25rem;
}

/* ── Logo / wordmark ─────────────────────────────── */
.navbar__logo {
  display: inline-block;
  background: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: var(--ink);
  letter-spacing: -0.01em;
  transition: transform 0.15s ease;
  text-decoration: none;
}
.navbar__logo:hover {
  transform: rotate(-1.5deg) scale(1.04);
}
.navbar__logo-accent {
  color: var(--red);
}

/* ── Tab buttons ─────────────────────────────────── */
.navbar__tabs {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.navbar__tab {
  display: flex;
  align-items: center;
  gap: 0.3em;
  background: none;
  border: 2px solid transparent;
  border-radius: 3px 9px 4px 8px / 8px 3px 9px 4px;
  padding: 0.3em 0.85em;
  font-family: var(--font-display);
  font-size: 0.95rem;
  color: var(--ink-mid);
  cursor: pointer;
  transition:
    border-color 0.12s ease,
    background   0.12s ease,
    color        0.12s ease,
    transform    0.12s ease,
    box-shadow   0.12s ease;
  text-decoration: none;
}

.navbar__tab-icon {
  font-size: 0.9em;
  line-height: 1;
}

.navbar__tab:hover {
  border-color: var(--ink);
  color: var(--ink);
  box-shadow: var(--shadow-sketch-sm);
  transform: translateY(-1px) rotate(-0.5deg);
}

/* Active state — filled tab that looks stamped */
.navbar__tab--active {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--paper);
  box-shadow: var(--shadow-sketch-sm);
  transform: translateY(-1px);
}
.navbar__tab--active:hover {
  transform: translateY(-2px) rotate(-0.5deg);
  box-shadow: 3px 3px 0 var(--ink-mid);
}

/* ── Responsive: stack on narrow screens ───────── */
@media (max-width: 520px) {
  .navbar__inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .navbar__tab-icon {
    display: none; /* keep it tight on mobile */
  }
}
</style>
