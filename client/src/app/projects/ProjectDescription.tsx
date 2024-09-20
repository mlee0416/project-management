import {
  useDeleteProjectByIdMutation,
  useGetProjectByIdQuery,
} from "@/api/projectsApi";
import Modal from "@/components/Modal";
import { formatDate } from "@/functions/date/formatDate";
import { Menu, MenuItem } from "@mui/material";
import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ERoutes } from "@/types/routes/ERoutes";
type ProjectDescriptionProps = {
  id: string;
};

const ProjectDescription = ({ id }: ProjectDescriptionProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { data: project } = useGetProjectByIdQuery(id);

  const [deleteProject] = useDeleteProjectByIdMutation();

  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    router.push(ERoutes.HOME);
  };
  const handleDeleteProject = async () => {
    deleteProject(id)
      .unwrap()
      .then(() => toast.success("Task deleted"))
      .catch((error) =>
        toast.error(`Cannot delete task: ${error?.data?.message}`),
      )
      .finally(() => handleCloseModal());
  };
  return (
    <div className="flex items-center justify-between gap-2 border-t border-gray-200 py-4 dark:border-stroke-dark">
      <div className="flex flex-col dark:text-white">
        <h1 className="text-xl font-semibold">{project?.name}</h1>
        <p>{project?.description}</p>
        <div className="flex gap-4">
          <p>Start Date: {formatDate(project?.startDate)}</p>
          <p>End Date: {formatDate(project?.endDate)}</p>
        </div>
      </div>
      <button
        onClick={handleClick}
        className="flex flex-shrink-0 items-center justify-center dark:text-neutral-500"
      >
        <Ellipsis size={30} />
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { paddingTop: 0, paddingBottom: 0 },
        }}
      >
        <MenuItem onClick={() => setIsDeleteModalOpen(true)}>Delete</MenuItem>
      </Menu>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        name="Are you sure you want to delete?"
      >
        <div className="flex items-center justify-center p-5">
          <button
            onClick={handleDeleteProject}
            className="flex w-40 items-center justify-center rounded-md bg-gray-200 px-3 py-2 text-red-600 hover:bg-red-600 hover:text-white"
          >
            <p className="text-lg font-semibold">Delete</p>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectDescription;
