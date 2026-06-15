<script setup lang="ts">
import { blogPosts } from '../../data/mediaData'
import type { BlogPost } from '../../data/mediaData'

const posts = blogPosts as BlogPost[]
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
          <RouterLink
            class="btn-sketch btn-sketch--blue blog-post__read"
            :to="{ name: 'writing-post', params: { slug: post.slug } }"
          >
            read more →
          </RouterLink>
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

<style src="./BlogView.css" scoped></style>
