import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isActive: null, // Default value
  token: null, // Store the authentication token
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleIsActive: (state) => {
      state.isActive = !state.isActive;
    },
    setIsActive: (state, action) => {
      state.isActive = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const { toggleIsActive, setIsActive, setToken, clearToken } =
  appSlice.actions;

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export default store;
