import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddPorjectFiles() {
  const { isPending, mutateAsync: addProjectFile } = useMutation({
    mutationFn: (data: { files: number[] }) =>
      ProjectPasswordService.addProjectFiles(data),
  });
  return { isPending, addProjectFile };
}
