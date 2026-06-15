<script setup lang="ts">
import { ref, computed } from 'vue'
import PDF from 'pdf-vue3'

const props = defineProps<{ pdfUrl: string }>()
const emit = defineEmits<{ close: [] }>()

const isLoading = ref(true)
const hasError = ref(false)
const errorMsg = ref('')

/**
 * In dev, proxy Backblaze B2 through the Vite /b2 proxy so CORS is not
 * an issue. In production the bucket must have a permissive CORS policy.
 */
const resolvedUrl = computed(() => {
  if (
    import.meta.env.DEV &&
    props.pdfUrl.startsWith('https://f003.backblazeb2.com/')
  ) {
    return `/b2/${props.pdfUrl.replace('https://f003.backblazeb2.com/', '')}`
  }
  return props.pdfUrl
})

function onPdfInit() {
  isLoading.value = false
}

function onError(error: Error) {
  isLoading.value = false
  hasError.value = true
  errorMsg.value = error.message || 'Could not load this PDF.'
}
</script>

<template>
  <div class="fz-viewer-wrap">
    <div class="fz-viewer-frame">
      <!-- torn-paper top decoration -->
      <div class="fz-viewer-frame__tear" aria-hidden="true"></div>

      <!-- header bar -->
      <div class="fz-viewer-frame__header">
        <span class="fz-viewer-frame__label">📋 reading now</span>
        <button
          class="btn-sketch fz-viewer-frame__close"
          type="button"
          aria-label="Close viewer"
          @click="emit('close')"
        >✕ close</button>
      </div>

      <!-- loading overlay -->
      <Transition name="fz-fade">
        <div v-if="isLoading" class="fz-viewer__loading" aria-live="polite">
          <span class="fz-viewer__loading-text">Loading Fanzine...</span>
          <span class="fz-viewer__loading-dots" aria-hidden="true">· · ·</span>
        </div>
      </Transition>

      <!-- error state -->
      <div v-if="hasError" class="fz-viewer__error">
        <p>⚠️ {{ errorMsg }}</p>
        <p class="fz-viewer__error-hint">
          This usually means the B2 bucket CORS policy needs to allow
          <code>GET</code> from this origin.
        </p>
      </div>

      <!-- PDF scroll container -->
      <div
        v-show="!isLoading && !hasError"
        class="fz-viewer__scroll"
      >
        <PDF
          :src="resolvedUrl"
          :virtual="true"
          :preload-pages="2"
          :show-progress="false"
          :show-page-tooltip="true"
          :show-back-to-top-btn="false"
          pdf-width="100%"
          :row-gap="16"
          @on-pdf-init="onPdfInit"
          @on-error="onError"
        />
      </div>
    </div>
  </div>
</template>

<style src="./FanzinePdfViewer.css" scoped></style>
