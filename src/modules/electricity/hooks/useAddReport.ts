import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {IAddElectricityReportForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import {ElectricityService} from "@services/electricity.service.ts";

const useAddReport = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ""} = useParams();

    const {mutate: addReport, isPending} = useMutation({
        mutationFn: (data: IAddElectricityReportForm) => ElectricityService.addElectricityReport(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate(-1);
            reset();
        }
    });

    return {addReport, isPending};
};

export default useAddReport;
