import {useParams} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {IAddElectricity} from "@app/interfaces";
import {ElectricityService} from "@services/electricity.service.ts";

const useAddPlan = (reset: () => void) => {
    const {id = ''} = useParams();

    const {isPending, mutate: addElectricity} = useMutation({
        mutationFn: (data: IAddElectricity) => ElectricityService.addElectricity(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            reset();
        }
    });

    return {isPending, addElectricity};
};

export default useAddPlan;
