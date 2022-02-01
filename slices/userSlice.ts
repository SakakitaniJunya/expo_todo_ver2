import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/types';
import type { RootState } from '../store';

//インポートしたデータ型を定義する
type State = {
  user: User;
};

const initialState: State = {
  user: { uid: '', email: '' },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //payload時にユーザ型で値が送られてくる
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user.user;
