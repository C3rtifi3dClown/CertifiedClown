<script setup lang="ts">
import { computed } from 'vue'
import { blogPosts, fanzines } from '../../data/mediaData'

const featuredPost = computed(() => blogPosts[0])
const featuredFanzine = computed(() => fanzines.find((zine) => Boolean(zine.pdfUrl)))
</script>

<template>
  <div class="view-container">

    <!-- ── Hero ──────────────────────────────────────── -->
    <section class="home-hero animate-in">
      <!-- decorative squiggle behind the title -->
      <div class="home-hero__doodle" aria-hidden="true">~~~~~</div>
      <h1 class="home-hero__name">
        hi, i'm<br>
        <span class="home-hero__highlight">CertifiedClown</span>
      </h1>
      <p class="home-hero__tagline">
        musician · zine maker · internet person
      </p>
      <div class="home-hero__tags">
        <span class="tag">🎸 musician</span>
        <span class="tag">📄 writer</span>
        <span class="tag">🎨 zine maker</span>
        <span class="tag">☕ coffee enjoyer</span>
      </div>
    </section>

    <hr class="divider" />

    <!-- ── About ─────────────────────────────────────── -->
    <section class="home-about animate-in">
      <h2 class="section-title">about me</h2>
      <div class="home-about__grid">
        <div class="sketch-box home-about__bio">
          <p>
            Welcome to my corner of the internet. I make music that sounds like
            it was recorded in a basement (because it was), write rambling essays
            nobody asked for, and staple together zines at 2 am.
          </p>
          <p>
            This site is a work in progress — just like me.
            Feel free to poke around.
          </p>
        </div>
        <!-- decorative placeholder avatar -->
        <div class="sketch-box home-about__avatar" aria-hidden="true">
          <div class="home-about__face">
            <div class="home-about__eyes">👀</div>
            <div class="home-about__mouth">:)</div>
          </div>
          <p class="home-about__avatar-label">← me, probably</p>
        </div>
      </div>
    </section>

    <hr class="divider" />

    <!-- ── Recent stuff ───────────────────────────────── -->
    <section class="home-recent animate-in">
      <h2 class="section-title">recent stuff</h2>
      <div class="home-recent__grid">

        <div class="sketch-box home-card animate-in" style="--rot: -1.2deg">
          <div class="home-card__type">✏️ Writing</div>
          <h3 class="home-card__title">{{ featuredPost?.title ?? 'New writing' }}</h3>
          <p class="home-card__body">{{ featuredPost?.excerpt ?? 'Fresh notes from the writings section.' }}</p>
          <RouterLink
            v-if="featuredPost"
            class="btn-sketch btn-sketch--blue home-card__link"
            :to="{ name: 'writing-post', params: { slug: featuredPost.slug } }"
          >
            read →
          </RouterLink>
          <RouterLink v-else class="btn-sketch btn-sketch--blue home-card__link" :to="{ name: 'writings' }">
            browse writings →
          </RouterLink>
        </div>

        <div class="sketch-box home-card animate-in" style="--rot: 0.8deg">
          <div class="home-card__type">🎵 Music</div>
          <h3 class="home-card__title">Untitled EP</h3>
          <p class="home-card__body">Four songs recorded in a panic. Available nowhere for now.</p>
          <RouterLink class="btn-sketch btn-sketch--red home-card__link" :to="{ name: 'music' }">
            listen →
          </RouterLink>
        </div>

        <div class="sketch-box home-card animate-in" style="--rot: -0.5deg">
          <div class="home-card__type">📋 Fanzine</div>
          <h3 class="home-card__title">Issue #001</h3>
          <p class="home-card__body">16 pages of whatever I was thinking about that month.</p>
          <a
            v-if="featuredFanzine?.pdfUrl"
            class="btn-sketch home-card__link"
            :href="featuredFanzine.pdfUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            download →
          </a>
          <RouterLink v-else class="btn-sketch home-card__link" :to="{ name: 'fanzines' }">
            open zines →
          </RouterLink>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
/* ── Hero ──────────────────────────────────────────── */
.home-hero {
  padding: 3rem 0 2rem;
  text-align: center;
}

.home-hero__doodle {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: var(--ink-faint);
  letter-spacing: 0.3em;
  margin-bottom: 0.5rem;
}

.home-hero__name {
  font-size: clamp(2.4rem, 8vw, 5rem);
  line-height: 1.05;
  margin-bottom: 0.6rem;
}

.home-hero__highlight {
  color: var(--red);
  /* hand-underline — uses SVG filter on pseudo */
  position: relative;
}
.home-hero__highlight::after {
  content: '';
  position: absolute;
  left: -3px;
  right: -3px;
  bottom: -4px;
  height: 5px;
  background: var(--yellow);
  transform: rotate(-1deg);
  z-index: -1;
}

.home-hero__tagline {
  font-family: var(--font-display);
  font-size: clamp(1rem, 2.5vw, 1.3rem);
  color: var(--ink-mid);
  margin-bottom: 1.5rem;
}

.home-hero__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

/* ── About grid ──────────────────────────────────── */
.home-about {
  padding: 1rem 0;
}

.home-about__grid {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 560px) {
  .home-about__grid { grid-template-columns: 1fr; }
}

.home-about__bio {
  font-size: 1.05rem;
  line-height: 1.7;
  transform: rotate(-0.4deg);
}

.home-about__avatar {
  width: 140px;
  text-align: center;
  padding: 1rem 0.75rem 0.6rem;
  transform: rotate(1.2deg);
  flex-shrink: 0;
}
.home-about__face {
  font-size: 2rem;
  line-height: 1.3;
}
.home-about__eyes { margin-bottom: 0.15em; }
.home-about__mouth { font-family: var(--font-display); font-size: 1.4rem; }
.home-about__avatar-label {
  font-family: var(--font-display);
  font-size: 0.72rem;
  color: var(--ink-faint);
  margin-top: 0.5rem;
}

/* ── Recent cards ────────────────────────────────── */
.home-recent {
  padding: 1rem 0;
}

.home-recent__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.25rem;
}

.home-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transform: rotate(var(--rot, 0deg));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}
.home-card:hover {
  transform: rotate(0deg) translateY(-2px);
  box-shadow: 5px 5px 0 var(--ink);
}

.home-card__type {
  font-family: var(--font-display);
  font-size: 0.8rem;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.home-card__title {
  font-size: 1.15rem;
  margin: 0;
}
.home-card__body {
  font-size: 0.95rem;
  color: var(--ink-mid);
  flex: 1;
  margin: 0;
}
.home-card__link {
  align-self: flex-start;
  margin-top: 0.25rem;
  font-size: 0.88rem;
}
</style>
