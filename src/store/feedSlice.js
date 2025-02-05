import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: { users: [] }, 
  reducers: {
    addUsersToFeed: (state, action) => {
      state.users = action.payload;
    },
    removeUserFromFeed: (state, action) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
  },
});


export const { addUsersToFeed, removeUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
