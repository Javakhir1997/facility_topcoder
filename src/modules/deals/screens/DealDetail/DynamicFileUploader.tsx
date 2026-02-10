import { useFieldArray, UseFormReturn } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shared/component/ui/form';
import { Button, FileUpLoader } from '@app/components'; // Yo'llarni tekshiring
import { BUTTON_THEME } from '@app/shared';
import { useTranslation } from 'react-i18next';

interface Props {
    form: UseFormReturn<any>;
    name: string;
}

const DynamicFileUploader = ({ form, name }: Props) => {
    const { t } = useTranslation();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: name
    });

    return (
        <div className="space-y-4">
            {fields.map((item, index) => (
                <div key={item.id} className="flex items-end gap-3 p-4 border rounded-xl bg-white shadow-sm transition-all hover:border-blue-200">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name={`${name}.${index}.file`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-600 font-medium">
                                        {t('Hujjat')} {index + 1}
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpLoader
                                            id={`upload_file_${item.id}`}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-2 pb-1">
                        {fields.length > 1 && (
                            <Button 
                                type="button" 
                                theme={BUTTON_THEME.DANGER_OUTLINE} 
                                mini 
                                onClick={() => remove(index)}
                            >
                                ✕
                            </Button>
                        )}
                        {index === fields.length - 1 && (
                            <Button 
                                type="button" 
                                theme={BUTTON_THEME.PRIMARY} 
                                mini 
                                onClick={() => append({ file: null })}
                            >
                                +
                            </Button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DynamicFileUploader;