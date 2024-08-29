import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  isLoggedIn: false,
  userRole: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
  },
});

export const { setUserDetails, setUserRole, logout } = userSlice.actions;

export default userSlice.reducer;
