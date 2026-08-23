import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      !formData.username ||
      !formData.firstName ||
      !formData.lastName
    ) {
      toast.warning("Please fill all fields");
      return;
    }

    try {
      const result = await dispatch(register(formData)).unwrap();

      toast.success(result?.message || "Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-8">

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-6xl">

        <div className="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

          {/* =====================================================
              LEFT SIDE - BRAND / PSYCHOLOGY
          ====================================================== */}
          <div className="hidden lg:flex relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-12 text-white flex-col justify-between">

            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                  <span className="text-2xl">↔</span>
                </div>

                <div>
                  <h1 className="text-xl font-bold">
                    SkillSwap
                  </h1>

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
                Learn from real people
              </div>

              <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
                Your skills are
                <span className="text-blue-200">
                  {" "}worth sharing.
                </span>
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-relaxed max-w-md">
                Exchange your knowledge with people who can teach
                you something new.
              </p>

              {/* Benefits */}
              <div className="mt-8 space-y-4">

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold">
                      Share what you know
                    </p>

                    <p className="text-sm text-blue-100 mt-1">
                      Turn your existing skills into opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ↗
                  </div>

                  <div>
                    <p className="font-semibold">
                      Learn something new
                    </p>

                    <p className="text-sm text-blue-100 mt-1">
                      Find people who can help you grow.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    ♡
                  </div>

                  <div>
                    <p className="font-semibold">
                      Build meaningful connections
                    </p>

                    <p className="text-sm text-blue-100 mt-1">
                      Learn together instead of learning alone.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Social proof */}
            <div className="border-t border-white/20 pt-6">

              <div className="flex items-center gap-3">

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
                  <p className="text-sm font-medium">
                    Join the SkillSwap community
                  </p>

                  <p className="text-xs text-blue-100">
                    Learners and mentors growing together
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT SIDE - REGISTRATION FORM
          ====================================================== */}
          <div className="bg-white px-6 py-8 sm:px-10 lg:px-12 xl:px-16">

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">

              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                ↔
              </div>

              <div>
                <h1 className="font-bold text-gray-900">
                  SkillSwap
                </h1>

                <p className="text-xs text-gray-500">
                  Learn. Teach. Connect.
                </p>
              </div>

            </div>

            {/* Heading */}
            <div className="mb-8">

              <p className="text-blue-600 text-sm font-semibold mb-2">
                START YOUR JOURNEY
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                Create your account
              </h2>

              <p className="text-gray-500 mt-2">
                Join SkillSwap and start exchanging knowledge.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Ritik"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Raushan"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>

              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    @
                  </span>

                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="choose a username"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <span className="text-xs text-gray-400">
                    At least 6 characters
                  </span>

                </div>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Trust message */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">

                <div className="text-blue-600 mt-0.5">
                  🔒
                </div>

                <p className="text-xs leading-relaxed text-blue-800">
                  Your information is used only to create and
                  personalize your SkillSwap experience.
                </p>

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating your account...
                  </span>
                ) : (
                  "Create my SkillSwap account →"
                )}
              </button>

            </form>

            {/* Login */}
            <div className="mt-7 text-center">

              <p className="text-sm text-gray-500">
                Already have an account?{" "}

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Sign in
                </button>
              </p>

            </div>

            {/* Bottom reassurance */}
            <p className="text-center text-xs text-gray-400 mt-8">
              By creating an account, you agree to our terms and
              community guidelines.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Registration;