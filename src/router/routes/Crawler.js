import { lazy } from 'react'

const CrawlerRoutes = [
  {
    path: '/crawler-link',
    component: lazy(() => import('../../views/pages/CrawlerLink')),
  },
  {
    path: '/crawler',
    component: lazy(() => import('../../views/pages/Crawler')),
  }, 
  {
    path: '/socials',
    component: lazy(() => import('../../views/pages/Social')),
  },
  {
    path: '/crawler-config',
    component: lazy(() => import('../../views/pages/authentication/Register')),
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },

]

export default CrawlerRoutes
