import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register/Register";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Contacts from "../pages/Contacts/Contacts";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default AppRoutes;