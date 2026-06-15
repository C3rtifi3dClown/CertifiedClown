import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import BlogView from '../views/Blog/BlogView.vue'
import BlogPostView from '../views/BlogPost/BlogPostView.vue'
import MusicView from '../views/Music/MusicView.vue'
import FanzinesView from '../views/Fanzine/FanzinesView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/writings',
      name: 'writings',
      component: BlogView,
    },
    {
      path: '/writings/:slug',
      name: 'writing-post',
      component: BlogPostView,
    },
    {
      path: '/music',
      name: 'music',
      component: MusicView,
    },
    {
      path: '/fanzines',
      name: 'fanzines',
      component: FanzinesView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
