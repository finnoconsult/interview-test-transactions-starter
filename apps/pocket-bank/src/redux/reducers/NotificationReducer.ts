import {createSlice} from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null },
  reducers: {
    setNotificationText: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setNotificationText } = notificationSlice.actions;
