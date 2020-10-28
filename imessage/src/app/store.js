import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/counter/counterSlice';
import chatReducer from '../features/counter/chatSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
  },
});
