export interface Track {
  n: number
  title: string
  duration: string
  audioUrl: string | null
}

export interface MusicRelease {
  id: number
  title: string
  year: string
  description: string
  tags: string[]
  rot: string
  color: string
  tracks: Track[]
}

export interface Fanzine {
  id: number
  title: string
  subtitle: string
  description: string
  pages: number | null
  date: string
  tags: string[]
  color: string
  rot: string
  stamp: string
  stampColor: string
  coverUrl: string | null
  pdfUrl: string | null
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  rot: string
  url: string
}

export const musicReleases: MusicRelease[]
export const fanzines: Fanzine[]
export const blogPosts: BlogPost[]
