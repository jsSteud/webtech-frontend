import { createRouter, createWebHistory } from 'vue-router'
import StartView from "@/views/StartView.vue";
import AllView from "@/views/AllView.vue";
import AddView from "@/views/AddView.vue";
import AddToPlanView from "@/views/AddToPlanView.vue";

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
  },
  {
    path: '/createnew',
    name: 'createnew',
    component: AddView
  }, {
    path: "/addtoplan/:day",
    name: "addtoplan",
    component: AddToPlanView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
