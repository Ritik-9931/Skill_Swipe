import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../service/api";

export const getSkill = createAsyncThunk(
  "skill/getSkill",

  async (skillName, { rejectWithValue }) => {
    try {
      const response = await api.get(`/skills/skill/${skillName}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Skill",
      );
    }
  },
);

export const getAllSkills = createAsyncThunk(
  "skill/getAllSkills",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/skills/all`);

      console.log("GET ALL SKILLS RESPONSE:", response.data);

      return response.data;
    } catch (error) {
      console.log("GET ALL SKILLS ERROR:", error);
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch all skills",
      );
    }
  },
);

export const getAllSkillLevel = createAsyncThunk(
  "skillLevels/getAllSkillLevel",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/userSkillLevels/allSkillLevels/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch All skills",
      );
    }
  },
);

export const getUserSkillLevel = createAsyncThunk(
  "skillLevels/getUserSkillLevel",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/userSkillLevels/skillLevel/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch UserSkill",
      );
    }
  },
);

export const addUserSkillLevel = createAsyncThunk(
  "skillLevels/addUserSkillLevel",

  async (skillLevelData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `/userSkillLevels/skillLevel`,
        skillLevelData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add skillLevel",
      );
    }
  },
);

export const updateUserSkillLevel = createAsyncThunk(
  "skillLevels/updateUserSkillLevel",

  async ({ id, skillLevelData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/userSkillLevels/skillLevel/${id}`,
        skillLevelData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update skillLevel",
      );
    }
  },
);

export const deleteUserSkillLevel = createAsyncThunk(
  "skillLevels/deleteUserSkillLevel",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/userSkillLevels/skillLevel/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add skillLevel",
      );
    }
  },
);

const initialState = {
  skill: null,
  skills: [],

  userSkillLevels: [],
  userSkillLevel: null,

  loading: false,
  skillLoading: false,
  skillLevelLoading: false,

  error: null,

  successMessage: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,

  reducers: {
    clearSkillError: (state) => {
      state.error = null;
    },

    clearSkillSuccess: (state) => {
      state.successMessage = null;
    },

    clearSkill: (state) => {
      state.skill = null;
    },

    clearUserSkillLevel: (state) => {
      state.userSkillLevel = null;
    },

    clearUserSkillLevels: (state) => {
      state.userSkillLevels = [];
    },
  },

  extraReducers: (builder) => {
    // =========================================================
    // GET SINGLE SKILL
    // =========================================================
    builder
      .addCase(getSkill.pending, (state) => {
        state.skillLoading = true;
        state.error = null;
      })

      .addCase(getSkill.fulfilled, (state, action) => {
        state.skillLoading = false;
        state.skill = action.payload?.data ?? action.payload;
        state.error = null;
      })

      .addCase(getSkill.rejected, (state, action) => {
        state.skillLoading = false;
        state.error = action.payload || "Failed to fetch skill";
      });

    // =========================================================
    // GET ALL SKILLS
    // =========================================================
    builder
      .addCase(getAllSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllSkills.fulfilled, (state, action) => {
        state.loading = false;

        state.skills = Array.isArray(action.payload?.data)
          ? action.payload.data
          : [];

        state.error = null;
      })

      .addCase(getAllSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch all skills";
      });

    // =========================================================
    // GET ALL USER SKILL LEVELS
    // =========================================================
    builder
      .addCase(getAllSkillLevel.pending, (state) => {
        state.skillLevelLoading = true;
        state.error = null;
      })

      .addCase(getAllSkillLevel.fulfilled, (state, action) => {
        state.skillLevelLoading = false;

        state.userSkillLevels = action.payload?.data ?? action.payload ?? [];

        state.error = null;
      })

      .addCase(getAllSkillLevel.rejected, (state, action) => {
        state.skillLevelLoading = false;
        state.error = action.payload || "Failed to fetch all user skill levels";
      });

    // =========================================================
    // GET USER SKILL LEVEL
    // =========================================================
    builder
      .addCase(getUserSkillLevel.pending, (state) => {
        state.skillLevelLoading = true;
        state.error = null;
      })

      .addCase(getUserSkillLevel.fulfilled, (state, action) => {
        state.skillLevelLoading = false;

        state.userSkillLevel = action.payload?.data ?? action.payload ?? null;

        state.error = null;
      })

      .addCase(getUserSkillLevel.rejected, (state, action) => {
        state.skillLevelLoading = false;
        state.error = action.payload || "Failed to fetch user skill level";
      });

    // =========================================================
    // ADD USER SKILL LEVEL
    // =========================================================
    builder
      .addCase(addUserSkillLevel.pending, (state) => {
        state.skillLevelLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(addUserSkillLevel.fulfilled, (state, action) => {
        state.skillLevelLoading = false;

        const newSkillLevel = action.payload?.data ?? action.payload;

        state.userSkillLevel = newSkillLevel;

        // Add to list if a valid object is returned
        if (newSkillLevel) {
          state.userSkillLevels.push(newSkillLevel);
        }

        state.successMessage =
          action.payload?.message || "User skill level added successfully";

        state.error = null;
      })

      .addCase(addUserSkillLevel.rejected, (state, action) => {
        state.skillLevelLoading = false;
        state.error = action.payload || "Failed to add skill level";
      });

    // =========================================================
    // UPDATE USER SKILL LEVEL
    // =========================================================
    builder
      .addCase(updateUserSkillLevel.pending, (state) => {
        state.skillLevelLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateUserSkillLevel.fulfilled, (state, action) => {
        state.skillLevelLoading = false;

        const updatedSkillLevel = action.payload?.data ?? action.payload;

        state.userSkillLevel = updatedSkillLevel;

        if (updatedSkillLevel?.id) {
          const index = state.userSkillLevels.findIndex(
            (item) => item.id === updatedSkillLevel.id,
          );

          if (index !== -1) {
            state.userSkillLevels[index] = updatedSkillLevel;
          }
        }

        state.successMessage =
          action.payload?.message || "User skill level updated successfully";

        state.error = null;
      })

      .addCase(updateUserSkillLevel.rejected, (state, action) => {
        state.skillLevelLoading = false;
        state.error = action.payload || "Failed to update skill level";
      });

    // =========================================================
    // DELETE USER SKILL LEVEL
    // =========================================================
    builder
      .addCase(deleteUserSkillLevel.pending, (state) => {
        state.skillLevelLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(deleteUserSkillLevel.fulfilled, (state, action) => {
        state.skillLevelLoading = false;

        // Since delete returns Boolean in your backend,
        // the deleted ID is not available in action.payload.
        // Therefore this reducer alone cannot know which item
        // to remove unless you pass the ID along with the thunk result.

        state.successMessage =
          action.payload?.message || "User skill level deleted successfully";

        state.error = null;
      })

      .addCase(deleteUserSkillLevel.rejected, (state, action) => {
        state.skillLevelLoading = false;
        state.error = action.payload || "Failed to delete skill level";
      });
  },
});

export const {
  clearSkillError,
  clearSkillSuccess,
  clearSkill,
  clearUserSkillLevel,
  clearUserSkillLevels,
} = skillSlice.actions;

export default skillSlice.reducer;
