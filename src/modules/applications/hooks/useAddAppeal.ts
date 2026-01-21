import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {showMessage} from "@app/shared";
import {AppealService} from "@app/services";
import {IAppealForm} from "@app/interfaces";

const Index = (reset: () => void) => {
    const navigate = useNavigate();

    const {isPending, mutate: addAppeal} = useMutation({
        mutationFn: (data: IAppealForm) => AppealService.addAppeal(data),
        onSuccess: (data) => {
            showMessage("Successfully", "success");
            if(data.file){
                navigate(data.file);
                window.open(
                    data.file,
                    '_blank'
                );
                reset()
            }

        }
    })

    return {isPending, addAppeal}
}

export default Index;
