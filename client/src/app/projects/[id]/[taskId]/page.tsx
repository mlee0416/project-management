"use client";
import React, { useState } from "react";
import ProjectHeader from "../../ProjectHeader";
import BoardView from "../../BoardView";
import ListView from "../../ListView";
import TimelineView from "../../TimelineView";
import TableView from "../../TableView";
import CreateNewTaskModal from "@/components/CreateNewTask";
import TaskDetailsModal from "@/components/TaskDetailsModal";

type ProjectProps = {
  params: {
    id: string;
    taskId: string;
  };
};

const Project = ({ params }: ProjectProps) => {
  const { id, taskId } = params;
  console.log("taskId", id);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  return (
    <div>
      {taskId !== "home" && <TaskDetailsModal taskId={taskId} />}
      <CreateNewTaskModal
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      <ProjectHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        id={id}
      />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
