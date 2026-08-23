import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-gray-300">

      {/* =====================================================
          MAIN FOOTER
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* =================================================
              BRAND
          ================================================= */}
          <div className="lg:col-span-5">

            {/* Logo */}
            <NavLink
              to="/home"
              className="inline-flex items-center gap-3 group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-950/40">

                <span className="text-white text-xl font-bold">
                  ↔
                </span>

              </div>

              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Skill<span className="text-blue-500">Swap</span>
                </h2>

                <p className="text-[10px] text-gray-500 font-medium tracking-widest">
                  LEARN • TEACH • CONNECT
                </p>
              </div>
            </NavLink>

            {/* Description */}
            <p className="mt-6 max-w-lg text-gray-400 leading-relaxed">
              A community where people exchange knowledge, discover
              new skills, and grow together. Share what you know and
              find someone who can teach you what you want to learn.
            </p>

            {/* CTA */}
            <div className="mt-7">

              <NavLink
                to="/home/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-lg shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                Explore the community
                <span>→</span>
              </NavLink>

            </div>

            {/* Social Links */}
            <div className="mt-8">

              <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">
                Connect with us
              </p>

              <div className="flex gap-3">

                <a
                  href="#"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-white hover:border-blue-500/40 transition"
                >
                  Git
                </a>

                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-white hover:border-blue-500/40 transition"
                >
                  in
                </a>

                <a
                  href="#"
                  aria-label="X"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold text-gray-400 hover:bg-white/10 hover:text-white hover:border-blue-500/40 transition"
                >
                  X
                </a>

              </div>

            </div>

          </div>

          {/* =================================================
              QUICK LINKS
          ================================================= */}
          <div className="lg:col-span-2">

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Explore
            </h3>

            <ul className="space-y-3">

              <li>
                <NavLink
                  to="/home"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home/skills"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  My Skills
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home/explore"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Explore People
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/home/profile"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  My Profile
                </NavLink>
              </li>

            </ul>

          </div>

          {/* =================================================
              PLATFORM
          ================================================= */}
          <div className="lg:col-span-2">

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              SkillSwap
            </h3>

            <ul className="space-y-3">

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  How it works
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Community
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Safety & Trust
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Help Center
                </a>
              </li>

            </ul>

          </div>

          {/* =================================================
              CONTACT
          ================================================= */}
          <div className="lg:col-span-3">

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Get in touch
            </h3>

            <div className="space-y-4">

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  ✉
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <a
                    href="mailto:support@skillswap.com"
                    className="text-sm text-gray-300 hover:text-blue-400 transition"
                  >
                    support@skillswap.com
                  </a>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  🌍
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Community
                  </p>

                  <p className="text-sm text-gray-300">
                    Learn from anywhere
                  </p>
                </div>

              </div>

              <div className="flex items-start gap-3">

                <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  💬
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Support
                  </p>

                  <p className="text-sm text-gray-300">
                    We're here to help
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* =====================================================
            COMMUNITY MESSAGE
        ====================================================== */}
        <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 px-5 py-4">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

            <div>
              <p className="text-sm font-semibold text-white">
                Your knowledge can help someone.
              </p>

              <p className="text-xs text-gray-400 mt-1">
                And someone else's knowledge can help you.
              </p>
            </div>

            <span className="text-sm text-blue-400 font-semibold">
              Learn. Teach. Repeat. ↗
            </span>

          </div>

        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}
        <div className="border-t border-white/10 mt-10 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-sm text-gray-500 text-center md:text-left">
              © {new Date().getFullYear()} SkillSwap. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm">

              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition"
              >
                Privacy
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition"
              >
                Terms
              </a>

              <a
                href="#"
                className="text-gray-500 hover:text-gray-300 transition"
              >
                Guidelines
              </a>

            </div>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;