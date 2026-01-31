
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {useNavigate, useParams} from "react-router-dom";
import {AnnouncementService} from "@app/services";
import {ConfirmConceptionDTO} from "@entities/conception";


const useAnnouncementUpdateConfirm = () => {


    const {id = ''} = useParams();
    const navigate = useNavigate();


    const {isPending, mutate: updateAnnouncementConfirm} = useMutation({
        mutationFn: (data: any) => AnnouncementService.updateAnnouncementConfirm(Number(id), data),
        onSuccess: () => {
            showMessage("Successfully", "success")
            navigate(-1)
        }
    })

    return {updateAnnouncementConfirm, isPending}
};

export default useAnnouncementUpdateConfirm;
