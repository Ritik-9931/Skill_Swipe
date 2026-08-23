import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user } = useSelector((state) => state.auth);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (user?.id) {
      navigate("/home", { replace: true });
    }
  }, [user?.id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.warning("Please enter your email and password");
      return;
    }

    try {
      const result = await dispatch(login(formData)).unwrap();

      toast.success(result?.message || "Welcome back!");

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        typeof error === "string" ? error : error?.message || "Login failed",
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="relative w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-white flex-col justify-between">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                  <span className="text-2xl font-bold">↔</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold">SkillSwap</h1>

                  <p className="text-xs text-blue-100">
                    Learn. Teach. Connect.
                  </p>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="my-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-blue-50 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-300" />
                Your learning community
              </div>

              <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                Learn from people.
                <span className="block text-blue-200">
                  Share what you know.
                </span>
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-relaxed max-w-md">
                Connect with people who have the skills you want and exchange
                knowledge that helps both of you grow.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold">Learn practical skills</p>

                    <p className="text-sm text-blue-100 mt-1">
                      Learn directly from people with real experience.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    ↔
                  </div>

                  <div>
                    <p className="font-semibold">Exchange knowledge</p>

                    <p className="text-sm text-blue-100 mt-1">
                      Teach your skills while learning something new.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    ✦
                  </div>

                  <div>
                    <p className="font-semibold">Grow together</p>

                    <p className="text-sm text-blue-100 mt-1">
                      Build connections around shared interests.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="border-t border-white/20 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-9 h-9 rounded-full bg-blue-200 border-2 border-indigo-600 flex items-center justify-center text-blue-700 text-xs font-bold">
                    A
                  </div>

                  <div className="w-9 h-9 rounded-full bg-purple-200 border-2 border-indigo-600 flex items-center justify-center text-purple-700 text-xs font-bold">
                    R
                  </div>

                  <div className="w-9 h-9 rounded-full bg-green-200 border-2 border-indigo-600 flex items-center justify-center text-green-700 text-xs font-bold">
                    S
                  </div>

                  <div className="w-9 h-9 rounded-full bg-orange-200 border-2 border-indigo-600 flex items-center justify-center text-orange-700 text-xs font-bold">
                    +
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">Be part of the exchange</p>

                  <p className="text-xs text-blue-100">
                    Learn something. Teach something.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}
          <div className="bg-white px-6 py-8 sm:px-10 lg:px-12 xl:px-16 flex flex-col justify-center">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-10">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                ↔
              </div>

              <div>
                <h1 className="font-bold text-gray-900">SkillSwap</h1>

                <p className="text-xs text-gray-500">Learn. Teach. Connect.</p>
              </div>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-blue-600 text-sm font-semibold mb-2">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Continue your journey
              </h2>

              <p className="text-gray-500 mt-2 leading-relaxed">
                Sign in to discover skills, meet people, and continue learning.
              </p>
            </div>

            {/* =====================================================
                LOGIN FORM
            ====================================================== */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    •
                  </span>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Security message */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-blue-600 mt-0.5">🔒</div>

                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Your account is secure
                  </p>

                  <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                    Your login information is protected and used only to access
                    your SkillSwap account.
                  </p>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Signing you in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Continue to SkillSwap
                    <span>→</span>
                  </span>
                )}
              </button>
            </form>

            {/* =====================================================
                REGISTER
            ====================================================== */}
            <div className="mt-8 pt-7 border-t border-gray-100 text-center">
              <p className="text-sm text-gray-500">New to SkillSwap?</p>

              <button
                type="button"
                onClick={() => navigate("/register")}
                className="mt-2 text-blue-600 hover:text-blue-700 font-semibold transition"
              >
                Create your free account →
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8">
              © 2026 SkillSwap. Learn. Teach. Connect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
