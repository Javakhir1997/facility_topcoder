import { showMessage } from "@app/shared";
import { createFinancePlan } from "@app/interfaces";
import { FinanceService } from "@app/services";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

const Index = (reset: () => void) => {
  const navigate = useNavigate();
  const { id = "" } = useParams();

  const { isPending, mutate: editWithPartial } = useMutation({
    mutationFn: (data: createFinancePlan) =>
      FinanceService.updatePartialFinancePlan(id, data),
    onSuccess: () => {
      showMessage("Successfully", "success");
      navigate("/appeals");
      reset();
    },
  });

  return { isPending, editWithPartial };
};

export default Index;
