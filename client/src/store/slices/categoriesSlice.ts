import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { Category } from "../../types/Category";

interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[]>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Category[]>("/categories");
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Ошибка при загрузке категорий"
      );
    }
  }
);

export const createCategory = createAsyncThunk<Category, { name: string }>(
  "categories/createCategory",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post<Category>("/categories", data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Ошибка при создании категории"
      );
    }
  }
);

export const updateCategory = createAsyncThunk<
  Category,
  { id: string; name: string }
>("categories/updateCategory", async ({ id, name }, { rejectWithValue }) => {
  try {
    const response = await api.put<Category>(`/categories/${id}`, { name });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Ошибка при обновлении категории"
    );
  }
});

export const deleteCategory = createAsyncThunk<string, string>(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Ошибка при удалении категории"
      );
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories.push(action.payload);
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false;
      const idx = state.categories.findIndex(
        (c) => c._id === action.payload._id
      );
      if (idx !== -1) {
        state.categories[idx] = action.payload;
      }
    });
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (cat) => cat._id !== action.payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default categoriesSlice.reducer;
