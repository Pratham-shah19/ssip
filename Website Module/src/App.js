import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomeOwnerDashboard from "./pages/HomeOwnerDashboard/HomeOwnerDashboard";
import OrdersOwnerDashboard from "./pages/OrdersOwnerDashboard/OrdersOwnerDashboard";
import MenuOwnerDashboard from "./pages/MenuOwnerDashboard/MenuOwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminTransaction from "./pages/AdminTransaction/AdminTransaction";
import AddItemOwner from "./pages/AddItemOwner/AddItemOwner";
import WalletOwnerDashboard from "./pages/WalletOwnerDashboard/WalletOwnerDashboard";
import ConfirmOrder from "./pages/ConfirmOrder/ConfirmOrder";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import AdminProfile from "./pages/AdminProfile/AdminProfile";
import OTP from "./pages/OTP/OTP";
import ForgetEmail from "../src/pages/ForgetEmail/ForgetEmail";
import NewPassword from "./pages/NewPassword/NewPassword";
import OTP_Ow from "./pages/OTP/OTP_Ow";
import ForgetEmail_Ow from "../src/pages/ForgetEmail/ForgetEmail_Ow";
import NewPassword_Ow from "./pages/NewPassword/NewPassword_Ow";
import AddQuantity from "./pages/AddQuantity/AddQuantity";
import OwnerHistory from "./pages/OwnerHistory/OwnerHistory";
import Owner_ProfileScreen from "./pages/Owner_ProfileScreen/Owner_ProfileScreen";
import PaymentScreen from "./pages/Payment/Payment";
import UnknownScreen from "./pages/UnknownScreen/UnknownScreen";
import Payment_Failure from "./pages/Payment_Failure/Payment_Failure";
import Payment_Success from "./pages/Payment_Success/Payment_Success";
function App() {
  // const _Login = lazy(() => import("./pages/Login/Login"));
  // const _HomeOwnerDashboard = lazy(() =>
  //   import("./pages/HomeOwnerDashboard/HomeOwnerDashboard")
  // );
  // const _OrdersOwnerDashboard = lazy(() =>
  //   import("./pages/OrdersOwnerDashboard/OrdersOwnerDashboard")
  // );
  // const _MenuOwnerDashboard = lazy(() =>
  //   import("./pages/MenuOwnerDashboard/MenuOwnerDashboard")
  // );
  // const _AdminDashboard = lazy(() =>
  //   import("./pages/AdminDashboard/AdminDashboard")
  // );
  // const _AdminTransaction = lazy(() =>
  //   import("./pages/AdminTransaction/AdminTransaction")
  // );
  // const _AddItemOwner = lazy(() => import("./pages/AddItemOwner/AddItemOwner"));
  // const _WalletOwnerDashboard = lazy(() =>
  //   import("./pages/WalletOwnerDashboard/WalletOwnerDashboard")
  // );
  // const _ConfirmOrder = lazy(() => import("./pages/ConfirmOrder/ConfirmOrder"));
  // const _AdminRegister = lazy(() =>
  //   import("./pages/AdminRegister/AdminRegister")
  // );
  // const _AdminProfile = lazy(() => import("./pages/AdminProfile/AdminProfile"));
  // const _OTP = lazy(() => import("./pages/OTP/OTP"));
  // const _ForgetEmail = lazy(() =>
  //   import("../src/pages/ForgetEmail/ForgetEmail")
  // );
  // const _NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));
  // const _OTP_Ow = lazy(() => import("./pages/OTP/OTP_Ow"));
  // const _ForgetEmail_Ow = lazy(() =>
  //   import("../src/pages/ForgetEmail/ForgetEmail_Ow")
  // );
  // const _NewPassword_Ow = lazy(() =>
  //   import("./pages/NewPassword/NewPassword_Ow")
  // );
  // const _AddQuantity = lazy(() => import("./pages/AddQuantity/AddQuantity"));
  // const _OwnerHistory = lazy(() => import("./pages/OwnerHistory/OwnerHistory"));
  // const _Owner_ProfileScreen = lazy(() =>
  //   import("./pages/Owner_ProfileScreen/Owner_ProfileScreen")
  // );
  // const _UnknownScreen = lazy(() =>
  //   import("./pages/UnknownScreen/UnknownScreen")
  // );
  return (
    <div className="App">
      <Router>
        <Suspense fallback="Login is Loading">
          <Routes>
            <Route path="/">
              <Route index element={<Login />} />
              <Route path="/otp" element={<OTP />} />
              <Route
                path="/owner-dashboard/add-qty"
                element={<AddQuantity />}
              />
              <Route path="/forget-email" element={<ForgetEmail />} />
              <Route path="/forget-password" element={<NewPassword />} />
              <Route path="/otp_ow" element={<OTP_Ow />} />
              <Route path="/forget-email_ow" element={<ForgetEmail_Ow />} />
              <Route path="/forget-password_ow" element={<NewPassword_Ow />} />
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route
                path="admin-dashboard/transaction"
                element={<AdminTransaction />}
              />
              <Route
                path="admin-dashboard/register"
                element={<AdminRegister />}
              />
              <Route
                path="admin-dashboard/profile"
                element={<AdminProfile />}
              />
              <Route path="owner-dashboard" element={<HomeOwnerDashboard />} />
              <Route path="owner-history" element={<OwnerHistory />} />
              <Route
                path="owner-dashboard/orders"
                element={<OrdersOwnerDashboard />}
              />
              <Route
                path="owner-dashboard/menu"
                element={<MenuOwnerDashboard />}
              />
              <Route
                path="owner-dashboard/menu/add-item"
                element={<AddItemOwner />}
              />
              <Route
                path="owner-dashboard/confirmOrder"
                element={<ConfirmOrder />}
              />{" "}
              <Route
                path="owner-dashboard/wallet"
                element={<WalletOwnerDashboard />}
              />
              <Route
                path="owner-dashboard/profileScreen"
                element={<Owner_ProfileScreen />}
              />
              <Route
                path="owner-dashboard/unknown"
                element={<UnknownScreen />}
              />
              {/* HomeScreen of Canteen */}
              {/* History for Owner*/}
              {/* Annonymus */}
              {/*Menu Screen 2nd*/}
              {/* Adding New Item */}
              <Route
                path="admin-dashboard/Payment"
                element={<PaymentScreen />}
              />
              <Route
                path="admin-dashboard/success"
                element={<Payment_Success />}
              />
              <Route
                path="admin-dashboard/cancel"
                element={<Payment_Failure />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
