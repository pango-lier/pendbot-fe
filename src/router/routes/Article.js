import { lazy } from "react";

const ArticlesRoutes = [
  {
    path: "/articles",
    component: lazy(() => import("../../views/pages/Article")),
  },
];
export default ArticlesRoutes;
