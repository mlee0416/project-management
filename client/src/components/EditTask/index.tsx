import Modal from "@/components/Modal";

import React, { useEffect } from "react";
import { formatISO } from "date-fns";
import { useUpdateTaskMutation } from "@/api/tasksApi";
import { Priority, Status } from "@/types/tasks/task.enum";
import { Form, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useGetUsersQuery } from "@/api/api";
import { toast } from "sonner";
import { Task } from "@/types/tasks/task.interface";
import { DevTool } from "@hookform/devtools";
import { formatYYYYMMDD } from "@/functions/date/formatYYYYMMDD";

type EditTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
  task: Task;
};

const EditTaskModal = ({
  isOpen,
  onClose,
  id = null,
  task,
}: EditTaskModalProps) => {
  console.log("task", task);
  const { data: users } = useGetUsersQuery();
  const [updateTask, { isLoading }] = useUpdateTaskMutation();

  const CreateNewTaskSchema = z.object({
    title: z.string().min(1, { message: "Valid title is required" }),
    description: z.string(),
    status: z.nativeEnum(Status),
    priority: z.nativeEnum(Priority),
    tags: z.string(),
    startDate: z.string().min(1, { message: "Must select a start date" }),
    dueDate: z.string().min(1, { message: "Must select a due date" }),
    authorUserId: z.string().min(1, { message: "Valid asignee is required" }),
    assignedUserId: z.string(),
    projectId: z.string(),
  });

  const form = useForm<z.infer<typeof CreateNewTaskSchema>>({
    mode: "onChange",
    resolver: zodResolver(CreateNewTaskSchema),
    defaultValues: {
      title: task.title || "",
      description: task.description || "",
      status: task.status || Status.ToDo,
      priority: task.priority || Priority.Backlog,
      tags: task.tags || "",
      startDate: formatYYYYMMDD(task.startDate) || "",
      dueDate: formatYYYYMMDD(task.dueDate) || "",
      authorUserId: task.authorUserId ? task.authorUserId.toString() : "",
      assignedUserId: task.assignedUserId ? task.assignedUserId.toString() : "",
      projectId: task.projectId.toString() || "",
    },
    resetOptions: {
      keepDirtyValues: false, // user-interacted input will be retained
    },
  });

  useEffect(() => {}, [task]);
  const { errors } = form.formState;

  const handleSubmit = async (values: z.infer<typeof CreateNewTaskSchema>) => {
    if (
      !values.title ||
      !values.authorUserId ||
      !(id !== null || values.projectId)
    )
      return;

    const formattedStartDate = formatISO(new Date(values.startDate), {
      representation: "complete",
    });
    const formattedDueDate = formatISO(new Date(values.dueDate), {
      representation: "complete",
    });

    updateTask({
      taskId: Number(id),
      task: {
        ...values,
        id: Number(id),
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        authorUserId: parseInt(values.authorUserId),
        assignedUserId: parseInt(values.assignedUserId),
        projectId: id !== null ? Number(id) : Number(values.projectId),
      },
    })
      .unwrap()
      .then(() => toast.success("Task updated"))
      .catch((error) =>
        toast.error(`Unable to update task: ${error?.data?.message}`),
      )
      .finally(() => {
        form.reset();
        closeCreateNewTaskModal();
      });
  };

  const closeCreateNewTaskModal = () => {
    form.reset();
    onClose();
  };

  const selectStyles =
    " block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={closeCreateNewTaskModal} name="Edit Task">
      <Form {...form}>
        <form className="mt-4 space-y-6">
          <div>
            <input
              {...form.register("title")}
              type="text"
              className={inputStyles}
              placeholder="Title"
            />
            <ErrorMessage
              errors={errors}
              name="title"
              render={({ message }) => (
                <p className="text-red-600">{message}</p>
              )}
            />
          </div>
          <div>
            <textarea
              {...form.register("description")}
              className={inputStyles}
              placeholder="Description"
            />
            <ErrorMessage
              errors={errors}
              name="description"
              render={({ message }) => (
                <p className="text-red-600">{message}</p>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <div>
              <select {...form.register("status")} className={selectStyles}>
                <option disabled>Select Status</option>
                <option value={Status.ToDo}>To Do</option>
                <option value={Status.WorkInProgress}>Work In Progress</option>
                <option value={Status.UnderReview}>Under Review</option>
                <option value={Status.Completed}>Completed</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="status"
                render={({ message }) => (
                  <p className="text-red-600">{message}</p>
                )}
              />
            </div>
            <div>
              <select {...form.register("priority")} className={selectStyles}>
                <option disabled>Select Priority</option>
                <option value={Priority.Urgent}>Urgent</option>
                <option value={Priority.High}>High</option>
                <option value={Priority.Medium}>Medium</option>
                <option value={Priority.Low}>Low</option>
                <option value={Priority.Backlog}>Backlog</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="priority"
                render={({ message }) => (
                  <p className="text-red-600">{message}</p>
                )}
              />
            </div>
          </div>
          <div>
            <input
              {...form.register("tags")}
              type="text"
              className={inputStyles}
              placeholder="Tags (comma separated)"
            />
            <ErrorMessage errors={errors} name="tags" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
            <div>
              <input
                {...form.register("startDate")}
                type="date"
                className={inputStyles}
              />
              <ErrorMessage
                errors={errors}
                name="startDate"
                render={({ message }) => (
                  <p className="text-red-600">{message}</p>
                )}
              />
            </div>
            <div>
              <input
                {...form.register("dueDate")}
                type="date"
                className={inputStyles}
              />
              <ErrorMessage
                errors={errors}
                name="dueDate"
                render={({ message }) => (
                  <p className="text-red-600">{message}</p>
                )}
              />
            </div>
          </div>
          <div>
            <select
              {...form.register("authorUserId")}
              className={selectStyles}
              defaultValue={""}
            >
              <option disabled value="">
                Select Author
              </option>
              {users?.map((user) => (
                <option value={user.userId} key={user.userId}>
                  {user.username.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="authorUserId"
              render={({ message }) => (
                <p className="text-red-600">{message}</p>
              )}
            />
          </div>
          <div>
            <select
              {...form.register("assignedUserId")}
              className={selectStyles}
            >
              <option disabled value="">
                Select Assignee
              </option>
              {users?.map((user) => (
                <option value={user.userId} key={user.userId}>
                  {user.username.replace(/([A-Z])/g, " $1").trim()}
                </option>
              ))}
            </select>
            <ErrorMessage
              errors={errors}
              name="assignedUserId"
              render={({ message }) => (
                <p className="text-red-600">{message}</p>
              )}
            />
          </div>
          {id === null && (
            <input
              {...form.register("projectId")}
              type="text"
              className={inputStyles}
              placeholder="ProjectId"
            />
          )}
          <button
            onClick={form.handleSubmit(handleSubmit)}
            type="submit"
            className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600`}
          >
            {isLoading ? "Updating..." : "Update Task"}
          </button>
        </form>
      </Form>
      <DevTool control={form.control} />
    </Modal>
  );
};

export default EditTaskModal;
