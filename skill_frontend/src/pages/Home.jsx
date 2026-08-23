import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getUser } from "../redux/slices/userSlice";

import {
  addUserSkillLevel,
  getAllSkillLevel,
  getAllSkills,
} from "../redux/slices/skillSlice";

const Home = () => {
  const dispatch = useDispatch();

  // =========================
  // REDUX STATE
  // =========================
  const { user } = useSelector((state) => state.auth);

  const me = useSelector((state) => state.user.me);

  const { loading } = useSelector((state) => state.user);

  const { skills = [], skillLevelLoading } = useSelector(
    (state) => state.skill,
  );

  // =========================
  // LOCAL STATE
  // =========================
  const [skillLevelData, setSkillLevelData] = useState({
    userId: "",
    skillId: "",
    level: "",
  });

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    if (!user?.id) return;

    dispatch(getUser(user.id));
    dispatch(getAllSkills());
    dispatch(getAllSkillLevel(user.id));

    setSkillLevelData((prev) => ({
      ...prev,
      userId: user.id,
    }));
  }, [dispatch, user?.id]);

  // =========================
  // SKILL NAME
  // =========================
  const getSkillName = (skillId) => {
    const skill = skills.find((item) => Number(item.id) === Number(skillId));

    return skill?.name || `Skill #${skillId}`;
  };

  // =========================
  // LEVEL NAME
  // =========================
  const getLevelName = (level) => {
    const levels = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
      4: "Master",
      5: "Advanced Master",
    };

    return levels[level] || "Not specified";
  };

  // =========================
  // LEVEL STYLE
  // =========================
  const getLevelStyle = (level) => {
    const styles = {
      1: "bg-green-50 text-green-700 border-green-100",
      2: "bg-blue-50 text-blue-700 border-blue-100",
      3: "bg-purple-50 text-purple-700 border-purple-100",
      4: "bg-orange-50 text-orange-700 border-orange-100",
      5: "bg-red-50 text-red-700 border-red-100",
    };

    return styles[level] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSkillLevelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // ADD SKILL
  // =========================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (
      !skillLevelData.userId ||
      !skillLevelData.skillId ||
      !skillLevelData.level
    ) {
      toast.warning("Please select a skill and skill level.");
      return;
    }

    try {
      const result = await dispatch(
        addUserSkillLevel({
          userId: Number(skillLevelData.userId),
          skillId: Number(skillLevelData.skillId),
          level: skillLevelData.level,
        }),
      ).unwrap();

      toast.success(result?.message || "Skill added successfully!");

      setSkillLevelData((prev) => ({
        ...prev,
        skillId: "",
        level: "",
      }));

      dispatch(getAllSkillLevel(user.id));
      dispatch(getUser(user.id));
    } catch (err) {
      console.error("Add skill error:", err);

      toast.error(
        typeof err === "string" ? err : err?.message || "Failed to add skill",
      );
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500 font-medium">
            Preparing your Skill Swap space...
          </p>
        </div>
      </div>
    );
  }

  const userSkills = me?.userSkillLevels || [];

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* =====================================================
            HERO / WELCOME
        ===================================================== */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-100">
          <div className="absolute -right-16 -top-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-blue-50 mb-5">
              <span>✨</span>
              <span>Your learning journey starts here</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Hey, {me?.firstName || "there"} 👋
            </h1>

            <p className="mt-4 text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
              Share what you're good at, discover what others can teach you, and
              build meaningful skill connections.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">Your skills</p>

                <p className="text-xl font-bold">{userSkills.length}</p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">Learning preference</p>

                <p className="text-sm font-semibold mt-1">
                  {me?.preference || "Not set"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            CONTENT GRID
        ===================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* ===================================================
              PROFILE
          =================================================== */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-100">
                <span className="text-xl font-bold text-white">
                  {me?.firstName?.charAt(0)}
                  {me?.lastName?.charAt(0)}
                </span>
              </div>

              <div className="min-w-0">
                <h2 className="font-bold text-gray-900 text-lg truncate">
                  {me?.username}
                </h2>

                <p className="text-sm text-gray-500 truncate">{me?.email}</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  First Name
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {me?.firstName || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Last Name
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {me?.lastName || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Account Type
                </p>

                <span className="inline-flex mt-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                  {me?.role || "Member"}
                </span>
              </div>
            </div>

            {/* Profile completion */}
            <div className="mt-7 p-4 rounded-xl bg-slate-50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700">
                  Profile progress
                </span>

                <span className="text-sm font-bold text-blue-600">
                  {userSkills.length > 0 ? "75%" : "50%"}
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full ${
                    userSkills.length > 0 ? "w-3/4" : "w-1/2"
                  }`}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Add more skills to improve your chances of finding the right
                match.
              </p>
            </div>
          </section>

          {/* ===================================================
              SKILLS
          =================================================== */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600">⚡</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">My Skills</h2>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Skills you can share with the Skill Swap community.
                </p>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                {userSkills.length}{" "}
                {userSkills.length === 1 ? "Skill" : "Skills"}
              </div>
            </div>

            {/* Existing skills */}
            <div className="mt-6">
              {userSkills.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {userSkills.map((skill) => (
                    <div
                      key={skill?.id}
                      className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center shrink-0">
                          <span className="text-lg">💡</span>
                        </div>

                        <div className="min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {getSkillName(skill?.skillId)}
                          </h3>

                          <span
                            className={`inline-flex mt-1 px-2 py-0.5 rounded-md border text-xs font-medium ${getLevelStyle(
                              skill?.level,
                            )}`}
                          >
                            {getLevelName(skill?.level)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                    💡
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-800">
                    Your skill list is empty
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 max-w-sm mx-auto">
                    Add your first skill and let other people know what you can
                    teach.
                  </p>
                </div>
              )}
            </div>

            {/* =================================================
                ADD SKILL
            ================================================= */}
            <div className="mt-7 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-100 p-5">
              <div className="mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                    <span>➕</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900">Add a skill</h3>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Tell the community what you can teach.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Skill */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                    Skill
                  </label>

                  <select
                    name="skillId"
                    value={skillLevelData.skillId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Choose a skill</option>

                    {skills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                    Your level
                  </label>

                  <select
                    name="level"
                    value={skillLevelData.level}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="">Choose your level</option>

                    <option value="1">Beginner</option>

                    <option value="2">Intermediate</option>

                    <option value="3">Advanced</option>

                    <option value="4">Master</option>

                    <option value="5">Advanced Master</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                disabled={skillLevelLoading}
                className="mt-5 w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {skillLevelLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Adding skill...
                  </span>
                ) : (
                  "Add Skill"
                )}
              </button>
            </div>
          </section>

          {/* ===================================================
              LEARNING PREFERENCE
          =================================================== */}
          <section className="lg:col-span-3 relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="absolute right-0 top-0 w-48 h-48 bg-purple-100/50 rounded-full blur-3xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    <span className="text-xl">🎯</span>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Learning Preference
                    </p>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                      {me?.preference || "Not specified"}
                    </h2>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-4 max-w-xl">
                  Your preference helps us understand how you'd like to learn
                  and find people who match your learning style.
                </p>
              </div>

              <div className="shrink-0">
                <div className="px-5 py-3 rounded-xl bg-purple-50 text-purple-700 font-semibold text-sm">
                  {me?.preference ? "Preference set ✓" : "Set your preference"}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* =====================================================
            MOTIVATION SECTION
        ===================================================== */}
        <section className="mt-8">
          <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  🚀 Ready to swap skills?
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  The more skills you share, the easier it becomes to find the
                  right learning partner.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                Your profile is active
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
