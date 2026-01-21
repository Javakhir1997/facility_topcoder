import {useNavigate, useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {ElectricityService} from "@app/services";
import {IAddElectricity} from "@app/interfaces";

const useEditPlan = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {isPending, mutate: editElectricity} = useMutation({
        mutationFn: (data: IAddElectricity) => ElectricityService.editElectricity(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate(-1);
            reset();
        }
    });

    return {isPending, editElectricity};
};

export default useEditPlan;
