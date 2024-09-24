import { Task } from "@/types/tasks/task.interface";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <Link href={`${task.id}`}>
      <div className="mb-3 rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-white">
        {task.attachments && task.attachments.length > 0 && (
          <div>
            <strong className="text-lg">Attachments:</strong>
            <div className="flex flex-wrap">
              {task.attachments && task.attachments.length > 0 && (
                <Image
                  src={`/${task.attachments[0].fileURL}`}
                  alt={task.attachments[0].fileName}
                  width={400}
                  height={200}
                  className="rounded-md"
                />
              )}
            </div>
          </div>
        )}
        <p className="text-lg">
          <strong>ID:</strong> {task.id}
        </p>
        <p className="text-lg">
          <strong>Title:</strong> {task.title}
        </p>
        <p className="text-lg">
          <strong>Description:</strong>{" "}
          {task.description || "No description provided"}
        </p>
        <p className="text-lg">
          <strong>Status:</strong> {task.status}
        </p>
        <p className="text-lg">
          <strong>Priority:</strong> {task.priority}
        </p>
        <p className="text-lg">
          <strong>Tags:</strong> {task.tags || "No tags"}
        </p>
        <p className="text-lg">
          <strong>Start Date:</strong>{" "}
          {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
        </p>
        <p className="text-lg">
          <strong>Due Date:</strong>{" "}
          {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
        </p>
        <p className="text-lg">
          <strong>Author:</strong>{" "}
          {task.author ? task.author.username : "Unknown"}
        </p>
        <p className="text-lg">
          <strong>Assignee:</strong>{" "}
          {task.assignee ? task.assignee.username : "Unassigned"}
        </p>
      </div>
    </Link>
  );
};

export default TaskCard;
