import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import categoriesReducer from "./slices/categoriesSlice";
import userReducer from "./slices/userSlice";
import viewsReducer from "./slices/viewsSlice";

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const startTime = Date.now();
  console.group(
    `%c Action: ${action.type}`,
    "color: purple; font-weight: bold;"
  );
  console.info("%c Previous State:", "color: gray", storeAPI.getState());
  console.info("%c Action:", "color: blue", action);
  const result = next(action);
  const nextState = storeAPI.getState();
  const endTime = Date.now();
  console.info("%c Next State:", "color: green", nextState);
  console.info(`%c Execution time: ${endTime - startTime} ms`, "color: orange");
  console.groupEnd();
  return result;
};

const viewCounterMiddleware =
  (storeAPI: any) => (next: any) => (action: any) => {
    if (action.type === "PRODUCT_DETAIL_OPENED") {
      const productId = action.payload;
      storeAPI.dispatch({
        type: "views/incrementViewCount",
        payload: productId,
      });
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    user: userReducer,
    views: viewsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, viewCounterMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
