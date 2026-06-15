<script setup lang="ts">
import { ref } from 'vue';
import { fanzines } from '../../data/mediaData.js';
import FanzinePdfViewer from '../../components/FanzinePdfViewer/FanzinePdfViewer.vue';

const viewingPdfUrl = ref<string | null>(null)

function openViewer(url: string) {
  viewingPdfUrl.value = url
  // scroll to viewer after Vue updates the DOM
  requestAnimationFrame(() => {
    document.getElementById('fanzine-viewer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}
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
        v-for="zine in fanzines"
        :key="zine.id"
        class="zine-card animate-in"
        :style="{ '--rot': zine.rot }"
      >
        <!-- Cover: real image if available, otherwise xerox placeholder -->
        <div
          class="zine-card__cover"
          :style="{ '--cover-bg': zine.color }"
        >
          <img
            v-if="zine.coverUrl"
            :src="zine.coverUrl"
            :alt="`${zine.title} — ${zine.subtitle} cover`"
            class="zine-card__cover-img"
          />
          <template v-else>
            <!-- Halftone grid overlay for that xerox feel -->
            <div class="zine-card__halftone" aria-hidden="true"></div>
            <div class="zine-card__cover-text">
              <span class="zine-card__cover-issue">{{ zine.title }}</span>
              <span class="zine-card__cover-sub">{{ zine.subtitle }}</span>
            </div>
          </template>

          <!-- Rubber stamp (always visible) -->
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

          <p class="zine-card__desc">{{ zine.description }}</p>

          <div class="zine-card__tags">
            <span v-for="tag in zine.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <div class="zine-card__actions">
            <template v-if="zine.pdfUrl">
              <!-- Download: browser will prompt Save As -->
              <a
                :href="zine.pdfUrl"
                download
                class="btn-sketch btn-sketch--blue zine-card__btn"
              >↓ download</a>
              <!-- Read online: opens embedded viewer on the page -->
              <button
                class="btn-sketch zine-card__btn"
                type="button"
                @click="openViewer(zine.pdfUrl!)"
              >read online →</button>
            </template>
            <span v-else class="zine-card__coming-soon">coming soon</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- ── Embedded PDF viewer ───────────────────── -->
    <div v-if="viewingPdfUrl" id="fanzine-viewer">
      <FanzinePdfViewer :pdf-url="viewingPdfUrl" @close="viewingPdfUrl = null" />
    </div>

    <!-- ── Note ──────────────────────────────────── -->
    <div class="sketch-box fanzines-note animate-in">
      <p>
        ☁️ <strong>Cloud storage:</strong> upload PDFs and cover images to your
        Backblaze B2 bucket, then paste the public URLs into
        <code>src/data/mediaData.js</code> — no other code changes needed.
      </p>
    </div>

  </div>
</template>

<style src="./FanzineView.css" scoped></style>
