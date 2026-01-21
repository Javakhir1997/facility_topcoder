import {useMutation} from "@tanstack/react-query";
import {IApplicationFileGenerate} from "@app/interfaces";
import {ApplicationService} from "@app/services";

const useApplicationFileGenerate = () => {

    const {isPending, mutateAsync: generateFile} = useMutation({
        mutationFn: (data: IApplicationFileGenerate) => ApplicationService.applicationFileGenerate(data)
    });

    return {isPending, generateFile};
};

export default useApplicationFileGenerate;
