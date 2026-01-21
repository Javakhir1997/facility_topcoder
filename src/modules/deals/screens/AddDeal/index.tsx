import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FC, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import {
    Button,
    FormGrid,
    Input,
    Modal,
    NumberFormattedInput,
    PageLayout,
    PageTitle,
    Select,
    MaskInput, 
    FileUpLoader // Yangilangan komponent
} from '@app/components'
import {
    BUTTON_THEME,
    FIELD,
    financingOpportunityOptions, 
    getSelectValue,
    ownerTypeOptions,
    stabilityRatingOptions,
    techniquesOptions
} from '@app/shared'
import { appealSchema } from '@app/shared/helpers/yup'
import { useAddAppeal } from '@modules/applications/hooks'
import { CommonService as commonService } from '@app/services'
import styles from './styles.module.scss'
import { IAppealForm, IFIle } from '@app/interfaces'
import useSelect from '@hooks/useSelect'

interface IProperties {
    edit?: boolean;
}

const Index: FC<IProperties> = ({ edit = false }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const [modal, setModal] = useState<string | undefined>(undefined)

    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(appealSchema(t)),
        defaultValues: {
            owner_type: ownerTypeOptions[0].value?.toString() || '',
            stir: '',
            company_name: '',
            lastname: '',
            firstname: '',
            middle_name: '',
            pinfl: '',
            passport_seria: '',
            passport_number: '',
            address: '',
            phone: '',
            email: '',
            region: undefined,
            district: undefined,
            activity_type: undefined,
            activity_experience: undefined,
            indebtedness_file: undefined,
            stability_rating: undefined,
            success_projects: '',
            success_projects_file: undefined,
            investment_ability: undefined,
            techniques: undefined,
            financing_opportunity: undefined,
            return_on_investment: 'false',
            body: '',
            objects: []
        }
    })

    const { data: objects } = useSelect('object')
    const [activeRegion, setActiveRegion] = useState<number | null>(null);

    const ownerType = watch('owner_type')

    const { data: regions = [] } = useQuery({
        queryKey: ['regions'],
        queryFn: () => commonService.getRegions()
    })

    const { data: districts = [] } = useQuery({
        queryKey: ['district', activeRegion],
        queryFn: () => commonService.getDistricts(activeRegion),
        enabled: !!activeRegion
    })

    const { data: activityTypes = [] } = useQuery({
        queryKey: ['activityTypes'],
        queryFn: () => commonService.getActivityTypes()
    })

    const { data: organizations } = useSelect('owner-organization')
    const { data: types } = useSelect('object-types-select')

    const { addAppeal, isPending } = useAddAppeal(reset)

    const handleFinalSubmit = handleSubmit((data) => {
        const formData = new FormData()
        
        // Shaxs turiga qarab ma'lumotlarni qo'shish
        if (data.owner_type === 'yuridik') {
            formData.append('stir', data.stir || '')
            formData.append('company_name', data.company_name || '')
        } else {
            formData.append('pinfl', data.pinfl || '')
            formData.append('passport_seria', data.passport_seria || '')
            formData.append('passport_number', data.passport_number || '')
        }

        // Umumiy maydonlar
        formData.append('lastname', data.lastname || '')
        formData.append('firstname', data.firstname || '')
        formData.append('middle_name', data.middle_name || '')
        formData.append('address', data.address)
        formData.append('phone', data.phone)
        formData.append('email', data.email)
        formData.append('body', data.body)
        
        if (data.activity_experience) formData.append('activity_experience', String(data.activity_experience))
        if (data.investment_ability) formData.append('investment_ability', String(data.investment_ability))
        formData.append('return_on_investment', String(data.return_on_investment))

        // Select va ID-ga asoslangan maydonlar
        if (data.region) formData.append('region', String(data.region))
        if (data.district) formData.append('district', String(data.district))
        if (data.activity_type) formData.append('activity_type', String(data.activity_type))
        if (data.stability_rating) formData.append('stability_rating', data.stability_rating)
        if (data.techniques) formData.append('techniques', data.techniques)
        if (data.financing_opportunity) formData.append('financing_opportunity', data.financing_opportunity)

        // Ko'p tanlovli (Multi-select) maydonlar
        if (Array.isArray(data.objects)) {
            data.objects.forEach((objId: any) => formData.append('objects[]', String(objId)))
        }

        // Fayllar (Faqat yuklangan fayl ID sini yuboramiz)
        if (data.indebtedness_file?.id) {
            formData.append('indebtedness_file_id', String(data.indebtedness_file.id))
        }
        if (data.success_projects_file?.id) {
            formData.append('success_projects_file_id', String(data.success_projects_file.id))
        }

        addAppeal(formData as unknown as IAppealForm)
        handleCloseModal()
    })

    const handleCloseModal = () => setModal(undefined)

    return (
        <PageLayout>
            <PageTitle title={t('Submit application')} />
            <FormGrid onSubmit={(e) => {
                e.preventDefault();
                setModal('confirm'); // Avval modalni ko'rsatamiz
            }}>
                
                {/* Person Type */}
                <Controller
                    name="owner_type"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Select
                            id="owner_type"
                            {...field}
                            value={getSelectValue(ownerTypeOptions, field.value)}
                            options={ownerTypeOptions}
                            label={t('appeals.person_type')}
                            error={error?.message}
                            handleOnChange={(e) => field.onChange(e as string)}
                        />
                    )}
                />

                {/* Conditional Fields (STIR vs PINFL) */}
                {ownerType === 'yuridik' ? (
                    <Controller
                        name="stir"
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <MaskInput
                                {...field}
                                mask={'999999999'}
                                label={t('appeals.stir')}
                                error={error?.message}
                            />
                        )}
                    />
                ) : (
                    <>
                        <Controller
                            name="pinfl"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <MaskInput {...field} mask={'99999999999999'} label={t('appeals.pinfl')} error={error?.message} />
                            )}
                        />
                        <div className="flex gap-4">
                            <Controller
                                name="passport_seria"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <MaskInput {...field} mask={'aa'} label={t('passport_seria')} error={error?.message} />
                                )}
                            />
                            <Controller
                                name="passport_number"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <MaskInput {...field} mask={'9999999'} label={t('appeals.passport_number')} error={error?.message} />
                                )}
                            />
                        </div>
                    </>
                )}

                {/* F.I.O */}
                <Controller
                    name="lastname"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input id="lastname" {...field} label={t('appeals.surname')} error={error?.message} />
                    )}
                />
                <Controller
                    name="firstname"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input id="firstname" {...field} label={t('appeals.name')} error={error?.message} />
                    )}
                />
                <Controller
                    name="middle_name"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input id="middle_name" {...field} label={t('appeals.middle_name')} error={error?.message} />
                    )}
                />

                {/* Geography */}
                <Controller
                    name="region"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Select
                            id="region"
                            {...field}
                            options={regions}
                            value={getSelectValue(regions, field.value)}
                            label={t('Region')}
                            error={error?.message}
                            handleOnChange={(e) => {
                                field.onChange(e);
                                setActiveRegion(e as number);
                            }}
                        />
                    )}
                />
                <Controller
                    name="district"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Select
                            id="district"
                            {...field}
                            options={districts}
                            value={getSelectValue(districts, field.value)}
                            label={t('district')}
                            error={error?.message}
                            handleOnChange={(e) => field.onChange(e)}
                        />
                    )}
                />

                <Controller
                    name="address"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input id="address" {...field} label={t('appeals.address')} error={error?.message} />
                    )}
                />

                {/* Contacts */}
                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <MaskInput {...field} mask={'+998 (99) 999-99-99'} label={t('appeals.phone_number')} error={error?.message} />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input id="email" {...field} type="email" label={t('Email')} error={error?.message} />
                    )}
                />

                {/* Files Section */}
                <Controller
                    name="indebtedness_file"
                    control={control}
                    render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                        <FileUpLoader
                            id="indebtedness_file"
                            ref={ref}
                            type="pdf" // Faqat PDF ruxsat berilgan
                            value={value as unknown as IFIle}
                            onBlur={onBlur}
                            onChange={onChange}
                            label={t('appeals.debt_certificate')}
                            error={error?.message}
                        />
                    )}
                />

                <Controller
                    name="success_projects_file"
                    control={control}
                    render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                        <FileUpLoader
                            id="success_projects_file"
                            ref={ref}
                            type="pdf" // Word/Excel ruxsat berilgan
                            value={value as unknown as IFIle}
                            onBlur={onBlur}
                            onChange={onChange}
                            label={t('DXSH loyihalar fayli')}
                            error={error?.message}
                        />
                    )}
                />

                {/* Rest of the fields (Rating, Financing, Objects) */}
                <Controller
                    name="objects"
                    control={control}
                    render={({ field: { value, ref, onChange, onBlur }, fieldState: { error } }) => (
                        <Select
                            ref={ref}
                            id="objects"
                            options={objects}
                            onBlur={onBlur}
                            isMulti={true}
                            label="Objects"
                            error={error?.message}
                            value={getSelectValue(objects, value)}
                            handleOnChange={(e) => onChange(e)}
                        />
                    )}
                />

                <Controller
                    name="body"
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <Input
                            id="body"
                            {...field}
                            textarea
                            label={t('Appeal content')}
                            error={error?.message}
                            className={styles.fullWidth}
                        />
                    )}
                />

                {/* Action Buttons */}
                <div className="flex justify-between col-span--2 mt-6">
                    <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                        {t('appeals.back')}
                    </Button>
                    <Button
                        type={FIELD.SUBMIT}
                        theme={BUTTON_THEME.PRIMARY}
                        disabled={isPending}
                    >
                        {t('Create application')}
                    </Button>
                </div>

            </FormGrid>

            {/* Confirm Modal */}
            <Modal
                visible={!!modal}
                onClose={handleCloseModal}
                styles={{ width: '40vw', height: 'auto', padding: '24px' }}
            >
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{t('Murojaatni tasdiqlang')}</h3>
                    <p className="text-gray-600 mb-6">{t('Kiritilgan ma\'lumotlarni tekshirib, yuborish tugmasini bosing.')}</p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            theme={BUTTON_THEME.OUTLINE}
                            onClick={handleCloseModal}
                        >
                            {t('appeals.edit')}
                        </Button>
                        <Button
                            theme={BUTTON_THEME.PRIMARY}
                            onClick={handleFinalSubmit}
                            disabled={isPending}
                        >
                            {isPending ? t('Loading...') : t('appeals.submit')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </PageLayout>
    )
}

export default Index