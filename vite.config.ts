import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(() => {
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
  const base = process.env.GITHUB_ACTIONS && repoName ? `/${repoName}/` : '/'

  return {
    plugins: [vue()],
    base,
    server: {
      proxy: {
        '/b2': {
          target: 'https://f003.backblazeb2.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/b2/, ''),
        },
      },
    },
  }
})
