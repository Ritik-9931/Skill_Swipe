import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../service/api";

// =========================================================
// GET CURRENT USER
// =========================================================

export const getUser = createAsyncThunk(
  "user/getUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${id}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch user"
      );
    }
  }
);

// =========================================================
// GET ALL USERS
// =========================================================

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users/all");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to load users"
      );
    }
  }
);

// =========================================================
// UPDATE USER
// =========================================================

export const updateUser = createAsyncThunk(
  "user/updateUser",

  async ({ id, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/update/${id}`,
        userData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update user details"
      );
    }
  }
);

// =========================================================
// DELETE USER
// =========================================================

export const deleteUser = createAsyncThunk(
  "user/deleteUser",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `/users/delete/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  }
);

// =========================================================
// UPDATE PREFERENCE
// =========================================================

export const updatePreference = createAsyncThunk(
  "user/updatePreference",

  async ({ id, preference }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `/users/updatePreference/${id}?preference=${encodeURIComponent(
          preference
        )}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update preference"
      );
    }
  }
);

// =========================================================
// SLICE
// =========================================================

const userSlice = createSlice({
  name: "user",

  initialState: {
    me: null,
    allUsers: [],
    loading: false,
    error: null,
  },

  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },

    clearUser: (state) => {
      state.me = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================================================
      // GET USER
      // =====================================================

      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload?.data ?? null;
        state.error = null;
      })

      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to fetch user";
      })

      // =====================================================
      // GET ALL USERS
      // =====================================================

      .addCase(getAllUsers.pending, (state) => {
        // FIXED: should be true
        state.loading = true;
        state.error = null;
      })

      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.allUsers = Array.isArray(
          action.payload?.data
        )
          ? action.payload.data
          : [];

        state.error = null;
      })

      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to load users";
      })

      // =====================================================
      // UPDATE USER
      // =====================================================

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;

        state.me = action.payload?.data ?? null;

        state.error = null;
      })

      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to update user";
      })

      // =====================================================
      // DELETE USER
      // =====================================================

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.me = null;
        state.error = null;
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to delete user";
      })

      // =====================================================
      // UPDATE PREFERENCE
      // =====================================================

      .addCase(updatePreference.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updatePreference.fulfilled, (state, action) => {
        state.loading = false;

        state.me = action.payload?.data ?? state.me;

        state.error = null;
      })

      .addCase(updatePreference.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload || "Failed to update preference";
      });
  },
});

export const {
  clearUserError,
  clearUser,
} = userSlice.actions;

export default userSlice.reducer;