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

import MechanicDashboard from "./mechanic/dashboardM";
import MechNav from "./components/mechNav";
import MechanicProfile from "./mechanic/mechProfile";
import MechanicReviews from "./mechanic/mechreview";
import MechanicFAQs from "./mechanic/mechfaq";
import UserContextProvider from "./context/UserContextProvider";
import AdminContextProvider from "./context/AdminContextProvider";
import MechanicContextProvider from "./context/MechanicContextProvider";

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
          <Route path="/" element={
            <UserContextProvider>
              <Home />
            </UserContextProvider>} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={
            <UserContextProvider>
              <Subscription />
            </UserContextProvider>
          } />
          <Route path="/review" element={
            <UserContextProvider>
              <Review />
            </UserContextProvider>
          } />
          <Route path="/services" element={
            <UserContextProvider>
              <RoadsideAssistance />
            </UserContextProvider>
          } />
          <Route path="/service-details" element={
            <UserContextProvider>
              <ServiceDetailsPage />
            </UserContextProvider>
          } />
          <Route path="/tracking" element={
            <UserContextProvider>
              <TrackingPage />
            </UserContextProvider>
          } />


          <Route path="/admin/dashboard" element={
            <AdminContextProvider>
              <Dashboard />
            </AdminContextProvider>
          } />
          <Route path="/admin/Adminlogin" element={<Adminlogin />} />
          <Route path="/admin/users" element={
            <AdminContextProvider>
              <AdminUsers />
            </AdminContextProvider>
          } />
          <Route path="/admin/ServiceRequest" element={
            <AdminContextProvider>
              <ServiceRequest />
            </AdminContextProvider>
          } />
          <Route path="/admin/mechanic" element={
            <AdminContextProvider>
              <AdminMechanics />
            </AdminContextProvider>
          } />
          <Route path="/admin/subscription" element={
            <AdminContextProvider>
              <SubscriptionPage />
            </AdminContextProvider>
          } />
          <Route path="/admin/reviews" element={
            <AdminContextProvider>
              <AdminReviews />
            </AdminContextProvider>
          } />
          <Route path="/admin/settings" element={
            <AdminContextProvider>
              <AdminSettings />
            </AdminContextProvider>
          } />

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

          <Route path="/mechanic/dashboard" element={
            <MechanicContextProvider>
              <MechanicDashboard />
            </MechanicContextProvider>
          } />
          <Route path="/mechanic/profile" element={
            <MechanicContextProvider>
              <MechanicProfile />
            </MechanicContextProvider>
          } />
          <Route path="/mechanic/reviews" element={
            <MechanicContextProvider>
              <MechanicReviews />
            </MechanicContextProvider>
          } />
          <Route path="/mechanic/faqs" element={
            <MechanicContextProvider>
              <MechanicFAQs />
            </MechanicContextProvider>
          } />
          
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
