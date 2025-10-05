import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface DataState {
  value: boolean;
}

const initialState: DataState = {
  value: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    handleToggleSidebar: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { handleToggleSidebar } = sidebarSlice.actions;

export const sidebarValue = (state: RootState) => state.sidebar.value;

export default sidebarSlice.reducer;
