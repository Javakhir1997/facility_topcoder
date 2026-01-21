import {useMutation} from '@tanstack/react-query'
import {ApplicationService} from '@app/services'
import {useNavigate, useParams} from 'react-router-dom'
import {showMessage} from "@app/shared";
import {ConfirmConceptionDTO} from "@entities/conception";


export default function Index() {
    const {id = ''} = useParams()
    const navigate = useNavigate();
    const {isPending, mutate: confirmBolimXodimConception} = useMutation({
        mutationFn: (data: ConfirmConceptionDTO) =>  ApplicationService.evolutionConceptionConfirmBolimXodim(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })
    return {isPending, confirmBolimXodimConception}
}
