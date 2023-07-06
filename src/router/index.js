import { createRouter, createWebHistory } from 'vue-router'
import StartView from "@/views/StartView.vue";
import AllView from "@/views/AllView.vue";
import AddView from "@/views/AddView.vue";
import AddToPlanView from "@/views/AddToPlanView.vue";
import DeleteExerciseView from "@/views/DeleteExerciseView.vue";
import LoginForm from "@/components/LoginForm.vue";
import App from "@/App.vue";

const routes = [

  {
    path: '/plan',
    name: 'plan',
    component: StartView
  },
  {
    path: '/exercises',
    name: 'exercises',
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
  }, {
  path: '/deleteexercise',
    name: 'deleteexercise',
    component: DeleteExerciseView
  }, {
  path: '/login',
    name: 'login',
  component: LoginForm
  },{
    path: '/:pathMatch(.*)*',
    component: App
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
