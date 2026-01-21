import { IAddProjectPassportForm } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useEditProjectPassport() {
  const { isPending, mutateAsync: editProjectPassort } = useMutation({
    mutationFn: ({ data, id }: { data: IAddProjectPassportForm; id: number|null }) =>
      ProjectPasswordService.editProjectPassort(data, id),
  });
  return { isPending, editProjectPassort };
}
