import { configureStore } from "@reduxjs/toolkit";

import { setupListeners } from "@reduxjs/toolkit/query";
import { postsApi } from "src/entities/post/api/postService";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
});

type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];

setupListeners(store.dispatch);
