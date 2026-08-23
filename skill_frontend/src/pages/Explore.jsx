import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getAllUsers,
  getUser,
  updatePreference,
} from "../redux/slices/userSlice";

import { getAllSkills } from "../redux/slices/skillSlice";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const {
    me,
    allUsers = [],
    loading: userLoading,
  } = useSelector((state) => state.user);

  const {
    skills = [],
    loading: skillLoading,
  } = useSelector((state) => state.skill);

  const [selectedPreference, setSelectedPreference] =
    useState("ALL");

  const [searchSkill, setSearchSkill] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllSkills());

    if (user?.id) {
      dispatch(getUser(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (me?.preference) {
      setSelectedPreference(
        me.preference.toUpperCase()
      );
    }
  }, [me?.preference]);

  const handlePreferenceChange = async (value) => {
    if (value === "ALL") {
      setSelectedPreference("ALL");
      return;
    }

    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    const previousPreference =
      me?.preference?.toUpperCase() || "ALL";

    setSelectedPreference(value);

    if (value === previousPreference) {
      return;
    }

    try {
      const result = await dispatch(
        updatePreference({
          id: user.id,
          preference: value,
        })
      ).unwrap();

      toast.success(
        result?.message ||
          `Preference changed to ${value}`
      );

      await dispatch(getUser(user.id));
      await dispatch(getAllUsers());
    } catch (error) {
      console.error(
        "Preference update error:",
        error
      );

      setSelectedPreference(previousPreference);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message ||
              "Failed to update preference"
      );
    }
  };

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

  const otherUsers = useMemo(() => {
    return allUsers.filter(
      (person) =>
        Number(person.id) !== Number(user?.id)
    );
  }, [allUsers, user?.id]);

  const teachUsers = useMemo(() => {
    return otherUsers.filter(
      (person) =>
        person.preference?.toUpperCase() ===
        "TEACH"
    );
  }, [otherUsers]);

  const learnUsers = useMemo(() => {
    return otherUsers.filter(
      (person) =>
        person.preference?.toUpperCase() ===
        "LEARN"
    );
  }, [otherUsers]);

  const filteredByPreference = useMemo(() => {
    if (selectedPreference === "TEACH") {
      return learnUsers;
    }

    if (selectedPreference === "LEARN") {
      return teachUsers;
    }

    return otherUsers;
  }, [
    selectedPreference,
    teachUsers,
    learnUsers,
    otherUsers,
  ]);

  const filteredUsers = useMemo(() => {
    const search = searchSkill.trim().toLowerCase();

    if (!search) {
      return filteredByPreference;
    }

    return filteredByPreference.filter((person) =>
      person?.userSkillLevels?.some(
        (userSkill) => {
          const skill = getSkill(
            userSkill.skillId
          );

          return (
            skill?.name
              ?.toLowerCase()
              .includes(search) ||
            skill?.description
              ?.toLowerCase()
              .includes(search)
          );
        }
      )
    );
  }, [
    filteredByPreference,
    searchSkill,
    skills,
  ]);

  const clearSearch = () => {
    setSearchSkill("");
  };

  const renderUserCard = (person) => {
    const type =
      person?.preference?.toUpperCase();

    const matchingSkills =
      person?.userSkillLevels?.filter(
        (userSkill) => {
          const skill = getSkill(
            userSkill.skillId
          );

          if (!searchSkill.trim()) {
            return true;
          }

          const search =
            searchSkill.trim().toLowerCase();

          return (
            skill?.name
              ?.toLowerCase()
              .includes(search) ||
            skill?.description
              ?.toLowerCase()
              .includes(search)
          );
        }
      ) || [];

    const displayedSkills =
      searchSkill.trim()
        ? matchingSkills.slice(0, 3)
        : person?.userSkillLevels?.slice(0, 3) || [];

    return (
      <article
        key={person.id}
        className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-200 overflow-hidden"
      >
        <div className="h-24 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50" />

        <div className="px-5 pb-5">
          <div className="flex items-end justify-between -mt-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 border-4 border-white shadow-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {person?.firstName?.charAt(0)}
                {person?.lastName?.charAt(0)}
              </span>
            </div>

            <span
              className={`mb-2 px-2.5 py-1 rounded-lg border text-xs font-semibold ${
                type === "TEACH"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : "bg-purple-50 text-purple-700 border-purple-100"
              }`}
            >
              {type === "TEACH"
                ? "● Teaching"
                : "● Learning"}
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
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                {type === "TEACH"
                  ? "Can teach"
                  : "Wants to learn"}
              </p>

              <span className="text-xs text-gray-400">
                {person?.userSkillLevels?.length ||
                  0}{" "}
                skills
              </span>
            </div>

            {displayedSkills.length > 0 ? (
              <div className="space-y-3">
                {displayedSkills.map(
                  (userSkill) => (
                    <div
                      key={userSkill.id}
                      className="p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-800 truncate">
                            {getSkillName(
                              userSkill.skillId
                            )}
                          </p>

                          <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                            {getSkillDescription(
                              userSkill.skillId
                            )}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 px-2 py-1 rounded-md border text-[11px] font-semibold ${getLevelStyle(
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

                {!searchSkill.trim() &&
                  person.userSkillLevels
                    .length > 3 && (
                    <p className="text-xs text-blue-600 font-semibold">
                      +
                      {person.userSkillLevels
                        .length - 3}{" "}
                      more skills
                    </p>
                  )}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-100 text-center">
                <p className="text-sm text-yellow-700">
                  No matching skill found.
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            className="mt-5 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-100"
            onClick={()=>navigate(`/home/userDetails/${person.id}`)}
          >
            View Skill Profile →
          </button>
        </div>
      </article>
    );
  };

  if (userLoading || skillLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-500 font-medium">
            Finding people and skills for you...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-100">
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-24 -bottom-28 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-blue-50 mb-5">
              <span>🌍</span>
              <span>
                Discover your learning community
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Find the right people for your
              <span className="block text-blue-200">
                SkillSwap journey.
              </span>
            </h1>

            <p className="mt-4 text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              Search by the skill you want to learn
              or teach and find people with matching
              interests.
            </p>

            <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">
                  Teachers
                </p>

                <p className="text-2xl font-bold">
                  {teachUsers.length}
                </p>
              </div>

              <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">
                  Learners
                </p>

                <p className="text-2xl font-bold">
                  {learnUsers.length}
                </p>
              </div>

              <div className="px-4 py-3 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">
                  Skills
                </p>

                <p className="text-2xl font-bold">
                  {skills.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-blue-600">
                Your preference
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-1">
                What do you want to do?
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your preference controls who you
                discover.
              </p>
            </div>

            <select
              value={selectedPreference}
              onChange={(e) =>
                handlePreferenceChange(
                  e.target.value
                )
              }
              className="w-full lg:w-72 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 font-medium outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="ALL">
                Show everyone
              </option>

              <option value="TEACH">
                I want to teach
              </option>

              <option value="LEARN">
                I want to learn
              </option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("TEACH")
              }
              className={`p-5 rounded-2xl border text-left transition ${
                selectedPreference === "TEACH"
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                  : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50/40"
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-xl">
                🎓
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                I want to teach
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Share your knowledge with people
                who want to learn your skills.
              </p>

              {selectedPreference ===
                "TEACH" && (
                <span className="inline-block mt-3 text-xs font-semibold text-blue-600">
                  Selected ✓
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                handlePreferenceChange("LEARN")
              }
              className={`p-5 rounded-2xl border text-left transition ${
                selectedPreference === "LEARN"
                  ? "border-purple-500 bg-purple-50 ring-2 ring-purple-100"
                  : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/40"
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center text-xl">
                📚
              </div>

              <h3 className="mt-4 font-bold text-gray-900">
                I want to learn
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Find people who can teach you
                something new.
              </p>

              {selectedPreference ===
                "LEARN" && (
                <span className="inline-block mt-3 text-xs font-semibold text-purple-600">
                  Selected ✓
                </span>
              )}
            </button>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Search by skill
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Type a skill like React, Java, Python,
                SQL or JavaScript.
              </p>
            </div>

            <div className="relative w-full lg:w-[420px]">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                🔍
              </span>

              <input
                type="text"
                value={searchSkill}
                onChange={(e) =>
                  setSearchSkill(e.target.value)
                }
                placeholder="Search for a skill..."
                className="w-full pl-11 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />

              {searchSkill && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-600 transition"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.slice(0, 8).map((skill) => (
              <button
                key={skill.id}
                type="button"
                onClick={() =>
                  setSearchSkill(skill.name)
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  searchSkill.toLowerCase() ===
                  skill.name?.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                {skill.name}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                {selectedPreference ===
                "TEACH"
                  ? "🤝"
                  : selectedPreference ===
                      "LEARN"
                    ? "🎓"
                    : "🌍"}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPreference ===
                  "TEACH"
                    ? "People who want to learn from you"
                    : selectedPreference ===
                        "LEARN"
                      ? "People who can teach you"
                      : "Explore the community"}
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {searchSkill.trim()
                    ? `Showing people connected with "${searchSkill}".`
                    : selectedPreference ===
                        "TEACH"
                      ? "Connect with learners who are looking for skills you can teach."
                      : selectedPreference ===
                          "LEARN"
                        ? "Connect with teachers who have skills you want to learn."
                        : "Explore teachers and learners on SkillSwap."}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
              {filteredUsers.length}{" "}
              {filteredUsers.length === 1
                ? "Person"
                : "People"}
            </div>
          </div>

          {filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredUsers.map((person) =>
                renderUserCard(person)
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                🔍
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                No matching people found
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Try another skill or change your
                preference to find more people.
              </p>

              {searchSkill && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </section>

        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Explore popular skills
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Click a skill to search for people
              interested in it.
            </p>
          </div>

          {skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.slice(0, 8).map((skill) => (
                <button
                  type="button"
                  key={skill.id}
                  onClick={() =>
                    navigate(`/home/skillDetails/${skill.id}`)
                  }
                  className="text-left bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {skill.name
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="mt-4 font-bold text-gray-900">
                    {skill.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                    {skill.description ||
                      "Discover people who can teach this skill."}
                  </p>

                  <p className="mt-4 text-xs font-semibold text-blue-600">
                    Search this skill →
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-500">
                No skills available right now.
              </p>
            </div>
          )}
        </section>

        <section className="mt-10">
          <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
            <div className="absolute right-0 top-0 w-48 h-48 bg-blue-100/40 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  The best way to learn is
                  together. 🤝
                </h2>

                <p className="text-sm text-gray-500 mt-1 max-w-2xl">
                  Find someone who knows what you
                  want to learn, and share something
                  you know in return.
                </p>
              </div>

              <div className="shrink-0 px-4 py-2.5 rounded-xl bg-blue-50 text-blue-700 text-sm font-semibold">
                Learn • Teach • Swap
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Explore;