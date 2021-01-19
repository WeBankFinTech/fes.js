import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export default [
  {
    name: "v-8daa1a0e",
    path: "/",
    component: Vuepress,
    meta: { title: "Home" },
  },
  {
    path: "/index.html",
    redirect: "/",
  },
  {
    path: "/README.md",
    redirect: "/",
  },
]
