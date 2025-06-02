import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Subscription from "./pages/subscription";
import Review from "./pages/review";
import BrowseServicesPage from "./pages/services";
import ServiceDetailsPage from "./pages/service-details";
import TrackingPage from "./pages/tracking";
import 'leaflet/dist/leaflet.css';
import TopNav from "./components/TopNav";
import Dashboard from "./admin/dashboard";
import Adminlogin from "./admin/Adminlogin";
import AdminNav from "./components/AdminNav";

import RoadsideAssistance from "./pages/RoadsideAssistance";
import Towing from "./pages/tow";
import FlatTyre from "./pages/flat";
import BatteryJumpstart from "./pages/BatteryJumpstart";
import StartingProblem from "./pages/startingProblem";
import KeyUnlock from "./pages/keyUnlock";
import FuelDelivery from "./pages/fuelDelivery";
import AdminUsers from "./admin/users";
import ServiceRequest from "./admin/ServiceRequest";
import AdminMechanics from "./admin/mechanic";
import SubscriptionPage from "./admin/subscription";
import AdminReviews from "./admin/reviews";
import AdminSettings from "./admin/settings";

const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/admin/Adminlogin"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {!shouldHideNavbar && <Navbar />}
      <div className="flex-grow overflow-y-auto w-full">
      {/* <TopNav /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/review" element={<Review />} />
          <Route path="/services" element={<RoadsideAssistance />} />
          <Route path="/service-details" element={<ServiceDetailsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/Adminlogin" element={<Adminlogin />} /> 
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/ServiceRequest" element={<ServiceRequest />} />
          <Route path="/admin/mechanic" element={<AdminMechanics />} />
          <Route path="/admin/subscription" element={<SubscriptionPage />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/settings" element={<AdminSettings />} />

          {/* Admin Routes */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/mechanics" element={<AdminMechanics />} />
          <Route path="/admin/services" element={<AdminServices />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/support" element={<AdminSupport />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/reports" element={<AdminReports />} /> */}

          {/* routing for services */}
          <Route path="/roadside-assistance" element={<RoadsideAssistance />} />
          <Route path="/towing" element={<Towing />} />
          <Route path="/flat-tyre" element={<FlatTyre />} />
          <Route path="/battery-jumpstart" element={<BatteryJumpstart />} />
          <Route path="/starting-problem" element={<StartingProblem />} />
          <Route path="/key-unlock-assistance" element={<KeyUnlock />} />
          <Route path="/fuel-delivery" element={<FuelDelivery />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
