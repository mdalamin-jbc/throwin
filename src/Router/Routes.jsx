import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../pages/home/Home";
import SocialLogin from "../pages/SocialLogin/SocialLogin";
import EmailLogin from "../pages/EmailLogin/EmailLogin";
import Password from "../pages/Password/Password";
import Onboarding from "../pages/Onboarding/Onboarding";
import Login from "../pages/Login/Login";
import Gacha from "../pages/Gacha/Gacha";
import Search from "../pages/Search/Search";
import Favorite from "../pages/Favorite/Favorite";
import NewReg from "../pages/NewReg/NewReg";

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
import DisplayName from "../pages/DisplayName/DisplayName";
import ForgetPassword from "../pages/Login/ForgetPassword";
import ResetPassword from "../pages/Login/ResetPassword";
import TermsAndConditions from "../pages/TermsAndConditions/TermsAndConditions";
import ChargeCompleted from "../pages/BillingScreen/ChargeCompleted";
import History from "../pages/History/History";
import VerifyEmail from "../pages/Profile/VerifyEmail";
import Dashboard from "../pages/Dashboard/Dashboard";
import Notification from "../pages/Notification/Notification";
import AdminLogin from "../pages/Dashboard/AdminLogin/AdminLogin";
import Account from "../pages/Dashboard/Account/Account";
import ForgetMailCheck from "../pages/Login/ForgetMailCheck";
import NotificationDetails from "../pages/Notification/NotificationDetails";
import DeSeetings from "../pages/Dashboard/Seetings/DeSeetings";

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
        path: "forget_password",
        element: <ForgetPassword />,
      },
      {
        path: "forget_mail_check",
        element: <ForgetMailCheck />,
      },
      {
        path: "/reset-password/:userId/:token",
        element: <ResetPassword />,
      },
      {
        path: "/nickName_reg",
        element: <NickNameReg />,
      },
      {
        path: "/reg_complete",
        element: <RegComplete />,
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
        path: "setting",
        element: <Setting />,
      },
      {
        path: "/new_reg",
        element: <NewReg />,
      },
      {
        path: "/mail_check",
        element: <CheckMail />,
      },
      {
        path: "/activate/:userId/:token",
        element: <AccountActivation />,
      },

      {
        path: "/store",
        element: <IndividualStores />,
      },
      {
        path: "/staff/:username",
        element: <Staff />,
      },
      {
        path: "/staff/:username/billing_screen",
        element: <BillingScreen />,
      },
      {
        path: "/staff/:username/chargeCompleted",
        element: <ChargeCompleted />,
      },
      {
        path: "/member_list/:staffName",
        element: <MemberList />,
      },
      // History
      {
        path: "/history",
        element: <History />,
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
        path: "/myPage/Change_email",
        element: (
          <PrivateRoute>
            <ChangeEmail />
          </PrivateRoute>
        ),
      },
      {
        path: "verify-email/:token",
        element: <VerifyEmail />,
      },
      {
        path: "myPage/display_name",
        element: <DisplayName />,
      },
      {
        path: "/myPage/change_password",
        element: (
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        ),
      },
      {
        path: "myPage/notice",
        element: <Notification />,
      },
      {
        path: "myPage/notice/:id",
        element: <NotificationDetails />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
      // -------------------------------------dashboard
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "settings",
            element: <DeSeetings />,
          },
          {
            path: "adminLogin",
            element: <AdminLogin />,
          },
        ],
      },
    ],
  },
]);
