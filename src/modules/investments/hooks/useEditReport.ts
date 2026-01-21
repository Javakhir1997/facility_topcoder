import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {IAddReportForm} from "@app/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import {InvestmentService} from "@app/services";

const useEditReport = (reset: () => void) => {
    const navigate = useNavigate();
    const {id = ''} = useParams();

    const {mutate: editReport, isPending} = useMutation({
        mutationFn: (data: IAddReportForm) => InvestmentService.editReport(data, id),
        onSuccess: () => {
            showMessage("Successfully", "success");
            navigate(-1);
            reset();
        }
    });

    return {editReport, isPending};
};

export default useEditReport;
