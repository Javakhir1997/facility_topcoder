import {
	Button,
	FileUpLoader,
	GridWrapper,
	PageLayout,
	PageTitle,
	Restricted,
	Row, ShowIf,
	Status, Table,
	Tag,
	Wrapper
} from '@app/components'
import { BUTTON_THEME, convertDateFormat, formatString, ROLE_LIST, STATUS_LIST } from '@app/shared'
import HR from '@components/HR'
import { useAppealDetail, useOperatorApprove } from '@modules/applications/hooks'
import { useAppContext } from '@app/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
// import UseConfirmApplication from "@modules/appeals/hooks/useConfirmApplication.ts";
import { Link } from "@radix-ui/themes";
import { Column } from "react-table";
import { IPerformer } from "@app/interfaces";
import { useEffect, useMemo, useState } from "react";
import UseConfirmApplication from "@modules/applications/hooks/useConfirmApplication.ts";
import UseConfirmByPerformerApplication from "@modules/applications/hooks/useConfirmPerformerApplication.ts";
import UseConfirmByHavzaApplication from "@modules/applications/hooks/useConfirmHavzaApplication.ts";
import { Modal } from "@components/UI";
import DatePicker from '@components/UI/DatePicker'
import { useForm, FormProvider } from "react-hook-form";

const Index = () => {

	const { data, isPending } = useAppealDetail();
	const { user } = useAppContext();
	const navigate = useNavigate();

	const { confirmApplication } = UseConfirmApplication()
	const { isPending: isOperatorApprovePending, operatorApproveAppeal } = useOperatorApprove()
	const [totalBall, setTotalBall] = useState(0)

	useEffect(() => {
		if (!data) return
		const totalBall = data.investment_ability_ball + data.region_by_ball + data.experience_ball + data.techniques_ball
			+ data.stability_rating_ball + data.success_projects_ball + data.return_on_investment_ball
		setTotalBall(totalBall)
	}, [data]);

	// const ConfirmApplication = async  () => {
	// 	confirmApplication()
	// }

	const { t } = useTranslation();

	const [performerRejectText, setPerformerRejectText] = useState('')
	const columns: Column<IPerformer>[] = useMemo(
		() => [
			{
				Header: t('performer'),
				accessor: row => row.performer.full_name
			},
			{
				Header: t('deadline'),
				accessor: row => row.deadline
			},
			{
				Header: t('status'),
				accessor: row => (<Status status={row.status} />)
			},
			{
				Header: t('evalution_status'),
				accessor: row => {
					if (row.evaluation_status) {
						return <Status status={'accepted'} />
					} else if (row.evaluation_status !== null && typeof row.evaluation_status === 'boolean') {
						return <Status status={'rejected'} />
					}

				}
			},
			{
				Header: t('evaluation_file'),
				accessor: row => {
					if (row.evaluation_file) {
						return <Link href={row.evaluation_file} className={'text-blue-600 hover:underline'}>{t('Addition')}</Link>
					} else {
						return '-'
					}

				}
			},
			{
				Header: t('evaluation_text'),
				accessor: row => {
					if (row.evaluation_text) {
						return <Button mini onClick={() => setPerformerRejectText(row.evaluation_text)}>{t('show')}</Button>
					}
				}
			},

		], [t, data, data?.performers]
	)

	const { confirmByPerformer } = UseConfirmByPerformerApplication()
	const { confirmByHavzaApplication } = UseConfirmByHavzaApplication()


	const IsReadyToConcept = data && data.confirmation_documents.length > 0 && data.evaluation_confirmation_documents

	const IsReadyToConfirmDocumentApplicationEvolution =
		data && data.evaluation_confirmation_documents === null &&
		data.confirmation_documents.length > 0;


	const [confirmPerformer, setConfirmPerformer] = useState<IPerformer>();

	const [confirmedByPerformers, setConfirmedByPerformers] = useState<boolean>();

	useEffect(() => {
		if (!data) return
		if (!data.performers?.length) return;

		const performer = data.performers.find((item) => item.performer.id === user.id)

		if (performer) {
			setConfirmPerformer(performer)
		}

		const allFieldsTrue = data.performers.every(item =>
			item.status === 'completed'
		);

		setConfirmedByPerformers(allFieldsTrue)
	}, [data]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const methods = useForm();

	return (
		<PageLayout>
			<PageTitle title="Announcement" />
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit((data) => console.log(data))}>
					<div className=''>

						<Wrapper>
							<div className=''>
								<div className="flex justify-between gap--5xl items-center">
									<div className='flex justify-between w-[60%]'>
										{/* 1-chi DatePicker */}
										<DatePicker
											value={startDate}
											onChange={(date) => setStartDate(date)}
											placeholder="Boshlanish sanasi"
											minDate={new Date(2020, 0, 1)}
											maxDate={new Date(2030, 11, 31)}
										/>

										{/* 2-chi DatePicker */}
										<DatePicker
											value={endDate}
											onChange={(date) => setEndDate(date)}
											placeholder="Tugash sanasi"
											minDate={new Date(2020, 0, 1)}
											maxDate={new Date(2030, 11, 31)}
										/>
									</div>

									{/* 3-chi bo‘sh joy */}
									<div className="flex-1"></div>
								</div>
							</div>

							<HR />
							<div className="grid grid--cols  gap--lg">
								<div className='border rounded-2xl'>
									<Row label="Applicant's last name" value={data?.lastname} />
									<Row label="Applicant's first name" value={data?.firstname} background />
									<Row label="Applicant's middle name" value={data?.middle_name} />
									<Row label="Applicant ID or Tax ID number" value={data?.pinfl} background />
									<Row label="passport_seria" value={data?.passport_seria} />
									<Row label="passport_number" value={data?.passport_number} />
									{/*<Row label="Organization name" value={data?.balance_organization}/>*/}
									<Row label="Address" value={data?.address} />
									{
										data?.region ?
											<Row label="Region" value={data?.region?.label} />
											: null
									}

								</div>
							</div>
							<HR />
							<HR />
							<div className='flex flex-col items-start'>
								<div className='w-full'>
									<Row
										label="Эълон мазмуни"
										value="Вилоят қишлоқ ва сув хўжалиги бошқармаси ва марказий диспетчер билан телефон ҳамда радио алоқа"
									/>
								</div>
							</div>




						</Wrapper>
					</div>
					<button type="submit">Submit</button>
				</form>
			</FormProvider>
		</PageLayout>
	)
}

export default Index
