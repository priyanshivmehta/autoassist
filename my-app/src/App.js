import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/login";
import Subscription from "./pages/subscription";
import Review from "./pages/review";

// Wrapper to access hooks like useLocation
const AppLayout = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {!shouldHideNavbar && <Navbar />}
      <div className="flex-grow overflow-y-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription/>} />
          <Route path="/review" element={<Review />} />
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
