import { createRouter, createWebHistory } from 'vue-router'
import StartView from "@/views/StartView.vue";
import AllView from "@/views/AllView.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: StartView
  },
  {
    path: '/getall',
    name: 'getall',
    component: AllView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
