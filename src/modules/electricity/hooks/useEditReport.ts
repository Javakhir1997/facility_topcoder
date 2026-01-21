import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {IAddElectricityReportForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import {ElectricityService} from "@app/services";

const useEditReport = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {mutate: editReport, isPending} = useMutation({
        mutationFn: (data: IAddElectricityReportForm) => ElectricityService.editElectricityReport(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate(-1);
            reset();
        }
    });

    return {editReport, isPending};
};

export default useEditReport;
