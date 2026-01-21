import {  IProjectPlanFormD } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useEditPlan() {
  const { isPending, mutateAsync: editPlan } = useMutation({
    mutationFn: ({ updated }: { updated: IProjectPlanFormD
     }) =>
      ProjectPasswordService.editPlan(updated),
  });
  return { isPending, editPlan };
}
