import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { showMessage } from "@app/shared";
import { TenderService } from "@app/services";
import { IWinnerAddForm } from "@app/interfaces";

// O'ZGARISH SHU YERDA: (data: any) qo'shildi 👇
export const useAddWinnerApplicant = (
  reset: () => void, 
  onSuccessCallback?: (data: any) => void 
) => {
  const navigate = useNavigate();
  // URL dan ID ni olishda ehtiyot bo'lamiz
  const { id } = useParams();
  const tenderId = id || ""; 

  const { isPending, mutate: addWinnerApplicant } = useMutation({
    mutationFn: (formData: IWinnerAddForm) =>
      TenderService.addWinnerTender(formData, tenderId),
      
    onSuccess: (backendData) => {
      // backendData - bu Service faylidagi 'return res.data' dan kelgan narsa
      showMessage("Successfully saved", "success");
      reset();
      
      // Endi bu yerda backendData ni uzatish to'g'ri ishlaydi
      if (onSuccessCallback) {
        onSuccessCallback(backendData);
      }
    },
    onError: (error: any) => {
      console.error("Xato:", error);
      const message = error.response?.data?.detail || "Xatolik yuz berdi";
      showMessage(message, "error");
    },
  });

  return { isPending, addWinnerApplicant };
};