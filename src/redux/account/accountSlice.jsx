import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    doLoginDataUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    doAccountToken: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    doLogoutLogin: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = {
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { doLoginDataUser, doAccountToken, doLogoutLogin } =
  accountSlice.actions;

export default accountSlice.reducer;
