import {
    PageLayout,
    PageTitle, Select,
} from "@app/components";
import {
    Form, FormField, FormItem, FormMessage,
} from '@shared/component/ui/form';
import { parseISO } from 'date-fns';
import {Button} from "@shared/component/ui/button.tsx";
import {CircleX} from "lucide-react";
import {getSelectValue} from "@app/shared";
import DatePicker from "@components/UI/DatePicker";
import {useAttachPerformer} from "@modules/conception/hooks";
import {AttachPerformerDTO} from "@entities/conception";



const Index = () => {

    const { attachPerformer, responsibilityListOptions, isPendingResponsibilityList, form, fields, remove, append } = useAttachPerformer();

    const handleFormSubmit = (data:AttachPerformerDTO) => {
        attachPerformer(data)
    };

    return (
        <PageLayout>
            <PageTitle title="Set responsibility"/>
            <Form {...form}>
                <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>

                            {fields.map((item, index) => (
                                <div className="grid grid-cols-12 gap-4 mb-4" key={item.id}>
                                        <div className={'col-span-4'}>
                                            <FormField
                                                control={form.control}
                                                name={`responsibility.${index}.performer`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <Select
                                                            id={`responsibility.${index}.id`}
                                                            {...field}
                                                            value={getSelectValue(responsibilityListOptions, field.value)}
                                                            options={responsibilityListOptions}
                                                            isLoading={isPendingResponsibilityList}
                                                            handleOnChange={(e) => field.onChange(e as string)}
                                                        />
                                                        <FormMessage/>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className={'col-span-4'}>
                                            <div className="flex justify-between items-center">
                                                <FormField
                                                    control={form.control}
                                                    name={`responsibility.${index}.deadline`}
                                                    render={({field}) => {
                                                        const dateValue = typeof field.value === 'string' ? parseISO(field.value) : field.value;
                                                        return (
                                                            <FormItem className="w-full">
                                                                <div className="">
                                                                    <DatePicker
                                                                        value={dateValue instanceof Date && !isNaN(dateValue.valueOf()) ? dateValue : undefined}
                                                                        onChange={field.onChange}
                                                                        // disableStrategy={'before'}
                                                                        placeholder="Amal qilish muddati"
                                                                    />
                                                                </div>
                                                                <FormMessage/>
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
                                        onClick={() => append({performer: 0, deadline: ""})}
                                    >
                                        Qoshish
                                    </Button>


                                    <div className={'mt-5'}>
                                        <Button
                                            variant={'default'}
                                        >
                                            Saqlash
                                        </Button>
                                    </div>

                            </form>
                    </Form>
            </PageLayout>
    )
}

export default Index
