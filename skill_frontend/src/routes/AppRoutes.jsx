import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Skill from "../pages/Skill";
import Profile from "../pages/Profile";
import Explore from "../pages/Explore";
import SkillDetails from "../pages/SkillDetails";
import UserDetails from "../pages/UserDetails";
import ScrollToTop from "../components/ScrollToTop";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Registration />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="skills" element={<Skill />} />
            <Route path="profile" element={<Profile />} />
            <Route path="explore" element={<Explore />} />
            <Route path="skillDetails/:id" element={<SkillDetails />} />
            <Route path="userDetails/:id" element={<UserDetails />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
