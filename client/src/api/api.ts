import { SearchResults } from "@/types/search/searchResults.interface";
import { Team } from "@/types/team/team.interface";
import { User } from "@/types/user/user.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users", "Teams", "Users"],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => "users",
      providesTags: ["Users"],
    }),
    getTeams: build.query<Team[], void>({
      query: () => "teams",
      providesTags: ["Teams"],
    }),
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
    // getAuthUser: build.query({
    //   queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
    //     try {
    //       const user = await getCurrentUser();
    //       const session = await fetchAuthSession();
    //       if (!session) throw new Error("No session found");
    //       const { userSub } = session;
    //       const { accessToken } = session.tokens ?? {};

    //       const userDetailsResponse = await fetchWithBQ(`users/${userSub}`);
    //       const userDetails = userDetailsResponse.data as User;

    //       return { data: {

    //       } };
    //     } catch (error: any) {
    //       return { error: error.message || "Could not fetch user data" };
    //     }
    //   },
    // }),
  }),
});

export const {
  useSearchQuery,
  useGetUsersQuery,
  useGetTeamsQuery,
  // useGetAuthUserQuery,
} = api;
