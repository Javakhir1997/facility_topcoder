import { IAddProjectFilesForm } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useEditProjectFiles() {
  const { isPending, mutateAsync: editProjectFiles } = useMutation({
    mutationFn: ({
      data,
    }: {
      data: IAddProjectFilesForm;
    }) => ProjectPasswordService.editProjectFiles(data),
  });
  return {isPending, editProjectFiles};
}
