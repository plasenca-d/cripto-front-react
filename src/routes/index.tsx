import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import Home from "@/pages/home";
import Setting from "@/pages/setting";
import { Referidos } from "@/pages/referidos";
import { Register } from "@/pages/register";
import PlanesIndex from "@/pages/planes/PlanesIndex";
import PlanerCrear from "@/pages/planes/PlanerCrear";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register/:referer?",
        element: <Register />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "referidos",
        element: <Referidos />
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "planes",
        element: <PlanesIndex />,
        children: [
          {
            path: "crear",
            element: <PlanerCrear />,
          },
        ]
      },
    ],
  },
]);

export default router;
