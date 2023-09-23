import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TPost } from "src/entities/post/model/typePost";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/posts",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<
      { apiResponse: TPost[]; totalCount: number },
      number
    >({
      query: (page) => ({
        url: "",
        params: {
          _limit: 10,
          _page: page,
        },
      }),
      transformResponse(baseQueryReturnValue: TPost[], meta) {
        return {
          apiResponse: baseQueryReturnValue,
          totalCount: Number(meta?.response?.headers.get("X-Total-Count")),
        };
      },
    }),
    getPostById: builder.query<TPost, string>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postsApi;
