import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import Dashboard from "../pages/Dashboard/Dashboard";

import Contacts from "../pages/Contacts/Contacts";
import Profile from "../pages/Profile/Profile";
import Layout from "../components/Layout/Layout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
      <Route path="/Contacts" element={<Layout><Contacts /></Layout>} />
      <Route path="/Profile" element={<Layout><Profile /></Layout>} />
    </Routes>
  );
}

export default AppRoutes;