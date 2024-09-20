import { Task as TaskType } from "@/types/tasks/task.interface";
import React from "react";
import { useDrag } from "react-dnd";
import Image from "next/image";
import { EllipsisVertical, MessageSquareMore } from "lucide-react";
import { Priority } from "@/types/tasks/task.enum";
import { formatDate } from "@/functions/date/formatDate";
import { Menu, MenuItem } from "@mui/material";
import { useDeleteTaskMutation } from "@/api/tasksApi";
import { toast } from "sonner";

type TaskProps = {
  task: TaskType;
};

export const Task = ({ task }: TaskProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [deleteTask] = useDeleteTaskMutation();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = formatDate(task.startDate);
  const formattedDueDate = formatDate(task.dueDate);

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const tagColor = (priority: Priority | undefined) => {
    switch (priority) {
      case Priority.Urgent:
        return "bg-red-200 text-red-700";
      case Priority.High:
        return "bg-yellow-200 text-yellow-700";
      case Priority.Medium:
        return "bg-green-200 text-green-700";
      case Priority.Low:
        return "bg-blue-200 text-blue-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const handleDeleteTask = async () => {
    deleteTask(task.id)
      .unwrap()
      .then(() => toast.success("Task deleted"))
      .catch((error) =>
        toast.error(`Cannot delete task: ${error?.data?.message}`),
      )
      .finally(() => handleClose());
  };

  const handleEditTask = () => {
    console.log("opening task");
  };

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold ${tagColor(priority)}`}
    >
      {priority}
    </div>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`mb-4 cursor-pointer rounded-md bg-white shadow dark:bg-dark-secondary ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs"
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="flex h-6 w-4 flex-shrink-0 items-center justify-center dark:text-neutral-500"
            >
              <EllipsisVertical size={26} />
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
                sx: { paddingTop: 0, paddingBottom: 0 },
              }}
            >
              <MenuItem onClick={handleEditTask}>Edit</MenuItem>
              <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </Menu>
          </div>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold dark:text-white">{task.title}</h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold dark:text-white">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-neutral-500">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-500">
          {task.description}
        </p>
        <div className="mt-4 border-t border-gray-200 dark:border-stroke-dark" />

        {/* Users */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={`${task.assignee.userId}/blah`}
                src={`/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
            {task.author && (
              <Image
                key={`${task.author.userId}/${task.author.username}`}
                src={`/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-dark-secondary"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-neutral-500">
            <MessageSquareMore size={20} />
            <span className="ml-1 text-sm dark:text-neutral-400">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
