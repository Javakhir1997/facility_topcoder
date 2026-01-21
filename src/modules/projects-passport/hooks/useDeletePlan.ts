import { ProjectPasswordService } from "@services/projects-passport.service";
import { showMessage } from "@shared/utilities";
import { useMutation } from "@tanstack/react-query";

export default function useDeletePlan() {
  const { isPending, mutateAsync: deletePlan } = useMutation({
    mutationFn: (id: number | string) =>
      ProjectPasswordService.deletePlan(id),
    onSuccess: () =>
      showMessage("Plan has been deleted successfully", "success"),
  });
  return { isPending, deletePlan };
}
