import { createBrowserRouter } from "react-router-dom";
import { Login } from "@/pages/login";
import Home from "@/pages/home";
import Transactions from "@/pages/transactions";
import Accounts from "@/pages/accounts";
import Investment from "@/pages/investment";
import Credit from "@/pages/credit";
import Loans from "@/pages/loans";
import Services from "@/pages/services";
import Setting from "@/pages/setting";

const router = createBrowserRouter([
  {
    path: "/auth",
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "investments",
        element: <Investment />,
      },
      {
        path: "cards",
        element: <Credit />,
      },
      {
        path: "loans",
        element: <Loans />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
