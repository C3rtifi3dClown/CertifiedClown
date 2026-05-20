<script setup lang="ts">
import type { Tab } from '../App.vue'

defineProps<{ activeTab: Tab }>()
const emit = defineEmits<{ change: [tab: Tab] }>()

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home',     label: 'Home',     icon: '🏠' },
  { id: 'blog',     label: 'Writings', icon: '✏️' },
  { id: 'music',    label: 'Music',    icon: '🎵' },
  { id: 'fanzines', label: 'Fanzines', icon: '📋' },
]
</script>

<template>
  <header class="navbar">
    <div class="navbar__inner">
      <!-- Site logo / wordmark -->
      <button class="navbar__logo" @click="emit('change', 'home')" aria-label="Go to home">
        <span class="navbar__logo-text">certified<span class="navbar__logo-accent">clown</span></span>
      </button>

      <!-- Tab navigation -->
      <nav class="navbar__tabs" aria-label="Main navigation">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="navbar__tab"
          :class="{ 'navbar__tab--active': activeTab === tab.id }"
          @click="emit('change', tab.id)"
          :aria-current="activeTab === tab.id ? 'page' : undefined"
        >
          <span class="navbar__tab-icon" aria-hidden="true">{{ tab.icon }}</span>
          <span class="navbar__tab-label">{{ tab.label }}</span>
        </button>
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  color: var(--ink);
  letter-spacing: -0.01em;
  transition: transform 0.15s ease;
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
