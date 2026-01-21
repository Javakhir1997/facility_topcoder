import { IInvestmentFlat } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useAddInvestment() {
  const { isPending, mutateAsync: addInvestment } = useMutation({
    mutationFn: (data: IInvestmentFlat) =>
      ProjectPasswordService.addInvestment(data),

  });
  return { isPending, addInvestment };
}
