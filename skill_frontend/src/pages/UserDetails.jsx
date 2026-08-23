import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { getUser } from "../redux/slices/userSlice";
import { getAllSkills } from "../redux/slices/skillSlice";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { me, loading: userLoading } = useSelector(
    (state) => state.user
  );

  const {
    skills = [],
    loading: skillLoading,
  } = useSelector((state) => state.skill);

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(getUser(id));
    dispatch(getAllSkills());
  }, [dispatch, id]);

  const getSkill = (skillId) => {
    return skills.find(
      (skill) =>
        Number(skill.id) === Number(skillId)
    );
  };

  const getSkillName = (skillId) => {
    const skill = getSkill(skillId);

    return (
      skill?.name ||
      `Skill #${skillId}`
    );
  };

  const getSkillDescription = (skillId) => {
    const skill = getSkill(skillId);

    return (
      skill?.description ||
      "No description available."
    );
  };

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

  if (userLoading || skillLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!me) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            👤
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            User not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            This profile is not available.
          </p>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const preference =
    me?.preference?.toUpperCase();

  const isTeacher = preference === "TEACH";
  const isLearner = preference === "LEARN";

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
        >
          ← Back
        </button>

        {/* Profile Header */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-100">

          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-24 -bottom-28 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10">

            <div className="flex flex-col sm:flex-row sm:items-center gap-6">

              <div className="w-24 h-24 rounded-3xl bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                <span className="text-3xl font-bold">
                  {me?.firstName?.charAt(0)}
                  {me?.lastName?.charAt(0)}
                </span>
              </div>

              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-2 mb-2">

                  {isTeacher && (
                    <span className="px-3 py-1 rounded-lg bg-green-400/20 border border-green-200/30 text-green-100 text-xs font-semibold">
                      🎓 Teacher
                    </span>
                  )}

                  {isLearner && (
                    <span className="px-3 py-1 rounded-lg bg-purple-400/20 border border-purple-200/30 text-purple-100 text-xs font-semibold">
                      📚 Learner
                    </span>
                  )}

                </div>

                <h1 className="text-3xl sm:text-4xl font-bold">
                  {me?.firstName} {me?.lastName}
                </h1>

                <p className="mt-2 text-blue-100">
                  @{me?.username}
                </p>

                <p className="mt-1 text-blue-100 text-sm">
                  {me?.email}
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* Main Content */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

          {/* About */}

          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                👤
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  About
                </h2>

                <p className="text-xs text-gray-400">
                  Profile information
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
                  Preference
                </p>

                <span
                  className={`inline-flex mt-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                    isTeacher
                      ? "bg-green-50 text-green-700"
                      : isLearner
                      ? "bg-purple-50 text-purple-700"
                      : "bg-gray-50 text-gray-600"
                  }`}
                >
                  {isTeacher
                    ? "I want to teach"
                    : isLearner
                    ? "I want to learn"
                    : "Not specified"}
                </span>
              </div>

            </div>
          </section>

          {/* Skills */}

          <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-900">
                  {isTeacher
                    ? "Skills they can teach"
                    : isLearner
                    ? "Skills they want to learn"
                    : "Skills"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Skills added to this profile.
                </p>

              </div>

              <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                {me?.userSkillLevels?.length || 0}{" "}
                Skills
              </span>

            </div>

            {me?.userSkillLevels?.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {me.userSkillLevels.map(
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
                  📚
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">
                  No skills added
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  This user hasn't added any skills yet.
                </p>

              </div>

            )}

          </section>

          {/* Preference */}

          <section className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isTeacher
                      ? "bg-green-50"
                      : "bg-purple-50"
                  }`}
                >
                  {isTeacher ? "🎓" : "📚"}
                </div>

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-400 font-semibold">
                    SkillSwap preference
                  </p>

                  <h2 className="text-xl font-bold text-gray-900 mt-1">
                    {isTeacher
                      ? "This person wants to teach"
                      : isLearner
                      ? "This person wants to learn"
                      : "Preference not specified"}
                  </h2>

                </div>

              </div>

              <span
                className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                  isTeacher
                    ? "bg-green-50 text-green-700"
                    : isLearner
                    ? "bg-purple-50 text-purple-700"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                {preference || "N/A"}
              </span>

            </div>

          </section>

        </div>
      </main>
    </div>
  );
};

export default UserDetails;