import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/types/tasks/task.enum";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default Urgent;
