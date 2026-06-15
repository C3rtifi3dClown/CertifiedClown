/**
 * mediaData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Central data file for all media assets hosted on external cloud storage.
 *
 * HOW TO UPDATE
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Upload your files to your Backblaze B2 bucket (or any S3-compatible host).
 * 2. Copy the public URL for each file.
 * 3. Replace the placeholder strings below — they look like:
 *      'https://your-bucket.s3.us-west-002.backblazeb2.com/...'
 *
 * Backblaze B2 public URL format:
 *   https://<bucket-name>.s3.<region>.backblazeb2.com/<path/to/file>
 *
 * Leave `audioUrl`, `coverUrl`, or `pdfUrl` as null if the file isn't
 * uploaded yet — the UI will gracefully hide or disable those controls.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Music releases ────────────────────────────────────────────────────────────
//
// Each release has:
//   id          – unique number
//   title       – displayed release name
//   year        – displayed year string
//   description – one-line blurb shown on the card
//   tags        – array of short tag strings
//   rot / color – visual tilt and background tint (no need to change these)
//   tracks      – array of track objects (see below)
//
// Each track has:
//   n         – track number
//   title     – track title
//   duration  – display string, e.g. '3:04'
//   audioUrl  – full public URL to the MP3 (or null if not uploaded yet)

export const musicReleases = [
  {
    id: 1,
    title: 'Untitled EP',
    year: '2024',
    description: 'Four tracks recorded in my bedroom at 2am.',
    tags: ['ep', 'bedroom', 'lo-fi'],
    rot: '-1deg',
    color: '#ffe8e0',
    tracks: [
      {
        n: 1,
        title: 'Diddi Trix, TH - KYLIAN',
        duration: '2:40',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/Diddi+Trix%2C+TH+-+KYLIAN.mp3',
      },
      {
        n: 2,
        title: 'Four Tet - Lush',
        duration: '5:11',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/05+Lush.flac',
      },
      {
        n: 3,
        title: 'Jul - Je trace ma route',
        duration: '3:02',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/1-01+Je+trace+ma+route.flac',
      },
      {
        n: 4,
        title: 'Justice - Neverender',
        duration: '4:26',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/1-01+Neverender.flac',
      },
    ],
  },
  {
    id: 2,
    title: 'Loose Tracks 2023',
    year: '2023',
    description: 'Demos and voice memos that were too good to delete.',
    tags: ['demos', 'voice memos', 'rough'],
    rot: '0.8deg',
    color: '#e8f0ff',
    tracks: [
      {
        n: 1,
        title: 'Rosalia - Divinize',
        duration: '4:03',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/1-03+Divinize.flac',
      },
      {
        n: 2,
        title: 'John Frusciante - Inside a Break',
        duration: '3:07',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/1-03+Inside+a+Break.flac',
      },
      {
        n: 3,
        title: 'Onda Vaga - Me pega fuerte',
        duration: '2:39',
        audioUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/music/1-05+Me+pega+fuerte.flac',
      },
    ],
  },
]

// ── Fanzines ──────────────────────────────────────────────────────────────────
//
// Each zine has:
//   id          – unique number
//   title       – e.g. 'Issue #001'
//   subtitle    – short tagline
//   description – one-line blurb
//   pages       – page count (or null if unknown)
//   date        – display string
//   tags        – array of short tag strings
//   color       – placeholder cover background (hex) — used if no coverUrl
//   rot         – visual tilt (no need to change)
//   stamp       – badge text, e.g. '✓ DONE' or 'WIP'
//   stampColor  – hex color for the stamp badge
//   coverUrl    – full public URL to the cover image JPG/PNG (or null)
//   pdfUrl      – full public URL to the PDF file (or null if not uploaded)

export const fanzines = [
  {
    id: 1,
    title: 'Issue #001',
    subtitle: 'everything is fine',
    description: 'The debut issue — rants, collages, and bad photocopies.',
    pages: 16,
    date: 'Oct 2024',
    tags: ['rant', 'collage', 'first issue'],
    color: '#fff3e0',
    rot: '-1.5deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
    coverUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/give-me-all-your-cursed-dragon-ball-images-now-v0-h7w5z0ny6mkc1.webp',
    pdfUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/Nombre_de_calecons_optimal_%C3%A0_prendre_en_voyage_chez_le_m%C3%A2le_moyen.pdf',
  },
  {
    id: 2,
    title: 'Issue #002',
    subtitle: 'the loud issue',
    description: 'Music, show reviews, and too many photos.',
    pages: 20,
    date: 'Dec 2024',
    tags: ['music', 'show reviews', 'photos'],
    color: '#fce4ec',
    rot: '1deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
    coverUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/give-me-all-your-cursed-dragon-ball-images-now-v0-h7w5z0ny6mkc1.webp',
    pdfUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/Nombre_de_calecons_optimal_%C3%A0_prendre_en_voyage_chez_le_m%C3%A2le_moyen.pdf',
  },
  {
    id: 3,
    title: 'Issue #003',
    subtitle: 'something about winter',
    description: 'Poetry, drawings, and general sadness.',
    pages: 12,
    date: 'Feb 2025',
    tags: ['poetry', 'drawings', 'sad'],
    color: '#e8eaf6',
    rot: '-0.6deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
    coverUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/give-me-all-your-cursed-dragon-ball-images-now-v0-h7w5z0ny6mkc1.webp',
    pdfUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/Nombre_de_calecons_optimal_%C3%A0_prendre_en_voyage_chez_le_m%C3%A2le_moyen.pdf',
  },
  {
    id: 4,
    title: 'Issue #004',
    subtitle: '???',
    description: 'Coming soon.',
    pages: null,
    date: 'coming soon',
    tags: ['tba'],
    color: '#f5f5f5',
    rot: '1.3deg',
    stamp: 'WIP',
    stampColor: '#c0392b',
    coverUrl: null,
    pdfUrl: null,
  },
  {
    id: 5,
    title: 'SPLIT zine',
    subtitle: 'w/ a friend',
    description: '24-page collab: art, writing, and misc weirdness.',
    pages: 24,
    date: 'Apr 2025',
    tags: ['collaboration', 'art', 'misc'],
    color: '#e0f7fa',
    rot: '-1deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
    coverUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/give-me-all-your-cursed-dragon-ball-images-now-v0-h7w5z0ny6mkc1.webp',
    pdfUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/Nombre_de_calecons_optimal_%C3%A0_prendre_en_voyage_chez_le_m%C3%A2le_moyen.pdf',
  },
  {
    id: 6,
    title: 'Mini #01',
    subtitle: 'pocket sized ramblings',
    description: 'Eight pages of travel notes and doodles.',
    pages: 8,
    date: 'May 2025',
    tags: ['mini zine', 'travel'],
    color: '#fff8e1',
    rot: '0.5deg',
    stamp: '✓ DONE',
    stampColor: '#2e7d32',
    coverUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/give-me-all-your-cursed-dragon-ball-images-now-v0-h7w5z0ny6mkc1.webp',
    pdfUrl: 'https://f003.backblazeb2.com/file/certified-clown-medias/fanzines/slips/Nombre_de_calecons_optimal_%C3%A0_prendre_en_voyage_chez_le_m%C3%A2le_moyen.pdf',
  },
]

// ── Blog posts ───────────────────────────────────────────────────────────────
//
// Each post has:
//   id          – unique number
//   slug        – short identifier for internal use
//   title       – displayed post title
//   date        – displayed date string
//   excerpt     – one-line preview in the blog list
//   tags        – array of short tag strings
//   rot         – card tilt for sketch styling
//   url         – absolute public URL to the markdown file (.md)

export const blogPosts = [
  {
    id: 1,
    slug: 'why-i-started-making-zines',
    title: 'Why I Started Making Zines',
    date: 'Mar 2025',
    excerpt: 'Photocopiers, scissors, glue sticks, and the analog brain.',
    tags: ['zines', 'making stuff', 'tangents'],
    rot: '-1.1deg',
    url: 'https://f003.backblazeb2.com/file/certified-clown-medias/blog/example1.md',
  },
  {
    id: 2,
    slug: 'playing-a-show-to-seven-people',
    title: 'Notes on Playing a Show to Seven People',
    date: 'Jan 2025',
    excerpt: 'One rainy gig and somehow still the best one.',
    tags: ['music', 'live', 'small venues'],
    rot: '0.7deg',
    url: 'https://f003.backblazeb2.com/file/certified-clown-medias/blog/example2.md',
  },
  {
    id: 3,
    slug: 'the-art-of-the-unfinished-project',
    title: 'On the Art of the Unfinished Project',
    date: 'Nov 2024',
    excerpt: 'Seventeen unfinished songs and a suspicion that this is normal.',
    tags: ['process', 'creativity', 'rambling'],
    rot: '-0.6deg',
    url: 'https://f003.backblazeb2.com/file/certified-clown-medias/blog/example3.md',
  },
]
