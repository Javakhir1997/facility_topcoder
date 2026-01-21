import {FC, useEffect, useState} from 'react'
import {
	implementationPeriodOptions,
	sourceOfIncomeOptions,
	validityPeriodOptions,
	applicationSchema,
	initiativeOptions,
	feeForUseOptions,
	point3_2_options,
	booleanOptions,
	riskOptions,
	generateYearsList,
	getSelectValue,
	BUTTON_THEME,
	FIELD, ensureHttps
} from '@app/shared'
import {
	NumberFormattedInput,
	FileUpLoader,
	PageLayout,
	PageTitle,
	FormGrid,
	Select,
	Button,
	Switch,
	Modal,
	Input,
	Tag
} from '@app/components'
import {
	useApplicationDetail,
	useEditApplication,
	useAddApplication,
	useConcept
} from '@modules/applicationsOld/hooks'
import {yupResolver} from '@hookform/resolvers/yup'
import {Controller, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import styles from '@modules/applications/screens/AddAppeal/styles.module.scss'


interface IProperties {
	edit?: boolean;
}

const Index: FC<IProperties> = ({edit = false}) => {
	const [modal, setModal] = useState<string | undefined>(undefined)
	const [file, setFile] = useState<string | undefined>(undefined)

	const {
		handleSubmit,
		control,
		register,
		reset,
		formState: {errors}
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			name: '',
			cost: '',
			startDate: undefined,
			endDate: undefined,
			files: undefined,
			content: '',
			project_type: '',
			volume_work: '',
			description_documents_list: '',
			point3_1: 'true',
			point3_2: 'true',
			point3_3: 'true',
			point3_4: '',
			point3_5_a: '',
			point3_5_b: '',
			point3_5_v: '',
			point3_5_g: undefined,
			point3_5_d: undefined,
			point3_6_a: undefined,
			point3_6_b_0: '',
			point3_6_b: undefined,
			point3_7: undefined,
			point3_8_1: undefined,
			point3_8_2: undefined,
			point3_8_3: undefined,
			point3_8_4: undefined,
			point3_8_5: undefined,
			point3_8_6: undefined,
			point3_8_7: undefined,
			point3_8_8: undefined,
			point3_8_9: undefined,
			point3_8_10: undefined,
			point3_8_11: undefined,
			point3_8_12: undefined,
			point3_8_13: undefined,
			point3_8_14: undefined,
			point3_8_15: undefined,
			point3_8_16: undefined,
			point3_8_17: undefined,
			point3_8_18: undefined,
			point3_8_19: undefined,
			point3_8_20: undefined,
			point3_8_21: undefined,
			point3_8_22: undefined,
			point3_8_23: undefined,
			point3_9_a: '',
			point3_9_b: '',
			point3_9_v: '',
			point3_9_d: '',
			point3_9_e: '',
			point3_9_g: '',
			point3_10_comment: '',
			point3_11_comment: '',
			point3_12_comment: '',
			point3_13: 'true',
			point3_14: 'true',
			point3_15: 'true',
			point3_16: 'true',
			point3_17: 'true',
			point3_18_a: 'true',
			point3_18_b: 'true'
		},
		resolver: yupResolver(applicationSchema)
	})

	const navigate = useNavigate()
	const {isPending, addApplication} = useAddApplication(reset)
	const {isPending: isEditPending, editApplication} = useEditApplication(reset)
	const {isPending: isGeneratingFile, generateFile} = useConcept()

	const {data} = useApplicationDetail(edit)




	useEffect(() => {
		if (data && edit) {
			reset({
				name: data.project_name,
				cost: data.cost,
				startDate: String(data.from_date),
				endDate: String(data.to_date),
				files: data.files,
				content: data.description
			})
		}
	}, [data, edit, reset])

	const handleCloseModal = () => {
		setModal(undefined)
		setFile(undefined)
	}


	return (
		<PageLayout>
			<Modal
				animation="flip"
				visible={!!modal && !!file}
				times={true}
				onClose={handleCloseModal}
				styles={{width: '50vw', height: '99vh'}}
			>
				<div className={styles.modal}>
					<object
						key={modal}
						data={ensureHttps(modal) ?? ''}
						type="application/pdf"
					/>
				</div>
				<div className="flex gap--lg items-center justify-center">
					<Button
						type={FIELD.BUTTON}
						theme={BUTTON_THEME.PRIMARY_OUTLINE}
						disabled={isPending || isEditPending}
						onClick={handleCloseModal}
					>
						Edit
					</Button>
					<Button
						type={FIELD.BUTTON}
						onClick={handleSubmit((data) => addApplication({...data, attachment: file}))}
						theme={BUTTON_THEME.PRIMARY}
						disabled={isPending || isEditPending}
					>
						Submit
					</Button>
				</div>
			</Modal>
			<PageTitle title={edit ? 'Edit' : 'Submit application'}/>
			<FormGrid
				onSubmit={
					handleSubmit((data) =>
						edit ?
							editApplication(data) :
							generateFile(data)
								.then(data => {
										setModal(data?.file)
										setFile(data?.id as string)
									}
								)
					)
				}
			>
				<Input
					id="name"
					type={FIELD.TEXT}
					label="Project name"
					placeholder="Enter the project name"
					error={errors?.name?.message}
					{...register('name')}
				/>

				<Controller
					control={control}
					name="cost"
					render={({field}) => (
						<NumberFormattedInput
							id="cost"
							label="Amount (in sum)"
							placeholder="Enter the amount (in sum)"
							{...field}
							error={errors?.cost?.message}
						/>
					)}
				/>

				<Controller
					name="startDate"
					control={control}
					render={({field: {value, ref, onChange, onBlur}}) => (
						<Select
							ref={ref}
							id="startDate"
							options={generateYearsList()}
							onBlur={onBlur}
							label="Duration (from)"
							error={errors?.startDate?.message}
							value={getSelectValue(generateYearsList(), value)}
							placeholder="Select the duration"
							defaultValue={getSelectValue(generateYearsList(), value)}
							handleOnChange={(e) => onChange(e as string)}
						/>
					)}
				/>

				<Controller
					name="endDate"
					control={control}
					render={({field: {value, ref, onChange, onBlur}}) => (
						<Select
							ref={ref}
							id="endDate"
							options={generateYearsList()}
							onBlur={onBlur}
							label="Duration (to)"
							error={errors?.endDate?.message}
							value={getSelectValue(generateYearsList(), value)}
							placeholder="Select the duration"
							defaultValue={getSelectValue(generateYearsList(), value)}
							handleOnChange={(e) => onChange(e as string)}
						/>
					)}
				/>

				<Controller
					name="files"
					control={control}
					render={({field: {value, ref, onChange, onBlur}}) => (
						<FileUpLoader
							id="files"
							ref={ref}
							multi={true}
							value={value}
							onBlur={onBlur}
							onChange={onChange}
							label="Documents"
							error={errors?.files?.message}
						/>
					)}
				/>

				<div className="col-span--2">
					<Input
						id="content"
						type={FIELD.TEXTAREA}
						textarea={true}
						label="Application content"
						placeholder="Enter the application content"
						error={errors?.content?.message}
						{...register('content')}
					/>
				</div>

				{
					!edit && <>
						<div className="col-span--2">
							<PageTitle title="Concept"/>
						</div>
						<Input
							id="project_type"
							label="Project type"
							placeholder="Enter project type"
							error={errors?.project_type?.message}
							{...register('project_type')}
							type={FIELD.TEXTAREA}
							textarea={true}
							rows={3}
						/>

						<div className="col-span--1">
							<Input
								id="volume_work"
								label="Volume of work performed by the private partner"
								placeholder="Enter the volume of work performed by the private partner"
								error={errors?.volume_work?.message}
								type={FIELD.TEXTAREA}
								textarea={true}
								{...register('volume_work')}
								rows={3}
							/>
						</div>

						<div className="col-span--2">
							<Input
								id="description_documents_list"
								label="Provide detailed information and supporting documents on the preliminary selection results of the PPP project"
								placeholder="Enter the comment"
								type={FIELD.TEXTAREA}
								textarea={true}
								error={errors?.description_documents_list?.message}
								{...register('description_documents_list')}
							/>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_3"
								label="Is it necessary to adopt regulatory legal documents allowing the private partner to implement the project and receive payment for the provided services?"
							>
								<Controller
									name="point3_3"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>

						<Input
							id="point3_1"
							label="Presence of FS/FEED/DDED of the project"
						>
							<Controller
								name="point3_1"
								control={control}
								render={({field: {value, onChange}}) => (
									<Switch
										onChange={onChange}
										value={value}
										items={booleanOptions}
									/>
								)}
							/>
						</Input>

						<Input
							id="point3_2"
							label="If the project is included in one of the following"
						>
							<Controller
								name="point3_2"
								control={control}
								render={({field: {value, onChange}}) => (
									<Switch
										onChange={onChange}
										value={value}
										items={point3_2_options}
									/>
								)}
							/>
						</Input>

						<div className="col-span--2">
							<Input
								id="point3_4"
								label="Describe the final services provided by the private partner within the project"
								placeholder="Enter the comment"
								type={FIELD.TEXTAREA}
								textarea={true}
								error={errors?.point3_4?.message}
								{...register('point3_4')}
							/>
						</div>

						<Controller
							control={control}
							name="point3_5_a"
							render={({field}) => (
								<NumberFormattedInput
									id="point3_5_a"
									disableGroupSeparators={false}
									allowDecimals={true}
									label="Total amount of capital investments and other expenses"
									placeholder="Enter in sum"
									error={errors?.point3_5_a?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							control={control}
							name="point3_5_b"
							render={({field}) => (
								<NumberFormattedInput
									id="point3_5_b"
									disableGroupSeparators={false}
									allowDecimals={true}
									label="Amount of operating expenses"
									placeholder="Enter in sum"
									error={errors?.point3_5_b?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							control={control}
							name="point3_5_v"
							render={({field}) => (
								<NumberFormattedInput
									id="point3_5_v"
									disableGroupSeparators={false}
									allowDecimals={true}
									label="Total expenses"
									placeholder="Enter in sum"
									error={errors?.point3_5_v?.message}
									{...field}
								/>
							)}
						/>

						<Controller
							name="point3_5_g"
							control={control}
							render={({field: {value, ref, onChange, onBlur}}) => (
								<Select
									ref={ref}
									id="point3_5_g"
									options={validityPeriodOptions}
									onBlur={onBlur}
									label="Duration of the PPP agreement"
									error={errors?.point3_5_g?.message}
									value={getSelectValue(validityPeriodOptions, value)}
									placeholder="Select"
									defaultValue={getSelectValue(validityPeriodOptions, value)}
									handleOnChange={(e) => onChange(e as string)}
								/>
							)}
						/>

						<Controller
							name="point3_5_d"
							control={control}
							render={({field: {value, ref, onChange, onBlur}}) => (
								<Select
									ref={ref}
									id="point3_5_d"
									options={implementationPeriodOptions}
									onBlur={onBlur}
									label="Implementation period of the project"
									error={errors?.point3_5_d?.message}
									value={getSelectValue(implementationPeriodOptions, value)}
									placeholder="Select"
									defaultValue={getSelectValue(implementationPeriodOptions, value)}
									handleOnChange={(e) => onChange(e as string)}
								/>
							)}
						/>

						<Controller
							name="point3_6_a"
							control={control}
							render={({field: {value, ref, onChange, onBlur}}) => (
								<Select
									ref={ref}
									id="point3_6_a"
									options={sourceOfIncomeOptions}
									onBlur={onBlur}
									label="Indicate the revenue source of the project"
									error={errors?.point3_6_a?.message}
									value={getSelectValue(sourceOfIncomeOptions, value)}
									placeholder="Select"
									defaultValue={getSelectValue(sourceOfIncomeOptions, value)}
									handleOnChange={(e) => onChange(e as string)}
								/>
							)}
						/>

						<Input
							id="point3_6_b_0"
							type={FIELD.TEXT}
							label="Revenue distribution"
							placeholder="Show revenue distribution"
							error={errors?.point3_6_b_0?.message}
							{...register('point3_6_b_0')}
						/>

						<Controller
							name="point3_6_b"
							control={control}
							render={({field: {value, ref, onChange, onBlur}}) => (
								<Select
									ref={ref}
									id="point3_6_b"
									options={feeForUseOptions}
									onBlur={onBlur}
									label="Free usage fee/Usage fee"
									error={errors?.point3_6_b?.message}
									value={getSelectValue(feeForUseOptions, value)}
									placeholder="Select"
									defaultValue={getSelectValue(feeForUseOptions, value)}
									handleOnChange={(e) => onChange(e as string)}
								/>
							)}
						/>

						<Controller
							name="point3_7"
							control={control}
							render={({field: {value, ref, onChange, onBlur}}) => (
								<Select
									ref={ref}
									id="point3_7"
									options={initiativeOptions}
									onBlur={onBlur}
									label="Define the PPP project initiator/Usage fee"
									error={errors?.point3_7?.message}
									value={getSelectValue(initiativeOptions, value)}
									placeholder="Select"
									defaultValue={getSelectValue(initiativeOptions, value)}
									handleOnChange={(e) => onChange(e as string)}
								/>
							)}
						/>

						<Tag
							title="Specify proposed changes in risk distribution between private and public partners"
							className="col-span--2"
							bold={true}
							type="vertical"
						>
							<div className="grid grid--cols-3 gap--2xl w-full">
								<Controller
									name="point3_8_1"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_1"
											options={riskOptions}
											onBlur={onBlur}
											label="Project-related Risks"
											error={errors?.point3_8_1?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_2"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_2"
											options={riskOptions}
											onBlur={onBlur}
											label="Design and Technology Obsolescence Risk"
											error={errors?.point3_8_2?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_3"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_3"
											options={riskOptions}
											onBlur={onBlur}
											label="Hidden Defect Risk"
											error={errors?.point3_8_3?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_4"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_4"
											options={riskOptions}
											onBlur={onBlur}
											label="Land Acquisition and Transfer-related Risks"
											error={errors?.point3_8_4?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_5"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_5"
											options={riskOptions}
											onBlur={onBlur}
											label="Financial Risks"
											error={errors?.point3_8_5?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_6"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_6"
											options={riskOptions}
											onBlur={onBlur}
											label="Construction-related Risk (Uncertain)"
											error={errors?.point3_8_6?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_7"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_7"
											options={riskOptions}
											onBlur={onBlur}
											label="Construction-related Risk (Certain)"
											error={errors?.point3_8_7?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_23"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_23"
											options={riskOptions}
											onBlur={onBlur}
											label="Demand-related Risks"
											error={errors?.point3_8_23?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_9"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_9"
											options={riskOptions}
											onBlur={onBlur}
											label="Commissioning-related Risks"
											error={errors?.point3_8_9?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_10"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_10"
											options={riskOptions}
											onBlur={onBlur}
											label="Project Insurance-related Risks"
											error={errors?.point3_8_10?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_11"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_11"
											options={riskOptions}
											onBlur={onBlur}
											label="Tax-related Risks"
											error={errors?.point3_8_11?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_12"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_12"
											options={riskOptions}
											onBlur={onBlur}
											label="Tariff Change Risks"
											error={errors?.point3_8_12?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_13"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_13"
											options={riskOptions}
											onBlur={onBlur}
											label="Changes after Project Contract (Private Partner)"
											error={errors?.point3_8_13?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_14"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_14"
											options={riskOptions}
											onBlur={onBlur}
											label="Legislative Changes Risk"
											error={errors?.point3_8_14?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_15"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_15"
											options={riskOptions}
											onBlur={onBlur}
											label="Licensing and Permits Delays or Denial Risk"
											error={errors?.point3_8_15?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_16"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_16"
											options={riskOptions}
											onBlur={onBlur}
											label="Private Partner Payment Delays"
											error={errors?.point3_8_16?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_17"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_17"
											options={riskOptions}
											onBlur={onBlur}
											label="Political Instability Risks"
											error={errors?.point3_8_17?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_18"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_18"
											options={riskOptions}
											onBlur={onBlur}
											label="Renovation and Reconstruction Risks"
											error={errors?.point3_8_18?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_19"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_19"
											options={riskOptions}
											onBlur={onBlur}
											label="Asset Confiscation Risk"
											error={errors?.point3_8_19?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_20"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_20"
											options={riskOptions}
											onBlur={onBlur}
											label="Operational Risks"
											error={errors?.point3_8_20?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_21"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_21"
											options={riskOptions}
											onBlur={onBlur}
											label="Environmental/Social Risks (Operation-related)"
											error={errors?.point3_8_21?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<Controller
									name="point3_8_22"
									control={control}
									render={({field: {value, ref, onChange, onBlur}}) => (
										<Select
											ref={ref}
											id="point3_8_22"
											options={riskOptions}
											onBlur={onBlur}
											label="Operational Activity Risks"
											error={errors?.point3_8_22?.message}
											value={getSelectValue(riskOptions, value)}
											placeholder="Select"
											defaultValue={getSelectValue(riskOptions, value)}
											handleOnChange={(e) => onChange(e as string)}
										/>
									)}
								/>

								<div className="col-span--1">
									<Controller
										name="point3_8_8"
										control={control}
										render={({field: {value, ref, onChange, onBlur}}) => (
											<Select
												ref={ref}
												id="point3_8_8"
												options={riskOptions}
												onBlur={onBlur}
												label="Changes after Project Contract (Public Partner)"
												error={errors?.point3_8_8?.message}
												value={getSelectValue(riskOptions, value)}
												placeholder="Select"
												defaultValue={getSelectValue(riskOptions, value)}
												handleOnChange={(e) => onChange(e as string)}
											/>
										)}
									/>
								</div>

							</div>
						</Tag>

						<Tag
							title="Stages"
							className="col-span--2"
							bold={true}
							type="vertical"
						>
							<div className="grid grid--cols-3 gap--2xl w-full">

								<Input
									id="point3_9_a"
									type={FIELD.TEXT}
									label="Confirming the Concept of the PPP Project"
									placeholder="Confirming the Concept of the PPP Project"
									error={errors?.point3_9_a?.message}
									{...register('point3_9_a')}
								/>


								<Input
									id="point3_9_v"
									type={FIELD.TEXT}
									label="Winner Selection (Single-stage Tender)"
									placeholder="Winner Selection (Single-stage Tender)"
									error={errors?.point3_9_v?.message}
									{...register('point3_9_v')}
								/>

								<Input
									id="point3_9_d"
									type={FIELD.TEXT}
									label="Negotiations and Signing of the PPP Agreement"
									placeholder="Negotiations and Signing of the PPP Agreement"
									error={errors?.point3_9_d?.message}
									{...register('point3_9_d')}
								/>

								<Input
									id="point3_9_e"
									type={FIELD.TEXT}
									label="Establishing the Special Purpose Vehicle (SPV)"
									placeholder="Establishing the Special Purpose Vehicle (SPV)"
									error={errors?.point3_9_e?.message}
									{...register('point3_9_e')}
								/>

								<Input
									id="point3_9_g"
									type={FIELD.TEXT}
									label="Financial Closing"
									placeholder="Financial Closing"
									error={errors?.point3_9_g?.message}
									{...register('point3_9_g')}
								/>

								<Input
									id="point3_9_b"
									type={FIELD.TEXT}
									label="Preparing Preliminary Documents (e.g., LPH, TIA, TİHK, Tender)"
									placeholder="Preparing Preliminary Documents (e.g., LPH, TIA, TİHK, Tender)"
									error={errors?.point3_9_b?.message}
									{...register('point3_9_b')}
								/>


							</div>
						</Tag>


						<div className="col-span--2">
							<Input
								id="point3_10_comment"
								label="Total amount allocated from population or state budget for this service"
								placeholder="Enter the comment"
								type={FIELD.TEXTAREA}
								textarea={true}
								error={errors?.point3_10_comment?.message}
								{...register('point3_10_comment')}
							/>
						</div>
						<div className="col-span--2">
							<Input
								id="point3_11_comment"
								label="Estimated amount expected to be allocated from the budget when the project is implemented by the state (including capital and management costs)"
								placeholder="Enter the comment"
								type={FIELD.TEXTAREA}
								textarea={true}
								error={errors?.point3_11_comment?.message}
								{...register('point3_11_comment')}
							/>
						</div>
						<div className="col-span--2">
							<Input
								id="point3_12_comment"
								label="If the price of goods (services/works) delivered within the proposed project exceeds the amount specified in the state budget, justify the appropriateness of implementing the project through the PPP mechanism"
								placeholder="Enter the comment"
								type={FIELD.TEXTAREA}
								textarea={true}
								error={errors?.point3_12_comment?.message}
								{...register('point3_12_comment')}
							/>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_13"
								label="Is the proposed project aimed at solving economic, social, and infrastructural tasks/problems?"
							>
								<Controller
									name="point3_13"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_14"
								label="Does the proposed project involve the introduction of advanced management experience?"
							>
								<Controller
									name="point3_14"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_15"
								label="Does the proposed project include innovative approaches and can it provide a mutually beneficial return for the parties?"
							>
								<Controller
									name="point3_15"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_16"
								label="Does the proposed project foresee the implementation of automated electronic calculations and reports?"
							>
								<Controller
									name="point3_16"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>

						<div className="col-span--2">
							<Input
								id="point3_17"
								label="Is the proposed project aimed at solving economic, social, and infrastructural tasks/problems?"
							>
								<Controller
									name="point3_17"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>


						<div className="col-span--2">
							<Input
								id="point3_18_a"
								label="Is there a possibility of social issues arising as a result of the project implementation?"
							>
								<Controller
									name="point3_18_a"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>


						<div className="col-span--2">
							<Input
								id="point3_18_b"
								label="Is there a possibility of environmental issues arising as a result of the project implementation?"
							>
								<Controller
									name="point3_18_b"
									control={control}
									render={({field: {value, onChange}}) => (
										<Switch
											onChange={onChange}
											value={value}
											items={booleanOptions}
										/>
									)}
								/>
							</Input>
						</div>
					</>
				}

				<div className="flex justify-between col-span--2 grid-row--25">
					<Button onClick={() => navigate(`/applications`)} theme={BUTTON_THEME.OUTLINE}>
						Back
					</Button>
					{
						edit ?
							<Button type={FIELD.SUBMIT} theme={BUTTON_THEME.PRIMARY}
							        disabled={isPending || isEditPending}>
								Edit
							</Button> :
							<Button type={FIELD.SUBMIT} theme={BUTTON_THEME.PRIMARY} disabled={isGeneratingFile}>
								Generate concept
							</Button>
					}
				</div>
			</FormGrid>
		</PageLayout>
	)
}

export default Index
