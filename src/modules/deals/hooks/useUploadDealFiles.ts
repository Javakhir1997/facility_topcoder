import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { showMessage } from "@app/shared";
import { useNavigate, useParams } from "react-router-dom";
import { DealService } from "@services/deal.service";
import { ConfirmDealDTOSchema } from "@entities/deal/schemas"; // O'zingizning schemangiz

const useUploadDealFiles = () => {
    const { id = '' } = useParams();
    const navigate = useNavigate();

    const form = useForm({
        // resolver: zodResolver(ConfirmDealDTOSchema),
        defaultValues: {
            deal_files: [{ file: null }] 
        }
    });

    const { isPending: isUploadPending, mutate } = useMutation({
        mutationFn: (payload: { files: number[] }) => 
            DealService.upload_file_for_deal(id, payload),
        onSuccess: () => {
            showMessage("Fayllar muvaffaqiyatli saqlandi", "success");
            navigate(-1);
            form.reset();
        }
    });

    // Avtomat ID'larni ajratuvchi va yuboruvchi funksiya
    const uploadFilesDeal = (values: any) => {
        const fileIds = values.deal_files
            ?.map((item: any) => item.file?.id || item.file)
            .filter((fileId: any) => !!fileId);

        const data = {
            files: fileIds // [1, 2, 3] ko'rinishida
        };

        mutate(data);
    };

    return { 
        form, 
        uploadFilesDeal: form.handleSubmit(uploadFilesDeal), 
        isUploadPending 
    };
};

export default useUploadDealFiles;