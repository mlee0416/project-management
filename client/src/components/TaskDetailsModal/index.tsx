import React from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import { useGetTaskQuery } from "@/api/tasksApi";
// import { formatDate } from "@/functions/date/formatDate";
import EditTaskModal from "../EditTask";

type TaskDetailsModalProps = {
  taskId: string;
};

const TaskDetailsModal = ({ taskId }: TaskDetailsModalProps) => {
  console.log("task id ", taskId);

  const router = useRouter();

  const { data: task } = useGetTaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
  });
  console.log("data", task);
  return (
    <Modal
      isOpen={Boolean(taskId)}
      onClose={() => router.back()}
      name={`${task && task.title}`}
    >
      {task && <EditTaskModal id={taskId} task={task} />}
    </Modal>
  );
};

export default TaskDetailsModal;
