import { ProjectForm } from "@interfaces/projects.interface";
import { ProjectsService } from "@services/projects.service";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useEditProject() {
  const { id } = useParams<{ id: string }>();
  const { isPending, mutateAsync: addProject } = useMutation({
    mutationFn: (data: ProjectForm) => ProjectsService.editProject(data, id!),
  });
  return { isPending, addProject };
}
