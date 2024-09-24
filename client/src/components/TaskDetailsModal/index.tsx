import React from "react";
import Modal from "../Modal";
import { useRouter } from "next/navigation";

type TaskDetailsModalProps = {
  taskId: string;
};

const TaskDetailsModal = ({ taskId }: TaskDetailsModalProps) => {
  console.log("task id ", taskId);
  const router = useRouter();
  return (
    <Modal
      isOpen={Boolean(taskId)}
      onClose={() => router.push("home")}
      name={"test"}
    >
      test
    </Modal>
  );
};

export default TaskDetailsModal;
