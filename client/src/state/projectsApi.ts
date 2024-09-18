import { Project } from "@/types/projects/project.interface";
import { api } from "./api";

export const projectsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),
    createProject: builder.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApi;
