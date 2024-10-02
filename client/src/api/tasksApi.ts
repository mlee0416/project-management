import { api } from "./api";
import { Task } from "@/types/tasks/task.interface";

export const tasksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: ["Tasks"],
    }),
    getTasksByUser: builder.query<Task[], number>({
      query: (userId) => `tasks/user/${userId}`,
      providesTags: ["Tasks"],
    }),
    getTask: builder.query<Task, string | undefined>({
      query: (taskId) => `tasks/${taskId}`,
    }),
    createTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTaskStatus: builder.mutation<
      Task,
      { taskId: number; status: string }
    >({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation<Task, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation<Task, { taskId: number; task: Task }>({
      query: ({ taskId, task }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH",
        body: { task },
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useGetTasksByUserQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
