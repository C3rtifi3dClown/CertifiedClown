import { computed, ref, watch } from 'vue'

export interface NowPlaying {
  key: string
  releaseTitle: string
  trackTitle: string
  audioUrl: string
}

const audio = new Audio()
audio.preload = 'metadata'

const nowPlaying = ref<NowPlaying | null>(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

let listenersBound = false

function bindAudioListeners() {
  if (listenersBound) {
    return
  }

  audio.addEventListener('timeupdate', () => {
    currentTime.value = audio.currentTime || 0
  })

  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration || 0
  })

  audio.addEventListener('play', () => {
    isPlaying.value = true
  })

  audio.addEventListener('pause', () => {
    isPlaying.value = false
  })

  audio.addEventListener('ended', () => {
    isPlaying.value = false
  })

  listenersBound = true
}

bindAudioListeners()

watch(
  () => nowPlaying.value?.audioUrl,
  async (url) => {
    if (!url) {
      audio.pause()
      return
    }

    audio.pause()
    isPlaying.value = false
    currentTime.value = 0
    duration.value = 0

    if (audio.src !== url) {
      audio.src = url
    }

    audio.load()

    try {
      await audio.play()
      isPlaying.value = true
    } catch {
      // Autoplay may be blocked by browser policy.
    }
  }
)

function selectTrack(
  release: { id: number; title: string },
  track: { n: number; title: string; audioUrl: string | null }
) {
  if (!track.audioUrl) {
    return
  }

  const key = `${release.id}-${track.n}`

  if (nowPlaying.value?.key === key) {
    togglePlayPause()
    return
  }

  nowPlaying.value = {
    key,
    releaseTitle: release.title,
    trackTitle: track.title,
    audioUrl: track.audioUrl,
  }
}

function togglePlayPause() {
  if (!nowPlaying.value) {
    return
  }

  if (isPlaying.value) {
    audio.pause()
    return
  }

  audio.play().catch(() => {})
}

function seekTo(seconds: number) {
  if (Number.isNaN(seconds)) {
    return
  }

  audio.currentTime = seconds
  currentTime.value = seconds
}

function formatTime(seconds: number): string {
  if (!seconds || Number.isNaN(seconds)) {
    return '0:00'
  }

  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

const progress = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
)

export function useGlobalMusicPlayer() {
  return {
    nowPlaying,
    isPlaying,
    currentTime,
    duration,
    progress,
    selectTrack,
    togglePlayPause,
    seekTo,
    formatTime,
  }
}
