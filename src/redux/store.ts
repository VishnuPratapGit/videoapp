import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import channelReducer from './slices/channelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channel: channelReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store