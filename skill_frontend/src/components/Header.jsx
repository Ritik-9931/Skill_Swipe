import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Logout } from "../redux/slices/authSlice";
import image from "../assets/image.png";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/");
  };

  const navLinkStyle = ({ isActive }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive
        ? "text-blue-600"
        : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* =====================================================
            LOGO
        ====================================================== */}
        <NavLink
          to="/home"
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-100 overflow-hidden">

            <img
              src={image}
              alt="SkillSwap"
              className="w-full h-full object-cover"
            />

          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition">
              Skill<span className="text-blue-600">Swap</span>
            </h1>

            <p className="text-[10px] text-gray-400 font-medium tracking-wide">
              LEARN • TEACH • CONNECT
            </p>
          </div>
        </NavLink>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}
        <div className="hidden lg:flex items-center gap-8">

          <NavLink
            to="/home"
            end
            className={navLinkStyle}
          >
            {({ isActive }) => (
              <>
                Home

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/home/skills"
            className={navLinkStyle}
          >
            {({ isActive }) => (
              <>
                Skills

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/home/explore"
            className={navLinkStyle}
          >
            {({ isActive }) => (
              <>
                Explore

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

          <NavLink
            to="/home/profile"
            className={navLinkStyle}
          >
            {({ isActive }) => (
              <>
                Profile

                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-blue-600 rounded-full" />
                )}
              </>
            )}
          </NavLink>

        </div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="flex items-center gap-3">

          {/* User Profile */}
          <button
            type="button"
            onClick={() => navigate("/home/profile")}
            className="hidden sm:flex items-center gap-3 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </span>
            </div>

            <div className="text-left max-w-[130px]">
              <p className="text-sm font-semibold text-gray-800 truncate">
                {user?.firstName || user?.username}
              </p>

              <p className="text-xs text-gray-400">
                {user?.role || "Member"}
              </p>
            </div>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <span>↪</span>
            Logout
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

        </div>

      </nav>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">

          <div className="px-4 py-4 space-y-1">

            <NavLink
              to="/home"
              end
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/home/skills"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              Skills
            </NavLink>

            <NavLink
              to="/home/explore"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              Explore
            </NavLink>

            <NavLink
              to="/home/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              Profile
            </NavLink>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition"
            >
              Logout
            </button>

          </div>
        </div>
      )}

    </header>
  );
};

export default Header;