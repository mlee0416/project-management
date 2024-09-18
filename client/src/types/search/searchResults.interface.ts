import { Project } from "../projects/project.interface";
import { Task } from "../tasks/task.interface";
import { User } from "../user/user.interface";

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}
