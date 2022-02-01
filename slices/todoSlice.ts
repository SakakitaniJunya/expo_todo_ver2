import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, Tag } from '../types/types';
import type { RootState } from '../store';
import { TagCard } from '../components/TagCard';
import { TagStackNavigator } from '../navigations/TagStackNavigator';

type State = {
  //createdAtを除く
  editedTask: Omit<Task, 'completed' | 'createdAt'>;
  selectedTag: Omit<Tag, 'createdAt'>;
};

const initialState: State = {
  editedTask: { id: '', title: '' },
  selectedTag: { id: '', name: '' },
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    //編集データをeditedTaskに格納する
    setEditedTask: (
      state,
      action: PayloadAction<Omit<Task, 'completed' | 'createdAt'>>,
    ) => {
      state.editedTask = action.payload;
    },
    //reseteditedTask
    resetEditedTask: (state) => {
      state.editedTask = initialState.editedTask;
    },
    //selectedTagに格納する
    setSelectedTag: (state, action: PayloadAction<Omit<Tag, 'createdAt'>>) => {
      state.selectedTag = action.payload;
    },
    //resetSelectedTag
    resetSelectedTag: (state) => {
      state.selectedTag = initialState.selectedTag;
    },
  },
});

export const {
  setEditedTask,
  resetEditedTask,
  setSelectedTag,
  resetSelectedTag,
} = todoSlice.actions;

//stateを参照する
export const selectEditedTask = (state: RootState) => state.todo.editedTask;
export const selectTag = (state: RootState) => state.todo.selectedTag;

export default todoSlice.reducer;
