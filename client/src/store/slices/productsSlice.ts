import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import { Product } from "../../types/Product";

interface ProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  total: 0,
  loading: false,
  error: null,
};

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

interface FetchProductsArgs {
  offset: number;
  limit: number;
}

export const fetchProducts = createAsyncThunk<
  FetchProductsResponse,
  FetchProductsArgs
>("products/fetchProducts", async ({ offset, limit }, { rejectWithValue }) => {
  try {
    const response = await api.get<FetchProductsResponse>("/products", {
      params: { offset, limit },
    });
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Ошибка при загрузке продуктов"
    );
  }
});

export const createProduct = createAsyncThunk<
  Product,
  {
    name: string;
    description: string;
    category?: string | null;
    quantity: number;
    price: number;
    unit: string;
    imageUrl?: string;
  }
>("products/createProduct", async (data, { rejectWithValue }) => {
  try {
    const response = await api.post<Product>("/products", data);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Ошибка при создании продукта"
    );
  }
});

export const updateProduct = createAsyncThunk<
  Product,
  {
    _id: string;
    name: string;
    description: string;
    category?: string | null;
    quantity: number;
    price: number;
    unit: string;
    imageUrl?: string;
  }
>("products/updateProduct", async ({ _id, ...rest }, { rejectWithValue }) => {
  try {
    const response = await api.put<Product>(`/products/${_id}`, rest);
    return response.data;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.error || "Ошибка при обновлении продукта"
    );
  }
});

export const deleteProduct = createAsyncThunk<string, string>(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Ошибка при удалении продукта"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;

      const requestedOffset = (action.meta.arg as FetchProductsArgs).offset;
      if (requestedOffset === 0) {
        state.products = action.payload.products;
      } else {
        state.products = [...state.products, ...action.payload.products];
      }

      state.total = action.payload.total;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products.push(action.payload);
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.products.findIndex(
        (p) => p._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter((p) => p._id !== action.payload);
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default productsSlice.reducer;
