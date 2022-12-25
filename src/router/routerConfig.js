import Home from '@views/Home.vue'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Home',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/preview',
    component: () => import('@/views/Preview.vue'),
    name: 'Preview',
    meta: {
      title: '预览'
    }
  }
]

export default routes
