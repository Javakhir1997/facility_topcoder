import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { showMessage } from "@app/shared";
import { FinanceService } from "@app/services";
import { createFinancePlan } from "@app/interfaces";

const Index = (reset: () => void) => {
  const navigate = useNavigate();

  const { isPending, mutate: createFinancePlan } = useMutation({
    mutationFn: (data: createFinancePlan) =>
      FinanceService.createFinancePlan(data),
    onSuccess: () => {
      showMessage("Successfully", "success");
      navigate("/finans");
      reset();
    },
  });

  return { isPending, createFinancePlan };
};

export default Index;
