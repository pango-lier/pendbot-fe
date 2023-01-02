import { Mail, Home, User, ExternalLink, Activity } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'Crawler',
    title: 'Crawler-Link',
    icon: <ExternalLink size={20} />,
    navLink: '/crawler-link'
  },
  {
    id: 'users',
    title: 'Users',
    icon: <User size={20} />,
    navLink: '/users'
  },
  {
    id: 'accounts',
    title: 'Account',
    icon: <Activity size={20} />,
    navLink: '/accounts'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  }
]
