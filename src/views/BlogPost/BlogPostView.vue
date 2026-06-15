<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { blogPosts } from '../../data/mediaData'
import type { BlogPost } from '../../data/mediaData'

const route = useRoute()
const posts = blogPosts as BlogPost[]

const isLoading = ref(false)
const errorMessage = ref('')
const renderedHtml = ref('')

const currentSlug = computed(() => {
  const value = route.params.slug
  return Array.isArray(value) ? value[0] : value
})

const selectedPost = computed(() =>
  posts.find((post) => post.slug === currentSlug.value)
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
    errorMessage.value = 'Post not found.'
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
    <header class="blog-post-header animate-in">
      <RouterLink class="btn-sketch blog-post-header__back" :to="{ name: 'writings' }">
        ← back to writings
      </RouterLink>
      <h1 class="section-title">{{ selectedPost?.title ?? 'post not found' }}</h1>
      <p v-if="selectedPost" class="blog-post-header__meta">{{ selectedPost.date }}</p>
    </header>

    <article class="blog-reader sketch-box animate-in" aria-live="polite">
      <p v-if="isLoading" class="blog-reader__loading">Loading...</p>
      <p v-else-if="errorMessage" class="blog-reader__error">{{ errorMessage }}</p>
      <div
        v-else
        class="blog-reader__content markdown-body"
        v-html="renderedHtml"
      ></div>
    </article>
  </div>
</template>

<style src="./BlogPost.css" scoped></style>
