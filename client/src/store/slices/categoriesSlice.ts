import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../types/Category";
import categoriesData from "../../data/categories.json";

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: categoriesData,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<Category>) {
      if (!state.categories.some((cat) => cat.id === action.payload.id)) {
        state.categories.push(action.payload);
      }
    },
    removeCategory(state, action: PayloadAction<number>) {
      state.categories = state.categories.filter(
        (cat) => cat.id !== action.payload
      );
    },
    updateCategory(state, action: PayloadAction<{ id: number; name: string }>) {
      const index = state.categories.findIndex(
        (cat) => cat.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index].name = action.payload.name;
      }
    },
  },
});

export const { addCategory, removeCategory, updateCategory } =
  categoriesSlice.actions;
export default categoriesSlice.reducer;
