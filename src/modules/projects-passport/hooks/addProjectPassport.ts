import { IAddProjectPassportForm } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { showMessage } from "@shared/utilities";
import { useMutation } from "@tanstack/react-query";

export default function useAddProjectPassport() {
  const { isPending, mutateAsync: addProjectPassort } = useMutation({
    mutationFn: (data: IAddProjectPassportForm) =>
      ProjectPasswordService.addProjectPassort(data),
    onSuccess: () =>
      showMessage("The general form has been added successfully.","success"),
  });
  return {isPending,addProjectPassort};
}
