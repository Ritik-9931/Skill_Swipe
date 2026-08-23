import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "../redux/slices/userSlice";

import {
  getAllSkillLevel,
  getAllSkills,
} from "../redux/slices/skillSlice";

const Profile = () => {
  const dispatch = useDispatch();

  // =========================================================
  // AUTH USER
  // =========================================================

  const { user } = useSelector((state) => state.auth);

  // =========================================================
  // USER PROFILE
  // =========================================================

  const { me, loading: userLoading } = useSelector(
    (state) => state.user
  );

  // =========================================================
  // SKILLS
  // =========================================================

  const {
    skills = [],
    userSkillLevels = [],
    skillLoading,
    skillLevelLoading,
  } = useSelector((state) => state.skill);

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    dispatch(getUser(user.id));
    dispatch(getAllSkills());
    dispatch(getAllSkillLevel(user.id));
  }, [dispatch, user?.id]);

  // =========================================================
  // LEVEL NAME
  // =========================================================

  const getLevelName = (level) => {
    const levels = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
      4: "Master",
      5: "Advanced Master",
    };

    return (
      levels[Number(level)] ||
      "Not specified"
    );
  };

  // =========================================================
  // LEVEL STYLE
  // =========================================================

  const getLevelStyle = (level) => {
    const styles = {
      1: "bg-green-50 text-green-700 border-green-100",
      2: "bg-blue-50 text-blue-700 border-blue-100",
      3: "bg-purple-50 text-purple-700 border-purple-100",
      4: "bg-orange-50 text-orange-700 border-orange-100",
      5: "bg-red-50 text-red-700 border-red-100",
    };

    return (
      styles[Number(level)] ||
      "bg-gray-50 text-gray-600 border-gray-100"
    );
  };

  // =========================================================
  // GET SKILL NAME
  // =========================================================

  const getSkillName = (skillId) => {
    const skill = skills.find(
      (item) =>
        Number(item.id) === Number(skillId)
    );

    return (
      skill?.name ||
      `Skill #${skillId}`
    );
  };

  // =========================================================
  // GET SKILL DESCRIPTION
  // =========================================================

  const getSkillDescription = (skillId) => {
    const skill = skills.find(
      (item) =>
        Number(item.id) === Number(skillId)
    );

    return (
      skill?.description ||
      "No description available."
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (
    userLoading ||
    skillLoading ||
    skillLevelLoading
  ) {
    return (
      <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-slate-50">
        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500">
            Loading your profile...
          </p>

        </div>
      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ===================================================
            PROFILE HERO
        =================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl">

          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-3xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">

                <span className="text-3xl font-bold">
                  {me?.firstName?.charAt(0)}
                  {me?.lastName?.charAt(0)}
                </span>

              </div>

              {/* Info */}
              <div>

                <p className="text-sm text-blue-100 mb-1">
                  Your SkillSwap profile
                </p>

                <h1 className="text-3xl sm:text-4xl font-bold">
                  {me?.firstName} {me?.lastName}
                </h1>

                <p className="mt-2 text-blue-100">
                  @{me?.username}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-sm">
                    {me?.role || "Member"}
                  </span>

                  <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-sm">
                    {userSkillLevels.length}{" "}
                    {userSkillLevels.length === 1
                      ? "Skill"
                      : "Skills"}
                  </span>

                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ===================================================
            PROFILE CONTENT
        =================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* =================================================
              PERSONAL INFORMATION
          ================================================= */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                👤
              </div>

              <div>

                <h2 className="font-bold text-gray-900">
                  Personal Information
                </h2>

                <p className="text-xs text-gray-400">
                  Your account details
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  First Name
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {me?.firstName || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  Last Name
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {me?.lastName || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  Username
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  @{me?.username || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-800 break-all">
                  {me?.email || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                  Role
                </p>

                <span className="inline-flex mt-2 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                  {me?.role || "Member"}
                </span>
              </div>

            </div>

          </section>

          {/* =================================================
              SKILLS
          ================================================= */}

          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    💡
                  </div>

                  <div>

                    <h2 className="font-bold text-gray-900">
                      My Skills
                    </h2>

                    <p className="text-xs text-gray-400">
                      Skills you can share
                    </p>

                  </div>

                </div>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                {userSkillLevels.length}{" "}
                {userSkillLevels.length === 1
                  ? "Skill"
                  : "Skills"}
              </span>

            </div>

            {userSkillLevels.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {userSkillLevels.map(
                  (userSkill) => (

                    <div
                      key={userSkill.id}
                      className="p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition"
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="min-w-0">

                          <h3 className="font-semibold text-gray-900 truncate">
                            {getSkillName(
                              userSkill.skillId
                            )}
                          </h3>

                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {getSkillDescription(
                              userSkill.skillId
                            )}
                          </p>

                        </div>

                        <span
                          className={`shrink-0 px-2.5 py-1 rounded-lg border text-xs font-semibold ${getLevelStyle(
                            userSkill.level
                          )}`}
                        >
                          {getLevelName(
                            userSkill.level
                          )}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="py-12 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 text-center">

                <div className="text-3xl">
                  💡
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">
                  No skills added yet
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Add skills to your profile to help people
                  discover what you can teach.
                </p>

              </div>

            )}

          </section>

          {/* =================================================
              LEARNING PREFERENCE
          ================================================= */}

          <section className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
                    🎯
                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                      Learning Preference
                    </p>

                    <h2 className="text-xl font-bold text-gray-900 mt-1">
                      {me?.preference ||
                        "Not specified"}
                    </h2>

                  </div>

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  Your learning preference helps SkillSwap
                  understand what kind of learning experience
                  suits you.
                </p>

              </div>

              <span className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 text-sm font-semibold">
                {me?.preference
                  ? "Preference set ✓"
                  : "Not set"}
              </span>

            </div>

          </section>

        </div>

      </main>
    </div>
  );
};

export default Profile;