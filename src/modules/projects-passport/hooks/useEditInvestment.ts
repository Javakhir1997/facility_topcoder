import { ICurrentInvestmentFormD } from "@interfaces/projectsPassport.interface";
import { ProjectPasswordService } from "@services/projects-passport.service";
import { useMutation } from "@tanstack/react-query";

export default function useInvestment() {
  const { isPending, mutateAsync: editInvestment } = useMutation({
    mutationFn: (data: ICurrentInvestmentFormD) =>
      ProjectPasswordService.editInvestment(data),
  });
  return { isPending, editInvestment };
}
