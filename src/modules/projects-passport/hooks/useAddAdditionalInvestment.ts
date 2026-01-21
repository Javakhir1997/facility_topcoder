import { IAdditionalInvestmentFlat } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddAdditionalInvestment() {
  const { isPending, mutateAsync: addInvestment } = useMutation({
    mutationFn: (data: IAdditionalInvestmentFlat) =>
      ProjectPasswordService.addAdditionalInvestment(data),

  });
  return { isPending, addInvestment };
}
