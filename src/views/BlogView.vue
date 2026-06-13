<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { blogPosts } from '../data/mediaData'

interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  rot: string
  url: string
}

const posts = blogPosts as BlogPost[]
const selectedPostId = ref(posts[0]?.id ?? 0)

const isLoading = ref(false)
const errorMessage = ref('')
const renderedHtml = ref('')

const selectedPost = computed(() =>
  posts.find((post) => post.id === selectedPostId.value)
)

function resolveFetchUrl(rawUrl: string): string {
  if (
    import.meta.env.DEV &&
    rawUrl.startsWith('https://f003.backblazeb2.com/')
  ) {
    return `/b2/${rawUrl.replace('https://f003.backblazeb2.com/', '')}`
  }

  return rawUrl
}

async function loadPost(post: BlogPost | undefined) {
  if (!post) {
    renderedHtml.value = ''
    errorMessage.value = 'No post selected.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch(resolveFetchUrl(post.url))
    if (!response.ok) {
      throw new Error(`Failed to fetch post (${response.status})`)
    }

    const markdown = await response.text()
    const parsedHtml = await marked.parse(markdown)
    renderedHtml.value = DOMPurify.sanitize(parsedHtml)
  } catch (error) {
    renderedHtml.value = ''
    if (error instanceof TypeError) {
      errorMessage.value = 'Could not load this post. This usually means the bucket CORS policy is missing for fetch().'
    } else {
      errorMessage.value = 'Could not load this post right now. Please try again later.'
    }
  } finally {
    isLoading.value = false
  }
}

watch(selectedPost, (post) => {
  void loadPost(post)
})

onMounted(() => {
  void loadPost(selectedPost.value)
})
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
        :class="{ 'blog-post--active': post.id === selectedPostId }"
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
          <button
            class="btn-sketch btn-sketch--blue blog-post__read"
            type="button"
            @click="selectedPostId = post.id"
          >
            read more →
          </button>
        </div>
      </li>
    </ul>

    <!-- ── Markdown article ───────────────────────── -->
    <article class="blog-reader sketch-box animate-in" aria-live="polite">
      <header class="blog-reader__header" v-if="selectedPost">
        <h2 class="blog-reader__title">{{ selectedPost.title }}</h2>
        <p class="blog-reader__meta">{{ selectedPost.date }}</p>
      </header>

      <p v-if="isLoading" class="blog-reader__loading">Loading...</p>
      <p v-else-if="errorMessage" class="blog-reader__error">{{ errorMessage }}</p>
      <div
        v-else
        class="blog-reader__content markdown-body"
        v-html="renderedHtml"
      ></div>
    </article>

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

.blog-post--active {
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

/* ── Reader ──────────────────────────────────────── */
.blog-reader {
  margin: 0 0 2rem;
  padding: 1.25rem 1.4rem;
  background: var(--paper-dark);
}

.blog-reader__header {
  border-bottom: 2px dashed rgba(28, 19, 10, 0.25);
  margin-bottom: 1rem;
  padding-bottom: 0.6rem;
}

.blog-reader__title {
  font-size: clamp(1.2rem, 3.5vw, 1.55rem);
  margin-bottom: 0.25rem;
}

.blog-reader__meta {
  margin: 0;
  color: var(--ink-faint);
  font-family: var(--font-display);
  font-size: 0.8rem;
}

.blog-reader__loading,
.blog-reader__error {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  letter-spacing: 0.03em;
}

.blog-reader__loading {
  color: var(--ink-mid);
  display: inline-block;
  animation: jitter 0.2s steps(2, end) infinite;
}

.blog-reader__error {
  color: #8c2f2f;
}

.blog-reader__content {
  color: var(--ink);
  line-height: 1.7;
}

.blog-reader__content :deep(h1),
.blog-reader__content :deep(h2),
.blog-reader__content :deep(h3) {
  margin-top: 1.2rem;
  margin-bottom: 0.55rem;
}

.blog-reader__content :deep(p),
.blog-reader__content :deep(ul),
.blog-reader__content :deep(ol),
.blog-reader__content :deep(blockquote) {
  margin: 0.75rem 0;
}

.blog-reader__content :deep(pre) {
  background: rgba(28, 19, 10, 0.07);
  border: 1.5px solid rgba(28, 19, 10, 0.18);
  border-radius: 5px;
  padding: 0.75rem;
  overflow-x: auto;
}

.blog-reader__content :deep(code) {
  font-size: 0.92em;
}

@keyframes jitter {
  0% {
    transform: translate(0, 0) rotate(-0.2deg);
  }
  100% {
    transform: translate(1px, -1px) rotate(0.2deg);
  }
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
