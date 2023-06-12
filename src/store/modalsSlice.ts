import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the initial state using this type
const initialState: {
  isVisible: boolean;
  isEditing: boolean;
  editedTask: ITask | undefined;
} = {
  isVisible: false,
  isEditing: false,
  editedTask: undefined,
};

export const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showCreate: (state) => {
      return { ...state, isVisible: true };
    },
    showEdit: (state, action: PayloadAction<ITask>) => {
      return { isVisible: true, isEditing: true, editedTask: action.payload };
    },
    hide: (state) => {
      return initialState;
    },
  },
});

export const { showCreate, showEdit, hide } = modalSlice.actions;
export default modalSlice.reducer;
