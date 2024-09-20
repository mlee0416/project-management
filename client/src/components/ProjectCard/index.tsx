import { formatDate } from "@/functions/date/formatDate";
import { Project } from "@/types/projects/project.interface";
import React from "react";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="mb-3 rounded border bg-white p-4">
      <h3 className="text-xl font-bold">{project.name}</h3>
      <p className="text-lg">
        <strong>Description:</strong> {project.description}
      </p>
      <p className="text-lg">
        <strong>Start Date:</strong> {formatDate(project.startDate)}
      </p>
      <p className="text-lg">
        <strong>End Date:</strong> {formatDate(project.endDate)}
      </p>
    </div>
  );
};

export default ProjectCard;
