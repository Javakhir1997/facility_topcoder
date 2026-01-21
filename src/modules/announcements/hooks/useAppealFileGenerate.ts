import {useMutation} from '@tanstack/react-query';
import {IAppealFileGenerate} from "@app/interfaces";
import {AppealService} from "@app/services";

const useAppealFileGenerate = () => {

    const {isPending, mutateAsync: generateFile} = useMutation({
        mutationFn: (data: IAppealFileGenerate) => AppealService.appealFileGenerate(data)
    });

    return {isPending, generateFile};
};

export default useAppealFileGenerate;
