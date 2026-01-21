import {  IMonitoringForm } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddMonitoring() {
  const { isPending, mutateAsync: addMonitoring } = useMutation({
    mutationFn: (data: IMonitoringForm) =>
      ProjectPasswordService.addMonitoring(data),

  });
  return { isPending, addMonitoring };
}
