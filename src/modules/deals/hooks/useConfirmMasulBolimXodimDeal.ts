import { DealService } from '@app/services';
import { ConfirmDealDTO } from '@entities/deal';
import {useMutation} from '@tanstack/react-query'
import {ApplicationService} from '@app/services'
import {useNavigate, useParams} from 'react-router-dom'
import {showMessage} from "@app/shared";



export default function Index() {
    const {id = ''} = useParams()
    const navigate = useNavigate();
    const {isPending, mutate: confirmMasulBolimXodimDeal} = useMutation({
        mutationFn: (data: ConfirmDealDTO) =>  DealService.evolutionDealConfirmBolimXodim(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })
    return {isPending, confirmMasulBolimXodimDeal}
}
