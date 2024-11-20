"use client";
import React, { useEffect, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";
import ListView from "../ListView";
import TimelineView from "../TimelineView";
import TableView from "../TableView";
import CreateNewTaskModal from "@/components/CreateNewTask";
import TaskDetailsModal from "@/components/TaskDetailsModal";

type ProjectProps = {
  params: { slug: string[] };
};

const Project = ({ params }: ProjectProps) => {
  console.log("pararms", params);
  const id = params.slug[0];
  const tab = params.slug[1];
  const taskId = params.slug[2];

  const [activeTab, setActiveTab] = useState<string>(tab || "board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);
  return (
    <div>
      {taskId && <TaskDetailsModal taskId={taskId} />}
      {taskId && (
        <CreateNewTaskModal
          isOpen={isModalNewTaskOpen}
          onClose={() => setIsModalNewTaskOpen(false)}
          id={id}
        />
      )}
      <ProjectHeader activeTab={activeTab} id={id} />
      {activeTab === "board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "list" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
