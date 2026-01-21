import {
    HR, Input, NumberFormattedInput,
    PageLayout,
    PageTitle,
    Restricted, Select,
    Status, Switch,
    Tag,
    Wrapper,
} from "@app/components";
import {
    booleanOptions,
    convertDateFormat,
    feeForUseOptions,
    FIELD,
    getSelectValue,
    implementationPeriodOptions,
    initiativeOptions,
    riskOptions,
    ROLE_LIST,
    sourceOfIncomeOptions,
    validityPeriodOptions
} from "@app/shared";
import {useAppealDetail} from "@modules/applications/hooks";
import {
    Form, FormControl, FormField, FormItem, FormMessage
} from '@shared/component/ui/form';
import {Button} from "@shared/component/ui/button";
import {SetObjectConceptDTO} from "@entities/application";
import useObjectConcept from "@modules/applications/hooks/useObjectConcept.ts";
import {useTranslation} from "react-i18next";


const Index = () => {

    // const navigate = useNavigate()
    const {data} = useAppealDetail()
    const {form, setObjectConcept, isPending} = useObjectConcept()


    const handleFormSubmit = (data: SetObjectConceptDTO) => {
        setObjectConcept(data)
    };

    const {t} = useTranslation()


    console.log(form.getValues(), 'field-values')
    console.log(form.formState.errors, 'field-errors')

    return (
        <PageLayout>
            <PageTitle title="set_object_concept"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Request status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>

                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>

                <HR/>


                <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                    <Form {...form}>
                        <form autoComplete="off" onSubmit={form.handleSubmit(handleFormSubmit)}>

                            <div className="grid grid-cols-12 gap-6 mb-4">
                                {/*<div className="col-span-3">*/}
                                {/*    <FormField*/}
                                {/*        control={form.control}*/}
                                {/*        name={'is_active'}*/}
                                {/*        render={({field: {value, onChange}}) => {*/}
                                {/*            return (*/}
                                {/*                <FormItem>*/}
                                {/*                    <FormControl>*/}
                                {/*                        <Input*/}
                                {/*                            id="point3_13"*/}
                                {/*                            label="is_active"*/}
                                {/*                        >*/}
                                {/*                            <Switch*/}
                                {/*                                onChange={onChange}*/}
                                {/*                                value={value}*/}
                                {/*                                items={booleanOptions}*/}
                                {/*                            />*/}
                                {/*                        </Input>*/}
                                {/*                    </FormControl>*/}
                                {/*                    <FormMessage/>*/}
                                {/*                </FormItem>*/}
                                {/*            )*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                {/*<div className="col-span-3">*/}
                                {/*    <FormField*/}
                                {/*        control={form.control}*/}
                                {/*        name={'status'}*/}
                                {/*        render={({field: {ref, onBlur, onChange, value}}) => {*/}
                                {/*            return (*/}
                                {/*                <FormItem>*/}
                                {/*                    <FormControl>*/}
                                {/*                        <Select*/}
                                {/*                            ref={ref}*/}
                                {/*                            id="status"*/}
                                {/*                            options={statusTabOptions}*/}
                                {/*                            onBlur={onBlur}*/}
                                {/*                            label="status"*/}
                                {/*                            value={getSelectValue(statusTabOptions, value)}*/}
                                {/*                            placeholder="Select the status"*/}
                                {/*                            defaultValue={getSelectValue(statusTabOptions, value)}*/}
                                {/*                            handleOnChange={(e) => onChange(e as string)}*/}
                                {/*                        />*/}
                                {/*                    </FormControl>*/}
                                {/*                    <FormMessage/>*/}
                                {/*                </FormItem>*/}
                                {/*            )*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={'project_name'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input id="project_name" {...field} label={t('project_name')}/>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-6 col-start-1">
                                    <FormField
                                        control={form.control}
                                        name={'project_type'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="project_type"
                                                            {...field}
                                                            label={t('project_type')}
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name={'volume_work'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="volume_work"
                                                            {...field}
                                                            label={t('volume_work')}
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name={'description_documents_list'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="description_documents_list"
                                                            {...field}
                                                            label={t('description_documents_list')}
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={'point3_1'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_1"
                                                            label="point3_1"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={'point3_2'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_2"
                                                            label="point3_2"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name={'point3_3'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_3"
                                                            label="point3_3"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-6">
                                    <FormField
                                        control={form.control}
                                        name={'point3_4'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_4"
                                                            {...field}
                                                            label={t('point3_4')}
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            rows={3}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3">
                                    <FormField
                                        control={form.control}
                                        name={'point3_5_a'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <NumberFormattedInput
                                                            id="point3_5_a"
                                                            disableGroupSeparators={false}
                                                            allowDecimals={true}
                                                            label="point3_5_a"
                                                            placeholder="point3_5_a"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_5_b'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <NumberFormattedInput
                                                            id="point3_5_b"
                                                            disableGroupSeparators={false}
                                                            allowDecimals={true}
                                                            label="point3_5_b"
                                                            placeholder="point3_5_b"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_5_v'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <NumberFormattedInput
                                                            id="point3_5_v"
                                                            disableGroupSeparators={false}
                                                            allowDecimals={true}
                                                            label="point3_5_v"
                                                            placeholder="point3_5_v"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12 py-4">
                                    <HR/>
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_5_g'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_5_g"
                                                            options={validityPeriodOptions}
                                                            onBlur={onBlur}
                                                            label="point3_5_g"
                                                            value={getSelectValue(validityPeriodOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(validityPeriodOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_5_d'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_5_d"
                                                            options={implementationPeriodOptions}
                                                            onBlur={onBlur}
                                                            label="point3_5_d"
                                                            value={getSelectValue(implementationPeriodOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(implementationPeriodOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_6_a'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_6_a"
                                                            options={sourceOfIncomeOptions}
                                                            onBlur={onBlur}
                                                            label="point3_6_a"
                                                            value={getSelectValue(sourceOfIncomeOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(sourceOfIncomeOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_6_b_0'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_6_b_0"
                                                            {...field}
                                                            label={t('point3_6_b_0')}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_6_b'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_6_b"
                                                            options={feeForUseOptions}
                                                            onBlur={onBlur}
                                                            label="point3_6_b"
                                                            value={getSelectValue(feeForUseOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(feeForUseOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_7'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_7"
                                                            options={initiativeOptions}
                                                            onBlur={onBlur}
                                                            label="point3_7"
                                                            value={getSelectValue(initiativeOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(initiativeOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12">
                                    <HR/>
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_1'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_1"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_1"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_2'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_2"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_2"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_3'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_3"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_3"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_4'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_4"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_4"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_5'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_5"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_5"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_6'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_6"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_6"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_7'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_7"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_7"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_8'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_8"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_8"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_9'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_9"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_9"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_10'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_10"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_10"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_11'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_11"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_11"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_12'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_12"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_12"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_13'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_13"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_13"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_14'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_14"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_14"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_15'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_15"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_15"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_16'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_16"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_16"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_17'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_17"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_17"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_18'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_18"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_18"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_19'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_19"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_19"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_20'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_20"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_20"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_21'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_21"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_21"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_22'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_22"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_22"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_8_23'}
                                        render={({field: {ref, onBlur, value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Select
                                                            ref={ref}
                                                            id="point3_8_23"
                                                            options={riskOptions}
                                                            onBlur={onBlur}
                                                            label="point3_8_23"
                                                            value={getSelectValue(riskOptions, value)}
                                                            placeholder="Select"
                                                            defaultValue={getSelectValue(riskOptions, value)}
                                                            handleOnChange={(e) => onChange(e as string)}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12 my-4">
                                    <HR/>
                                </div>


                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_a'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_a"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_a"
                                                            placeholder="point3_9_a"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_b'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_b"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_b"
                                                            placeholder="point3_9_b"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_v'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_v"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_v"
                                                            placeholder="point3_9_v"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_d'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_d"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_d"
                                                            placeholder="point3_9_d"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_e'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_e"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_e"
                                                            placeholder="point3_9_e"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_9_g'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_9_g"
                                                            type={FIELD.TEXT}
                                                            label="point3_9_e"
                                                            placeholder="point3_9_g"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12 my-4">
                                    <HR/>
                                </div>

                                <div className="col-span-4 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_10_comment'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_10_comment"
                                                            label="Total amount allocated from population or state budget for this service"
                                                            placeholder="Enter the comment"
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-4 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_11_comment'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_11_comment"
                                                            label="point3_11_comment"
                                                            placeholder="Enter the comment"
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-4 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_12_comment'}
                                        render={({field}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_12_comment"
                                                            label="point3_12_comment"
                                                            placeholder="Enter the comment"
                                                            type={FIELD.TEXTAREA}
                                                            textarea={true}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12">
                                    <HR/>
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_13'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_13"
                                                            label="point3_13"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_14'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_14"
                                                            label="point3_14"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_15'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_15"
                                                            label="point3_15"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_16'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_16"
                                                            label="point3_16"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_17'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_17"
                                                            label="point3_17"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-12">
                                    <HR/>
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_18_a'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_18_a"
                                                            label="point3_18_a"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_18_b'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_18_b"
                                                            label="point3_18_b"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_19_1'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_19_1"
                                                            label="point3_19_1"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_19_2'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_19_2"
                                                            label="point3_19_2"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_19_3'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_19_3"
                                                            label="point3_19_3"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_19_4'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_19_4"
                                                            label="point3_19_4"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>

                                <div className="col-span-3 content-end">
                                    <FormField
                                        control={form.control}
                                        name={'point3_19_5'}
                                        render={({field: {value, onChange}}) => {
                                            return (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            id="point3_19_5"
                                                            label="point3_19_5"
                                                        >
                                                            <Switch
                                                                onChange={onChange}
                                                                value={value}
                                                                items={booleanOptions}
                                                            />
                                                        </Input>
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                </div>


                            </div>


                            <div className={'mt-5 flex justify-end'}>
                                <Button type="submit" size={'lg'} loading={isPending}>
                                    {t('Save')}
                                </Button>
                            </div>

                        </form>
                    </Form>
                </Restricted>
            </Wrapper>
        </PageLayout>
    )
}

export default Index
