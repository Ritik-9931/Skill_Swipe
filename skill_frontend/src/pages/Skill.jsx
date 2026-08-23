import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  addUserSkillLevel,
  deleteUserSkillLevel,
  getAllSkillLevel,
  getAllSkills,
  updateUserSkillLevel,
} from "../redux/slices/skillSlice";

const Skill = () => {
  const dispatch = useDispatch();

  // =========================================================
  // REDUX STATE
  // =========================================================

  const {
    skills = [],
    userSkillLevels = [],
    skillLevelLoading,
  } = useSelector((state) => state.skill);

  const { user } = useSelector((state) => state.auth);

  // =========================================================
  // LOCAL STATE
  // =========================================================

  const [skillLevelData, setSkillLevelData] = useState({
    skillId: "",
    level: "",
  });

  const [editingSkill, setEditingSkill] = useState(null);

  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    dispatch(getAllSkills());
    dispatch(getAllSkillLevel(user.id));
  }, [dispatch, user?.id]);

  // =========================================================
  // GET SKILL
  // =========================================================

  const getSkill = (skillId) => {
    return skills.find((skill) => Number(skill.id) === Number(skillId));
  };

  const getSkillName = (skillId) => {
    const skill = getSkill(skillId);

    return skill?.name || `Skill #${skillId}`;
  };

  const getSkillDescription = (skillId) => {
    const skill = getSkill(skillId);

    return skill?.description || "No description available.";
  };

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

    return levels[Number(level)] || "Not specified";
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

    return styles[Number(level)] || "bg-gray-50 text-gray-600 border-gray-100";
  };

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSkillLevelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // ADD SKILL
  // =========================================================

  const handleAddSkill = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("User not found.");
      return;
    }

    if (!skillLevelData.skillId || !skillLevelData.level) {
      toast.warning("Please select a skill and level.");
      return;
    }

    const alreadyAdded = userSkillLevels.some(
      (userSkill) =>
        Number(userSkill.skillId) === Number(skillLevelData.skillId),
    );

    if (alreadyAdded) {
      toast.info("You have already added this skill.");
      return;
    }

    try {
      const result = await dispatch(
        addUserSkillLevel({
          userId: Number(user.id),
          skillId: Number(skillLevelData.skillId),
          level: Number(skillLevelData.level),
        }),
      ).unwrap();

      toast.success(result?.message || "Skill added successfully!");

      setSkillLevelData({
        skillId: "",
        level: "",
      });

      await dispatch(getAllSkillLevel(user.id));
    } catch (error) {
      console.error("Add skill error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to add skill.",
      );
    }
  };

  // =========================================================
  // REMOVE SKILL
  // =========================================================

  const removeSkillLevel = async (userSkillLevelId) => {
    if (!userSkillLevelId) {
      toast.error("Skill level ID not found.");
      return;
    }

    try {
      const result = await dispatch(
        deleteUserSkillLevel(userSkillLevelId),
      ).unwrap();

      toast.success(result?.message || "Skill removed successfully.");

      await dispatch(getAllSkillLevel(user.id));
    } catch (error) {
      console.error("Remove skill error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to remove skill.",
      );
    }
  };

  // =========================================================
  // EDIT SKILL
  // =========================================================

  const handleEditSkill = (userSkill) => {
    setEditingSkill(userSkill);

    setSkillLevelData({
      skillId: String(userSkill.skillId),
      level: String(userSkill.level),
    });
  };

  // =========================================================
  // UPDATE SKILL
  // =========================================================

  const handleUpdateSkill = async (e) => {
    e.preventDefault();

    if (!editingSkill) {
      return;
    }

    if (!skillLevelData.skillId || !skillLevelData.level) {
      toast.warning("Please select skill and level.");
      return;
    }

    try {
      const result = await dispatch(
        updateUserSkillLevel({
          id: editingSkill.id,
          skillLevelData: {
            userId: Number(user.id),
            skillId: Number(skillLevelData.skillId),
            level: Number(skillLevelData.level),
          },
        }),
      ).unwrap();

      toast.success(result?.message || "Skill updated successfully.");

      setEditingSkill(null);

      setSkillLevelData({
        skillId: "",
        level: "",
      });

      await dispatch(getAllSkillLevel(user.id));
    } catch (error) {
      console.error("Update skill error:", error);

      toast.error(
        typeof error === "string"
          ? error
          : error?.message || "Failed to update skill.",
      );
    }
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const cancelEdit = () => {
    setEditingSkill(null);

    setSkillLevelData({
      skillId: "",
      level: "",
    });
  };

  // =========================================================
  // AVAILABLE SKILLS
  // =========================================================

  const availableSkills = skills.filter(
    (skill) =>
      !userSkillLevels.some(
        (userSkill) => Number(userSkill.skillId) === Number(skill.id),
      ),
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-100">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -left-20 -bottom-24 w-72 h-72 rounded-full bg-purple-400/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-blue-50 mb-5">
              <span>⚡</span>
              <span>Build your skill profile</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Your skills tell your story.
            </h1>

            <p className="mt-4 text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl">
              Add the skills you know, choose your level, and make it easier for
              the right people to discover you.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">Available</p>

                <p className="text-xl font-bold">{skills.length}</p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                <p className="text-xs text-blue-100">Your skills</p>

                <p className="text-xl font-bold">{userSkillLevels.length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            ADD / EDIT SKILL
        ====================================================== */}

        <section className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-xl">{editingSkill ? "✏️" : "➕"}</span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {editingSkill ? "Update your skill" : "Add a new skill"}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {editingSkill
                  ? "Update your current skill and level."
                  : "Tell the community what you can teach or offer."}
              </p>
            </div>
          </div>

          <form
            onSubmit={editingSkill ? handleUpdateSkill : handleAddSkill}
            className="mt-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Skill */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skill
                </label>

                <select
                  name="skillId"
                  value={skillLevelData.skillId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">-- Choose a skill --</option>

                  {editingSkill
                    ? skills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))
                    : availableSkills.map((skill) => (
                        <option key={skill.id} value={skill.id}>
                          {skill.name}
                        </option>
                      ))}
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your level
                </label>

                <select
                  name="level"
                  value={skillLevelData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">-- Choose level --</option>

                  <option value="1">Beginner</option>

                  <option value="2">Intermediate</option>

                  <option value="3">Advanced</option>

                  <option value="4">Master</option>

                  <option value="5">Advanced Master</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <button
                type="submit"
                disabled={
                  skillLevelLoading ||
                  !skillLevelData.skillId ||
                  !skillLevelData.level
                }
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg shadow-blue-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {skillLevelLoading
                  ? "Saving..."
                  : editingSkill
                    ? "Update Skill"
                    : "Add Skill"}
              </button>

              {editingSkill && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {!editingSkill &&
            availableSkills.length === 0 &&
            skills.length > 0 && (
              <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm">
                🎉 You've already added all available skills.
              </div>
            )}
        </section>

        {/* =====================================================
            YOUR SKILLS
        ====================================================== */}

        <section className="mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Skills</h2>

              <p className="text-sm text-gray-500 mt-1">
                Skills you can share with other members.
              </p>
            </div>

            <div className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
              {userSkillLevels.length}{" "}
              {userSkillLevels.length === 1 ? "Skill" : "Skills"}
            </div>
          </div>

          {userSkillLevels.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {userSkillLevels.map((userSkill) => (
                <div
                  key={userSkill.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <span className="text-xl">💡</span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${getLevelStyle(
                        userSkill.level,
                      )}`}
                    >
                      {getLevelName(userSkill.level)}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-gray-900">
                    {getSkillName(userSkill.skillId)}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {getSkillDescription(userSkill.skillId)}
                  </p>

                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      Skill ID #{userSkill.skillId}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleEditSkill(userSkill)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 transition"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => removeSkillLevel(userSkill.id)}
                        disabled={skillLevelLoading}
                        className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-2xl">
                💡
              </div>

              <h3 className="mt-5 text-lg font-bold text-gray-800">
                Your skill profile is empty
              </h3>

              <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
                Add your first skill above and start showing the community what
                you can bring to a skill exchange.
              </p>
            </div>
          )}
        </section>

        {/* =====================================================
            EXPLORE ALL SKILLS
        ====================================================== */}

        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-900">Explore Skills</h2>

            <p className="text-sm text-gray-500 mt-1">
              Discover the skills available on SkillSwap.
            </p>
          </div>

          {skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill) => {
                const isAdded = userSkillLevels.some(
                  (userSkill) => Number(userSkill.skillId) === Number(skill.id),
                );

                return (
                  <div
                    key={skill.id}
                    className="bg-white rounded-xl border border-gray-100 p-5 hover:border-blue-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-600 font-bold">
                        {skill.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="mt-4 font-semibold text-gray-900">
                      {skill.name}
                    </h3>

                    <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                      {skill.description || "No description available."}
                    </p>

                    <div className="mt-4">
                      {isAdded ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-600">
                          ✓ Added to your profile
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-gray-400">
                          Available to add
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center">
              <p className="text-gray-500">
                No skills are currently available.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Skill;
