import React from "react";
import Modal from "../Modal";
import { usePathname, useRouter } from "next/navigation";
import { useGetTaskQuery } from "@/api/tasksApi";
import EditTaskModal from "../EditTask";
import { removeLastRoutePath } from "@/functions/route/removeLastRoute";

type TaskDetailsModalProps = {
  taskId: string;
};

const TaskDetailsModal = ({ taskId }: TaskDetailsModalProps) => {
  const pathName = usePathname();
  const router = useRouter();

  const { data: task } = useGetTaskQuery(taskId, {
    refetchOnMountOrArgChange: true,
  });
  const closeModal = () => {
    const newPath = removeLastRoutePath(pathName);
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
