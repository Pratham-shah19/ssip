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
import UnknownScreen from "./pages/UnknownScreen/UnknownScreen";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/owner-dashboard/add-qty" element={<AddQuantity />} />
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
            <Route path="admin-dashboard/profile" element={<AdminProfile />} />

            {/* HomeScreen of Canteen */}
            <Route path="owner-dashboard" element={<HomeOwnerDashboard />} />

            {/* History for Owner*/}
            <Route path="owner-history" element={<OwnerHistory />} />

            {/* Annonymus */}
            <Route
              path="owner-dashboard/orders"
              element={<OrdersOwnerDashboard />}
            />

            {/*Menu Screen 2nd*/}
            <Route
              path="owner-dashboard/menu"
              element={<MenuOwnerDashboard />}
            />

            {/* Adding New Item */}
            <Route
              path="owner-dashboard/menu/add-item"
              element={<AddItemOwner />}
            />

            <Route
              path="owner-dashboard/confirmOrder"
              element={<ConfirmOrder />}
            />

            <Route
              path="owner-dashboard/wallet"
              element={<WalletOwnerDashboard />}
            />
            <Route
              path="owner-dashboard/profileScreen"
              element={<Owner_ProfileScreen />}
            />
            <Route path="owner-dashboard/unknown" element={<UnknownScreen />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
