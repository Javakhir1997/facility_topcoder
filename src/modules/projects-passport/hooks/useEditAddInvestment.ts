import {  IAdditionalInvestmentFormD } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddInvestment() {
  const { isPending, mutateAsync: editAddInvestment } = useMutation({
    mutationFn: ( updated : IAdditionalInvestmentFormD
     ) =>
      ProjectPasswordService.editAdditionalInvestment(updated),
  });
  return { isPending, editAddInvestment };
}
