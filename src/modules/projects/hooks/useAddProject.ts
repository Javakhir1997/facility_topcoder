import { ProjectForm } from "@interfaces/projects.interface";
import { ProjectsService } from "@services/projects.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddProject() {
  const { isPending, mutateAsync: addProject } = useMutation({
    mutationFn: (data: ProjectForm) => ProjectsService.addProject(data),
  });
  return { isPending, addProject };
}
