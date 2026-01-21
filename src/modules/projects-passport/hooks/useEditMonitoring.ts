import { IMonitoringForm } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddInvestment() {
  const { isPending, mutateAsync: editMonitoring } = useMutation({
    mutationFn: (updated:  IMonitoringForm
     ) =>
      ProjectPasswordService.editMonitoring(updated),
  });
  return { isPending, editMonitoring };
}
