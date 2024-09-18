import {
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/tasksApi";
import { Status } from "@/types/tasks/task.enum";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "./TaskColumn";
type BoardViewProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TASK_STATUS = [
  Status.ToDo,
  Status.WorkInProgress,
  Status.UnderReview,
  Status.Completed,
];
const BoardView = ({ id, setIsModalNewTaskOpen }: BoardViewProps) => {
  const {
    data: tasks,
    isLoading,
    isError,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();
  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>An error occured while fetching tasks</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {TASK_STATUS.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardView;
