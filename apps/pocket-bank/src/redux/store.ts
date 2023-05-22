import {configureStore} from '@reduxjs/toolkit';
import {authenticationSlice} from './reducers/AuthenticationReducer';
import {notificationSlice} from './reducers/NotificationReducer';

export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
