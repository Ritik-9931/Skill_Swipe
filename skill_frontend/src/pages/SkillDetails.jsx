import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllUsers } from "../redux/slices/userSlice";
import { getAllSkills } from "../redux/slices/skillSlice";

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    allUsers = [],
    loading: userLoading,
  } = useSelector((state) => state.user);

  const {
    skills = [],
    loading: skillLoading,
  } = useSelector((state) => state.skill);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllSkills());
  }, [dispatch]);

  const skill = useMemo(() => {
    return skills.find(
      (item) => Number(item.id) === Number(id)
    );
  }, [skills, id]);

  const usersWithSkill = useMemo(() => {
    return allUsers.filter((user) =>
      user?.userSkillLevels?.some(
        (userSkill) =>
          Number(userSkill.skillId) === Number(id)
      )
    );
  }, [allUsers, id]);

  const getUserSkill = (user) => {
    return user?.userSkillLevels?.find(
      (userSkill) =>
        Number(userSkill.skillId) === Number(id)
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

    return levels[Number(level)] || "Not specified";
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

  const getPreferenceName = (preference) => {
    const value = preference?.toUpperCase();

    if (value === "TEACH") {
      return "Wants to Teach";
    }

    if (value === "LEARN") {
      return "Wants to Learn";
    }

    return "Preference Not Specified";
  };

  const getPreferenceStyle = (preference) => {
    const value = preference?.toUpperCase();

    if (value === "TEACH") {
      return "bg-green-50 text-green-700 border-green-100";
    }

    if (value === "LEARN") {
      return "bg-purple-50 text-purple-700 border-purple-100";
    }

    return "bg-gray-50 text-gray-600 border-gray-100";
  };

  const getPreferenceIcon = (preference) => {
    const value = preference?.toUpperCase();

    if (value === "TEACH") {
      return "🎓";
    }

    if (value === "LEARN") {
      return "📚";
    }

    return "👤";
  };

  if (userLoading || skillLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500 font-medium">
            Finding people with this skill...
          </p>
        </div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-xl font-bold text-gray-900">
            Skill not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            The skill you're looking for doesn't exist.
          </p>

          <button
            type="button"
            onClick={() => navigate("/home/skills")}
            className="mt-5 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Back to Skills
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-600 transition"
        >
          ← Back
        </button>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-100">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-24 -bottom-28 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-2xl font-bold mb-5">
                  {skill.name?.charAt(0)?.toUpperCase()}
                </div>

                <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">
                  Skill
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-1">
                  {skill.name}
                </h1>

                <p className="mt-4 text-blue-100 max-w-2xl leading-relaxed">
                  {skill.description ||
                    "Discover people who have this skill and connect with them."}
                </p>
              </div>

              <div className="shrink-0 px-5 py-4 rounded-2xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">
                  People with this skill
                </p>

                <p className="text-3xl font-bold mt-1">
                  {usersWithSkill.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                People with {skill.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Explore members who have added this skill to their profile.
              </p>
            </div>

            <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
              {usersWithSkill.length}{" "}
              {usersWithSkill.length === 1
                ? "Person"
                : "People"}
            </span>
          </div>

          {usersWithSkill.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {usersWithSkill.map((person) => {
                const userSkill = getUserSkill(person);

                return (
                  <article
                    key={person.id}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-200 overflow-hidden"
                  >
                    <div className="h-20 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50" />

                    <div className="px-5 pb-5">
                      <div className="flex items-end justify-between -mt-10">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white shadow-lg flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {person?.firstName?.charAt(0)}
                            {person?.lastName?.charAt(0)}
                          </span>
                        </div>

                        <span
                          className={`mb-2 px-2.5 py-1 rounded-lg border text-xs font-semibold ${getLevelStyle(
                            userSkill?.level
                          )}`}
                        >
                          {getLevelName(
                            userSkill?.level
                          )}
                        </span>
                      </div>

                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {person?.firstName}{" "}
                          {person?.lastName}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          @{person?.username}
                        </p>

                        <div className="mt-4">
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${getPreferenceStyle(
                              person?.preference
                            )}`}
                          >
                            <span>
                              {getPreferenceIcon(
                                person?.preference
                              )}
                            </span>

                            {getPreferenceName(
                              person?.preference
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <p className="text-xs uppercase tracking-wider font-semibold text-blue-500">
                          Skill Level
                        </p>

                        <p className="mt-1 font-bold text-blue-900">
                          {getLevelName(
                            userSkill?.level
                          )}
                        </p>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>📧</span>

                          <span className="truncate">
                            {person?.email}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>
                            {person?.preference?.toUpperCase() ===
                            "TEACH"
                              ? "🎓"
                              : person?.preference?.toUpperCase() ===
                                "LEARN"
                              ? "📚"
                              : "👤"}
                          </span>

                          <span>
                            {person?.preference?.toUpperCase() ===
                            "TEACH"
                              ? "Available to teach"
                              : person?.preference?.toUpperCase() ===
                                "LEARN"
                              ? "Looking to learn"
                              : "Preference not specified"}
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/home/userDetails/${person.id}`
                          )
                        }
                        className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-100"
                      >
                        View Profile →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                🔍
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                No one has added this skill yet
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Be one of the first people to add this skill
                to your SkillSwap profile.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default SkillDetails;