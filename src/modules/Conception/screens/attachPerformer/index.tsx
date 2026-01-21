import {
    PageLayout,
    PageTitle, Select,
} from "@app/components";
import {
    Form, FormField, FormItem, FormMessage,
} from '@shared/component/ui/form';
import { parseISO } from 'date-fns';
import { Button } from "@shared/component/ui/button.tsx";
import { CircleX } from "lucide-react";
import { getSelectValue } from "@app/shared";
import DatePicker from "@components/UI/DatePicker";
import { useAttachPerformer } from "@modules/conception/hooks";
import { AttachPerformerDTO } from "@entities/conception";

const Index = () => {

    // Eslatma: useAttachPerformer hook ichida ham "responsibility" ni "performers" ga o'zgartirgan bo'lishingiz shart!
    const { attachPerformer, responsibilityListOptions, isPendingResponsibilityList, form, fields, remove, append } = useAttachPerformer();

    const handleFormSubmit = (data: AttachPerformerDTO) => {
        // Endi data to'g'ridan-to'g'ri { performers: [...] } bo'lib keladi.
        // Qo'shimcha o'zgartirish shart emas.
        attachPerformer(data);
        console.log(data, 'Backendga ketayotgan data');
    };

    return (
        <PageLayout>
            <PageTitle title="Set responsibility" />
            <Form {...form}>
                <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>

                    {fields.map((item, index) => (
                        <div className="grid grid-cols-12 gap-4 mb-4" key={item.id}>
                            <div className={'col-span-4'}>
                                {/* 👇 1-O'ZGARISH: name="performers..." bo'ldi */}
                                <FormField
                                    control={form.control}
                                    name={`performers.${index}.performer`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                id={`performers.${index}.id`} // ID ham o'zgardi
                                                {...field}
                                                value={getSelectValue(responsibilityListOptions, field.value)}
                                                options={responsibilityListOptions}
                                                isLoading={isPendingResponsibilityList}
                                                handleOnChange={(e) => field.onChange(e as string)}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className={'col-span-4'}>
                                <div className="flex justify-between items-center">
                                    {/* 👇 2-O'ZGARISH: name="performers..." bo'ldi */}
                                    <FormField
                                        control={form.control}
                                        name={`performers.${index}.deadline`}
                                        render={({ field }) => {
                                            const dateValue = typeof field.value === 'string' ? parseISO(field.value) : field.value;
                                            return (
                                                <FormItem className="w-full">
                                                    <div className="">
                                                        <DatePicker
                                                            value={dateValue instanceof Date && !isNaN(dateValue.valueOf()) ? dateValue : undefined}
                                                            onChange={field.onChange}
                                                            placeholder="Amal qilish muddati"
                                                        />
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                    <button
                                        className={'px-3 text-red-500 cursor-pointer'}
                                        type="button" onClick={() => remove(index)}>
                                        <CircleX />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <Button
                        variant={'default'}
                        type="button"
                        onClick={() => append({ performer: 0, deadline: "" })}
                    >
                        Qo'shish
                    </Button>

                    <div className={'mt-5'}>
                        <Button
                            variant={'default'}
                            type="submit" // Turi 'submit' bo'lishi kerak
                        >
                            Saqlash
                        </Button>
                    </div>

                </form>
            </Form>
        </PageLayout>
    )
}

export default Index;