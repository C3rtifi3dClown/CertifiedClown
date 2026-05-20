<script setup lang="ts">
const zines = [
  {
    id: 1,
    title: 'Issue #001',
    subtitle: 'everything is fine',
    pages: 16,
    date: 'Oct 2024',
    tags: ['rant', 'collage', 'first issue'],
    color: '#fff3e0',
    rot: '-1.5deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
  },
  {
    id: 2,
    title: 'Issue #002',
    subtitle: 'the loud issue',
    pages: 20,
    date: 'Dec 2024',
    tags: ['music', 'show reviews', 'photos'],
    color: '#fce4ec',
    rot: '1deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
  },
  {
    id: 3,
    title: 'Issue #003',
    subtitle: 'something about winter',
    pages: 12,
    date: 'Feb 2025',
    tags: ['poetry', 'drawings', 'sad'],
    color: '#e8eaf6',
    rot: '-0.6deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
  },
  {
    id: 4,
    title: 'Issue #004',
    subtitle: '???',
    pages: null,
    date: 'coming soon',
    tags: ['tba'],
    color: '#f5f5f5',
    rot: '1.3deg',
    stamp: 'WIP',
    stampColor: '#c0392b',
  },
  {
    id: 5,
    title: 'SPLIT zine',
    subtitle: 'w/ a friend',
    pages: 24,
    date: 'Apr 2025',
    tags: ['collaboration', 'art', 'misc'],
    color: '#e0f7fa',
    rot: '-1deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
  },
  {
    id: 6,
    title: 'Mini #01',
    subtitle: 'pocket sized ramblings',
    pages: 8,
    date: 'May 2025',
    tags: ['mini zine', 'travel'],
    color: '#fff8e1',
    rot: '0.5deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
  },
]
</script>

<template>
  <div class="view-container">

    <!-- ── Header ─────────────────────────────────── -->
    <header class="fanzines-header animate-in">
      <h1 class="section-title">zines &amp; stuff</h1>
      <p class="fanzines-header__sub">
        hand-stapled, poorly photocopied, made with love
      </p>
    </header>

    <!-- ── Info box ───────────────────────────────── -->
    <div class="sketch-box fanzines-info animate-in">
      <p>
        📬 <strong>Want a physical copy?</strong> Get in touch.
        Most issues are free/pay-what-you-want + postage.
      </p>
    </div>

    <!-- ── Zine grid ──────────────────────────────── -->
    <ul class="zines-grid" aria-label="Zine catalogue">
      <li
        v-for="zine in zines"
        :key="zine.id"
        class="zine-card animate-in"
        :style="{ '--rot': zine.rot }"
      >
        <!-- Cover (photocopied look) -->
        <div
          class="zine-card__cover"
          :style="{ '--cover-bg': zine.color }"
        >
          <!-- Halftone grid overlay for that xerox feel -->
          <div class="zine-card__halftone" aria-hidden="true"></div>

          <div class="zine-card__cover-text">
            <span class="zine-card__cover-issue">{{ zine.title }}</span>
            <span class="zine-card__cover-sub">{{ zine.subtitle }}</span>
          </div>

          <!-- Rubber stamp -->
          <div
            class="zine-card__stamp"
            :style="{ '--stamp-color': zine.stampColor }"
            aria-hidden="true"
          >
            {{ zine.stamp }}
          </div>
        </div>

        <!-- Info panel below cover -->
        <div class="zine-card__info">
          <div class="zine-card__meta">
            <span class="zine-card__date">{{ zine.date }}</span>
            <span v-if="zine.pages" class="zine-card__pages">{{ zine.pages }}pp</span>
          </div>

          <div class="zine-card__tags">
            <span v-for="tag in zine.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="zine-card__actions">
            <button class="btn-sketch btn-sketch--blue zine-card__btn">
              download PDF →
            </button>
          </div>
        </div>
      </li>
    </ul>

    <!-- ── Placeholder note ───────────────────────── -->
    <div class="sketch-box fanzines-note animate-in">
      <p>
        🗂️ <strong>PDF placeholder:</strong> link each "download PDF →" button to a file in
        <code>/public/zines/</code>. All zines are placeholder UI — replace
        cover colours &amp; data with your real issues.
      </p>
    </div>

  </div>
</template>

<style scoped>
/* ── Header ──────────────────────────────────────── */
.fanzines-header {
  padding: 2.5rem 0 0.5rem;
}
.fanzines-header__sub {
  color: var(--ink-mid);
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

/* ── Info / note boxes ───────────────────────────── */
.fanzines-info,
.fanzines-note {
  font-size: 0.9rem;
  color: var(--ink-mid);
  background: var(--paper-dark);
  margin: 1rem 0;
}
.fanzines-note {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.fanzines-info code,
.fanzines-note code {
  font-family: monospace;
  background: rgba(28, 19, 10, 0.08);
  padding: 0.1em 0.3em;
  border-radius: 3px;
}

/* ── Zine grid ───────────────────────────────────── */
.zines-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1.4rem;
  padding: 0;
  margin: 1.5rem 0;
}

/* ── Zine card ───────────────────────────────────── */
.zine-card {
  display: flex;
  flex-direction: column;
  transform: rotate(var(--rot, 0deg));
  border: 2.5px solid var(--ink);
  border-radius: 2px 7px 3px 6px / 6px 2px 7px 3px;
  box-shadow: var(--shadow-sketch);
  overflow: hidden;
  background: var(--paper);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.zine-card:hover {
  transform: rotate(0deg) translateY(-4px) scale(1.02);
  box-shadow: 5px 5px 0 var(--ink);
}

/* Cover block */
.zine-card__cover {
  position: relative;
  height: 200px;
  background-color: var(--cover-bg, #fff8e1);
  border-bottom: 2px solid var(--ink);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Halftone/xerox texture overlay */
.zine-card__halftone {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px);
  background-size: 6px 6px;
  pointer-events: none;
}

.zine-card__cover-text {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0.5rem;
}

.zine-card__cover-issue {
  display: block;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
}

.zine-card__cover-sub {
  display: block;
  font-family: var(--font-body);
  font-size: 0.78rem;
  color: var(--ink-mid);
  font-style: italic;
  margin-top: 0.2rem;
}

/* Rubber stamp badge */
.zine-card__stamp {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 2;
  font-family: var(--font-display);
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--stamp-color, #2e7d32);
  border: 2px solid var(--stamp-color, #2e7d32);
  border-radius: 2px 6px 2px 5px / 5px 2px 6px 2px;
  padding: 0.15em 0.4em;
  transform: rotate(8deg);
  opacity: 0.85;
}

/* Info panel */
.zine-card__info {
  padding: 0.7rem 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.zine-card__meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--ink-faint);
}

.zine-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.zine-card__actions {
  margin-top: auto;
  padding-top: 0.25rem;
}

.zine-card__btn {
  font-size: 0.78rem;
  padding: 0.3em 0.7em;
}
</style>
