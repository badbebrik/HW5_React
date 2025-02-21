import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ViewsState {
  counts: Record<number, number>;
}

const initialState: ViewsState = {
  counts: {},
};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    incrementViewCount(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (state.counts[productId]) {
        state.counts[productId] += 1;
      } else {
        state.counts[productId] = 1;
      }
    },
  },
});

export const { incrementViewCount } = viewsSlice.actions;
export default viewsSlice.reducer;
