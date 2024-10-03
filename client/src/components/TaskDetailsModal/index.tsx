import React from "react";
import Modal from "../Modal";
import { usePathname, useRouter } from "next/navigation";
import { useGetTaskQuery } from "@/api/tasksApi";
import EditTaskModal from "../EditTask";

type TaskDetailsModalProps = {
  taskId: string;
};

const TaskDetailsModal = ({ taskId }: TaskDetailsModalProps) => {
  console.log("task id ", taskId);
  const pathName = usePathname();
  const router = useRouter();

  const { data: task } = useGetTaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
  });
  console.log("data", task);
  const closeModal = () => {
    const pathRemoved = pathName.split("/")[4];
    const newPath = pathName.replace(pathRemoved, "/");
    console.log("new path", newPath);
    router.push(newPath);
  };
  return (
    <Modal
      isOpen={Boolean(taskId)}
      onClose={closeModal}
      name={`${task && task.title}`}
    >
      {task && <EditTaskModal id={taskId} task={task} onClose={closeModal} />}
    </Modal>
  );
};

export default TaskDetailsModal;
