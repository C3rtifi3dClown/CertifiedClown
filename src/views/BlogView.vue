<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: 'Why I Started Making Zines',
    date: 'Mar 2025',
    excerpt:
      "There's something about photocopiers and scissors and glue sticks that no digital tool has ever replicated for me. A meditation on analog creation.",
    tags: ['zines', 'making stuff', 'tangents'],
    rot: '-1.1deg',
  },
  {
    id: 2,
    title: 'Notes on Playing a Show to Seven People',
    date: 'Jan 2025',
    excerpt:
      "Six of whom were my friends. One was a guy who wandered in because it was raining. Best show I've ever played.",
    tags: ['music', 'live', 'small venues'],
    rot: '0.7deg',
  },
  {
    id: 3,
    title: 'On the Art of the Unfinished Project',
    date: 'Nov 2024',
    excerpt:
      "I have seventeen unfinished songs, four half-done zines, and a blog I only just started. Maybe the process is the point?",
    tags: ['process', 'creativity', 'rambling'],
    rot: '-0.6deg',
  },
  {
    id: 4,
    title: 'A Playlist for Rainy Tuesday Afternoons',
    date: 'Sep 2024',
    excerpt:
      "Self-explanatory. A loose collection of songs that feel like grey light through a window.",
    tags: ['music', 'playlist'],
    rot: '1.2deg',
  },
]
</script>

<template>
  <div class="view-container">

    <!-- ── Header ──────────────────────────────────── -->
    <header class="blog-header animate-in">
      <h1 class="section-title">writings &amp; thoughts</h1>
      <p class="blog-header__sub">
        essays, notes, half-baked ideas — updated sporadically
      </p>
    </header>

    <!-- ── Post list ───────────────────────────────── -->
    <ul class="blog-list" aria-label="Blog posts">
      <li
        v-for="post in posts"
        :key="post.id"
        class="blog-post sketch-box animate-in"
        :style="{ '--rot': post.rot }"
      >
        <!-- torn-paper top edge decoration -->
        <div class="blog-post__tear" aria-hidden="true"></div>

        <div class="blog-post__meta">
          <span class="blog-post__date">{{ post.date }}</span>
          <span class="blog-post__num">#{{ String(post.id).padStart(3, '0') }}</span>
        </div>

        <h2 class="blog-post__title">{{ post.title }}</h2>
        <p class="blog-post__excerpt">{{ post.excerpt }}</p>

        <div class="blog-post__footer">
          <div class="blog-post__tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <button class="btn-sketch btn-sketch--blue blog-post__read">
            read more →
          </button>
        </div>
      </li>
    </ul>

    <!-- ── More placeholder ────────────────────────── -->
    <div class="blog-more animate-in">
      <div class="sketch-box blog-more__box">
        <p>📝 more posts coming when inspiration strikes (and deadlines don't)</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* ── Header ──────────────────────────────────────── */
.blog-header {
  padding: 2.5rem 0 0.5rem;
}
.blog-header__sub {
  color: var(--ink-mid);
  font-family: var(--font-display);
  font-size: 0.95rem;
  margin-top: 0.5rem;
  margin-bottom: 0;
}

/* ── Post list ───────────────────────────────────── */
.blog-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding: 0;
  margin: 2rem 0;
}

.blog-post {
  transform: rotate(var(--rot, 0deg));
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  padding: 1.4rem 1.6rem 1.2rem;
}
.blog-post:hover {
  transform: rotate(0deg) translateX(3px);
  box-shadow: 5px 5px 0 var(--ink);
}

/* torn paper top edge — just a wavy line */
.blog-post__tear {
  height: 8px;
  margin: -1.4rem -1.6rem 1rem;
  background: repeating-linear-gradient(
    90deg,
    var(--paper-dark) 0px,
    var(--paper)      4px,
    var(--paper-dark) 8px
  );
  border-bottom: 1.5px solid rgba(28, 19, 10, 0.12);
}

.blog-post__meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-display);
  font-size: 0.78rem;
  color: var(--ink-faint);
  margin-bottom: 0.5rem;
}

.blog-post__title {
  font-size: clamp(1.15rem, 3vw, 1.45rem);
  margin-bottom: 0.5rem;
  line-height: 1.25;
}

.blog-post__excerpt {
  color: var(--ink-mid);
  font-size: 0.98rem;
  line-height: 1.65;
  margin-bottom: 1rem;
}

.blog-post__footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.blog-post__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.blog-post__read {
  flex-shrink: 0;
}

/* ── More placeholder ──────────────────────────── */
.blog-more {
  margin: 1rem 0 2rem;
}
.blog-more__box {
  text-align: center;
  font-family: var(--font-display);
  font-size: 1rem;
  color: var(--ink-mid);
  background: var(--paper-dark);
  transform: rotate(0.3deg);
}
</style>
