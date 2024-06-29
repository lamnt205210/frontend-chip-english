import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  access_token: "",
  profilePicture: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userName = action.payload.userName;
      state.access_token = action.payload.access_token;
      state.profilePicture = action.payload.profilePicture;
    },
    resetUser: (state) => initialState,
  },
});

export const { updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
