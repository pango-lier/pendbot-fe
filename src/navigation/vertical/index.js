import {
  Mail,
  Home,
  User,
  ExternalLink,
  Activity,
  Settings,
  AlignJustify,
} from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "article",
    title: "Article",
    icon: <AlignJustify size={20} />,
    navLink: "/articles",
  },
  {
    id: "crawler",
    title: "Crawler",
    icon: <ExternalLink size={20} />,
    children: [
      {
        id: "Crawler-Link",
        title: "Crawler",
        icon: <ExternalLink size={20} />,
        navLink: "/crawler-link",
      },
      {
        id: "history-crawler",
        title: "History",
        icon: <ExternalLink size={20} />,
        navLink: "/crawler",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: <Settings size={20} />,
    children: [
      {
        id: "users",
        title: "Users",
        icon: <User size={20} />,
        navLink: "/users",
      },
      {
        id: "proxies",
        title: "Proxy",
        icon: <Activity size={20} />,
        navLink: "/proxies",
      },
      {
        id: "socials",
        title: "Social",
        icon: <Activity size={20} />,
        navLink: "/socials",
      },
    ],
  },

  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
];
