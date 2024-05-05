import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //getting values from localStorage if stored
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,

  loading: false,
  signupData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },

    setSignupData(state, value) {
      state.signupData = value.payload;
    },
  },
});

export const { setToken, setLoading, setSignupData, setUser } =
  authSlice.actions;
export default authSlice.reducer;
