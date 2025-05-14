import { createBrowserRouter, Navigate } from "react-router-dom";
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
import GachaTwo from "../pages/Gacha/GachaTwo";
import UseTicket from "../pages/Gacha/UseTicket";
import Processing from "../pages/Gacha/Processing";
import GotTicket from "../pages/Gacha/GotTicket";
import TicketTermsAndConditons from "../pages/Gacha/TicketTermsAndConditons";
import SalesManagement from "../pages/Dashboard/SalesManagement/SalesManagement";
import GachaTickets from "../pages/Gacha/GachaTickets";
import PaymentCancel from "../pages/BillingScreen/PaymentCancle";
import Client from "../pages/Dashboard/Client/Client";
import CreatNewClient from "../pages/Dashboard/Client/CreatNewClient";
import SalesAgent from "../pages/Dashboard/SalesAgent/SalesAgent";
import DaComments from "../pages/Dashboard/DaComments/DaComments";
import QrCreation from "../pages/Dashboard/QrCreation/QrCreation";
import DeHistory from "../pages/Dashboard/DeHistory/DeHistory";
import CreateANewTeam from "../pages/Dashboard/CreatANewTeam/CreatANewTeam";
import DeGacha from "../pages/Dashboard/DeGacha/DeGacha";
import PaymentManagement from "../pages/Dashboard/PaymentManagement/PaymentManagement";
import ActiveAdminMail from "../pages/Dashboard/ActiveAdminMail/ActiveAdminMail";
import ActivateNewAccount from "../pages/Dashboard/ActivateNewAccount/ActivateNewAccount";
import CreateANewAccount from "../pages/Dashboard/Account/CreatANewAccount";
import ResturentStore from "../pages/Dashboard/ResturentStore/ResturentStore";
import MemberAccount from "../pages/Dashboard/MemberAccount/MemberAccount";
import MemberReg from "../pages/Dashboard/MemberAccount/MemberReg";
import SingUp from "../pages/Dashboard/SalesAgent/SingUp";
import DaNameChange from "../pages/Dashboard/Seetings/DaNameChange";
import AdminEmailChange from "../pages/Dashboard/Seetings/AdminEmailChange";
import BankChargeCompleted from "../pages/BillingScreen/BankChargeCompleted";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Test from "../pages/Test/Test";
import LineLoginCallBack from "../pages/SocialLogin/LineLoginCallBack";
import ProtectedRoute from "./ProtectedRoute";

import { useAuth } from "../hooks/useAuth";
import { ROLES } from "../constants/role";

const RootRoute = () => {
  const { user } = useAuth();
  if (user && user.role === ROLES.CONSUMER) {
    return <Navigate to="/search" />;
  } else if (
    (user && user.role === ROLES.FC_ADMIN) ||
    (user && user.role === ROLES.RESTAURANT_OWNER) ||
    (user && user.role === ROLES.SALES_AGENT)
  ) {
    return <Home />;
  }
  return <Home />;
};

export const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <RootRoute />,
      },

      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/socialLogin",
        element: <SocialLogin />,
      },
      {
        path: "/callback",
        element: <LineLoginCallBack />,
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
        path: "/gacha/tickets",
        element: (
          <PrivateRoute>
            <GachaTickets />
          </PrivateRoute>
        ),
      },
      {
        path: "/gacha/available_spins",
        element: <GachaTwo />,
      },
      {
        path: "/gacha/available_spins/ticket/:store_uid",
        element: <UseTicket />,
      },
      {
        path: "/gacha/available_spins/ticket/:id/processing",
        element: <Processing />,
      },
      {
        path: "/gacha/available_spins/ticket/:id/processing/got-ticket",
        element: <GotTicket />,
      },
      {
        path: "/gacha/available_spins/ticket/:id/processing/got-ticket/ticket-terms",
        element: <TicketTermsAndConditons />,
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
        path: "/member_list/:staffName",
        element: <MemberList />,
      },
      {
        path: "/store/:store_code",
        element: <IndividualStores />,
      },
      // staff details page
      {
        path: "/store/:store_code/staff/:username",
        element: <Staff />,
      },
      {
        path: "/store/:store_code/staff/:username/billing_screen",
        element: <BillingScreen />,
      },

      {
        path: "/store/:store_codes/staff/:username/chargeCompleted",
        element: <ChargeCompleted />,
      },
      {
        path: "/store/:store_code/staff/:username/PaymentCompleted",
        element: <BankChargeCompleted />,
      },
      {
        path: "payment-cancle",
        element: <PaymentCancel />,
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
          <ProtectedRoute allowedRoles={[ROLES.CONSUMER]}>
            <UserProfile />
          </ProtectedRoute>
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
        path: "admin/login",
        element: <AdminLogin />,
      },
      {
        path: "admins/activate/:uid/:token",
        element: <ActiveAdminMail />,
      },
      {
        path: "admins/activate/new/account/:uid/:token",
        element: <ActivateNewAccount />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute
            allowedRoles={[
              ROLES.FC_ADMIN,
              ROLES.RESTAURANT_OWNER,
              ROLES.SALES_AGENT,
              ROLES.GLOW_ADMIN,
            ]}
          >
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "sales_management",
            element: (
              <PrivateRoute>
                <SalesManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "account",
            element: (
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            ),
          },
          {
            path: "account/creat_newStore",
            element: (
              <PrivateRoute>
                <CreateANewAccount />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/account/:store_code",
            element: (
              <PrivateRoute>
                <ResturentStore />
              </PrivateRoute>
            ),
          },
          {
            path: "m_account",
            element: (
              <PrivateRoute>
                <MemberAccount />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/account/:id/creat_newStaff",
            element: (
              <PrivateRoute>
                <MemberReg />
              </PrivateRoute>
            ),
          },
          {
            path: "client",
            element: (
              <PrivateRoute>
                <Client />
              </PrivateRoute>
            ),
          },
          {
            path: "client/creat_new",
            element: (
              <PrivateRoute>
                <CreatNewClient />
              </PrivateRoute>
            ),
          },
          {
            path: "sales_agent",
            element: (
              <PrivateRoute>
                <SalesAgent />
              </PrivateRoute>
            ),
          },
          {
            path: "sales_agent/sign_up",
            element: (
              <PrivateRoute>
                <SingUp />
              </PrivateRoute>
            ),
          },
          {
            path: "comments",
            element: (
              <PrivateRoute>
                <DaComments />
              </PrivateRoute>
            ),
          },
          {
            path: "qr_creation",
            element: (
              <PrivateRoute>
                <QrCreation />
              </PrivateRoute>
            ),
          },
          {
            path: "deHistorys",
            element: (
              <PrivateRoute>
                <DeHistory />
              </PrivateRoute>
            ),
          },
          {
            path: "creat_a_new_team",
            element: (
              <PrivateRoute>
                <CreateANewTeam />
              </PrivateRoute>
            ),
          },

          {
            path: "deGacha",
            element: (
              <PrivateRoute>
                <DeGacha />
              </PrivateRoute>
            ),
          },
          {
            path: "payment_management",
            element: (
              <PrivateRoute>
                <PaymentManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <PrivateRoute>
                <DeSeetings />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/settings/name/change",
            element: (
              <PrivateRoute>
                <DaNameChange />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/settings/email/change",
            element: (
              <PrivateRoute>
                <AdminEmailChange />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);
