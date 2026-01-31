import { ConfirmDealDTO } from '@entities/deal';

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "@shared/api";
import {API_ENDPOINTS} from "@shared/api/endpoints.ts";
import {showMessage} from "@app/shared";
import {useParams} from "react-router-dom";
import { DealService } from "@services/deal.service";


const useConfirmVazDxshDeal = () => {
    const {id = ''} = useParams();

    const queryClient = useQueryClient()

    const {isPending: isConfirmPending, mutate: confirmVazDxshDeal} = useMutation({
        mutationFn: (data: ConfirmDealDTO) => DealService.confirmVazDxshDeal(Number(id), data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['application-detail'],
            });
            showMessage("Successfully", "success")
        }
    })

    return {isConfirmPending, confirmVazDxshDeal}
};

export default useConfirmVazDxshDeal;
