export default [
  { path: '/welcome', component: () => import('../pages/Welcome-template.vue') },
  { path: '/data', component: () => import('../pages/data-statistics/user-analysis/active-users') }
]