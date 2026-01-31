import { showMessage } from "@app/shared";
import { FinanceService } from "@app/services";
import { createFinancePlan } from "@app/interfaces";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const Index = (reset: () => void) => {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { isPending, mutate: editFinancePlan } = useMutation({
    mutationFn: (data: createFinancePlan) =>
      FinanceService.updateFinancePlan(id, data),
    onSuccess: () => {
      showMessage("Successfully", "success");
      navigate("/finans");
      reset();
    },
  });

  return { isPending, editFinancePlan };
};

export default Index;
