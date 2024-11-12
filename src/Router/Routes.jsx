import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/home/Home";
import SocialLogin from "../pages/socialLogin/socialLogin";
import EmailLogin from "../pages/EmailLogin/EmailLogin";
import Password from "../pages/Password/Password";
import Onboarding from "../pages/Onboarding/Onboarding";
import Login from "../pages/Login/Login";
import Gacha from "../pages/Gacha/Gacha";
import Search from "../pages/Search/Search";
import Favorite from "../pages/Favorite/Favorite";
import NewReg from "../pages/NewReg/NewReg";
import Notice from "../pages/Notice/Notice";
import Setting from "../pages/Setting/Setting";
import NickNameReg from "../pages/NickNameReg/NickNameReg";
import CheckMail from "../pages/NewReg/CheckMail";
import AccountActivation from "../pages/AccountActivation/AccountActivation";
import PrivateRoute from "./PrivateRoute";
import MemberList from "../pages/MemberList/MemberList";
import IndividualStores from "../pages/IndividualStores/IndividualStores";
import UserProfile from "../pages/Profile/UserProfile";

import ChangeEmail from "../pages/Profile/ChangeEmail";
import ChangePassword from "../pages/Profile/ChangePassword";
import Staff from "../pages/home/Staffs/Staff";
import RegComplete from "../pages/RegComplete/RegComplete";
import BillingScreen from "../pages/BillingScreen/BillingScreen";

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
        element: <SocialLogin />,
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/favorite",
        element: <Favorite />,
      },

      {
        path: "/gacha",
        element: (
          <PrivateRoute>
            <Gacha />
          </PrivateRoute>
        ),
      },
      {
        path: "/notice",
        element: <Notice />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "/new_reg",
        element: <NewReg />,
      },
      {
        path: "/new_reg/mail_check",
        element: <CheckMail />,
      },
      {
        path: "/activate/:userId/:token",
        element: <AccountActivation />,
      },

      {
        path: "/reg_complete",
        element: <RegComplete />,
      },
      {
        path: "/store",
        element: <IndividualStores />,
      },
      {
        path: "/staff/:id",
        element: <Staff />,
      },
      {
        path: "/staff/:id/billing_screen",
        element: <BillingScreen />,
      },
      {
        path: "/stuff_list",
        element: <MemberList />,
      },
      // Profile
      {
        path: "/myPage",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPage/display_name",
        element: <NickNameReg />,
      },
      {
        path: "/myPage/Change_email",
        element: (
          <PrivateRoute>
            <ChangeEmail />
          </PrivateRoute>
        ),
      },
      {
        path: "/myPage/change_password",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
