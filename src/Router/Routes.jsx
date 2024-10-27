import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/home/Home";
import SocialLogin from "../pages/socialLogin/socialLogin";
import EmailLogin from "../pages/EmailLogin/EmailLogin";
import Password from "../pages/Password/Password";
import NewReg from "../pages/NewReg/NewReg";
import Onboarding from "../pages/Onboarding/Onboarding";

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/socialLogin",
        element: <SocialLogin></SocialLogin>,
      },
      {
        path: "/emailLogin",
        element: <EmailLogin />,
      },
      {
        path: "/password",
        element: <Password />,
      },
      {
        path: "/newReg",
        element: <NewReg />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
    ],
  },
]);
