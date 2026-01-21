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
import {BUTTON_THEME, convertDateFormat, formatString, ROLE_LIST, STATUS_LIST} from '@app/shared'
import HR from '@components/HR'
import {useAppealDetail, useOperatorApprove} from '@modules/applications/hooks'
import {useAppContext} from '@app/hooks'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from "react-i18next";
// import UseConfirmApplication from "@modules/appeals/hooks/useConfirmApplication.ts";
import {Link} from "@radix-ui/themes";
import {Column} from "react-table";
import {IPerformer} from "@app/interfaces";
import {useEffect, useMemo, useState} from "react";
import UseConfirmApplication from "@modules/applications/hooks/useConfirmApplication.ts";
import UseConfirmByPerformerApplication from "@modules/applications/hooks/useConfirmPerformerApplication.ts";
import UseConfirmByHavzaApplication from "@modules/applications/hooks/useConfirmHavzaApplication.ts";
import {Modal} from "@components/UI";


const Index = () => {

	const {data, isPending} = useAppealDetail();
	const {user} = useAppContext();
	const navigate = useNavigate();

	const {confirmApplication} = UseConfirmApplication()
	const {isPending: isOperatorApprovePending, operatorApproveAppeal} = useOperatorApprove()
	const [totalBall, setTotalBall] = useState(0)

	useEffect(() => {
		if(!data) return
		const totalBall = data.investment_ability_ball + data.region_by_ball + data.experience_ball + data.techniques_ball
		+ data.stability_rating_ball + data.success_projects_ball + data.return_on_investment_ball
		setTotalBall(totalBall)
	}, [data]);

	// const ConfirmApplication = async  () => {
	// 	confirmApplication()
	// }

	const {t} = useTranslation();

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
				accessor: row => (<Status status={row.status}/>)
			},
			{
				Header: t('evalution_status'),
				accessor: row => {
					if(row.evaluation_status){
						return <Status status={'accepted'}/>
					}else if(row.evaluation_status !== null && typeof row.evaluation_status === 'boolean'){
						return <Status status={'rejected'}/>
					}

				}
			},
			{
				Header: t('evaluation_file'),
				accessor: row => {
					if(row.evaluation_file){
						return <Link href={row.evaluation_file} className={'text-blue-600 hover:underline'}>{t('Addition')}</Link>
					}else{
						return '-'
					}

				}
			},
			{
				Header: t('evaluation_text'),
				accessor: row => {
					if(row.evaluation_text){
						return <Button mini onClick={()=>setPerformerRejectText(row.evaluation_text)}>{t('show')}</Button>
					}
				}
			},

		], [t, data, data?.performers]
	)

	const {confirmByPerformer} = UseConfirmByPerformerApplication()
	const {confirmByHavzaApplication} = UseConfirmByHavzaApplication()


	const IsReadyToConcept = data && data.confirmation_documents.length > 0 && data.evaluation_confirmation_documents

	const IsReadyToConfirmDocumentApplicationEvolution =
		data && data.evaluation_confirmation_documents === null &&
		data.confirmation_documents.length > 0;


	const [confirmPerformer, setConfirmPerformer] = useState<IPerformer>();

	const [confirmedByPerformers, setConfirmedByPerformers] = useState<boolean>();

	useEffect(() => {
		if(!data) return
		if(!data.performers?.length) return;

		const performer = data.performers.find((item)=> item.performer.id === user.id)

		if(performer){
			setConfirmPerformer(performer)
		}

		const allFieldsTrue  = data.performers.every(item =>
			item.status === 'completed'
		);

		setConfirmedByPerformers(allFieldsTrue)
	}, [data]);


	return (
		<PageLayout>
			<PageTitle title="Appeal"/>
			<Wrapper>
				<div className="flex gap--5xl items-center">
					<Tag title="Request status">
						{
							data?.status &&
							<Status status={data.status}/>
						}
					</Tag>

					{
						[ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role) &&
						<>
							<Tag title="Reply letter">
								{
									<Status status={data?.answer_type ?? STATUS_LIST.INCOMPLETE}/>
								}
							</Tag>
							<Tag title="Type of request">
								{
									data?.type &&
									<Status status={data.type}/>
								}
							</Tag>
						</>
					}
					<Tag title="Date" string>
						{convertDateFormat(data?.created_at)}
					</Tag>
					<Tag title="WMF area" string>
						{data?.sxo_region?.label ?? ''}
					</Tag>
				</div>
				<HR/>
				<div className="grid grid--cols-2  gap--lg">
					<GridWrapper>
						<Row label="Applicant's last name" value={data?.lastname}/>
						<Row label="Applicant's first name" value={data?.firstname} background/>
						<Row label="Applicant's middle name" value={data?.middle_name}/>
						<Row label="Applicant ID or Tax ID number" value={data?.pinfl} background/>
						<Row label="passport_seria" value={data?.passport_seria}/>
						<Row label="passport_number" value={data?.passport_number}/>
						{/*<Row label="Organization name" value={data?.balance_organization}/>*/}
						<Row label="Address" value={data?.address}/>
						{
							data?.region ?
								<Row label="Region" value={data?.region?.label}/>
								: null
						}
					</GridWrapper>
					<GridWrapper>
						<Row label="Taxpayer Identification Number (TIN)" value={data?.stir} background/>
						{/*<Row label="Bank account number" value={data?.bank_account}/>*/}
						<Row label="Email address" value={data?.email}/>
						<Row label="Phone number" value={data?.phone} background/>
						<Row label="Balance holding organization" value={data?.balance_organization?.name} background/>
						{/*<Row label="WMF type" value={formatString(data?.object_types)}/>*/}
						<Row label="WMF type" value={data?.object_type?.name}/>
						<Row label="Objects"
							 value={formatString(data?.object?.map(i => ({value: i?.name, label: i?.name})) || [])}
							 background/>
					</GridWrapper>
				</div>
				<HR/>
				<div className="grid grid--cols-2  gap--lg">
					<GridWrapper>
						<Row label="appeals.successful_projects_text" value={data?.success_projects} background/>
						<Row label="applications.investment_ability_ball" value={data?.investment_ability_ball}/>
						<Row label="applications.experience_ball" value={data?.experience_ball}/>
						<Row label="appeals.project_financing_opportunity" value={data?.financing_opportunity}
							 background/>
						{
							data?.return_on_investment ?
								<Row label="Kiritilgan investitsiyani qaytarmaslik sharti" value={t('Yes')} background/>
								:
								<Row label="Kiritilgan investitsiyani qaytarmaslik sharti" value={t('No')} background/>
						}
					</GridWrapper>
					<GridWrapper>
						<Row label="applications.techniques_ball" value={data?.techniques_ball} background/>
						<Row label="applications.stability_rating_ball" value={data?.stability_rating_ball}/>
						<Row label="applications.success_projects_ball" value={data?.success_projects_ball} background/>
						<Row label="applications.return_on_investment_ball" value={data?.return_on_investment_ball}/>
						<Row label="applications.region_by_ball" value={data?.region_by_ball}/>
						<Row label="applications.total_ball" value={totalBall}/>
					</GridWrapper>
					<GridWrapper>
						<Row label="applications.application_content" value={data?.body} background/>
					</GridWrapper>
				</div>

				<HR/>

				<div className={'mb-5'}>
					<h2 className={'font-semibold text-gray-400 mb-3'}>{t('applications.balance_organization_relationship')}</h2>

					{
						data && data?.object_evaluation_balance_organization === null ?
							<div>
								not selected
							</div>
							: typeof data?.object_evaluation_balance_organization === 'boolean' && data?.object_evaluation_balance_organization ?
								<div
									className={'bg-red-100 rounded-[50px] px-5 py-2 max-w-[200px] text-center text-red-500 font-semibold'}>
									{t('applications.object_is_occupied')}
								</div>
								: typeof data?.object_evaluation_balance_organization === 'boolean' && !data.object_evaluation_balance_organization ?
									<div
										className={'bg-green-100  rounded-[50px] px-5 py-2 max-w-[200px] text-center text-green-700 font-semibold'}>
										{t('applications.object_is_not_occupied')}
									</div>
									: null
					}
					{
						data?.object_evaluation_balance_organization_text ?
							<div className={'pt-5'}>
								<div className={'font-semibold text-gray-400 mb-3'}>Band munosobati:</div>
								<div>
									{data.object_evaluation_balance_organization_text}
								</div>
							</div>
							: null
					}
					{
						data?.rejection_file ?
							<div className={'pt-5 flex justify-between max-w-[300px]'}>
								<div className={'font-semibold text-gray-400 mb-3'}>Reject file:</div>
								<div>
									<Link className={'text-blue-400'}
										  href={data.rejection_file}>{t('applications.rejection_file')}</Link>
								</div>
							</div>
							: null
					}
				</div>

				<HR/>


				<div className="grid grid-cols-12 gap-5">
					<div className="col-span-6 mb-5">
						<div className={'flex item-center justify-between border-b pb-1 mb-5'}>
							<div className={'text-gray-400 font-semibold'}>
								{t('applications.indebtedness_file')}:
							</div>
							<div className={'text-black font-bold pl-3'}>
								{
									data && data.indebtedness_file && data.indebtedness_file.file ?
										<Link className={'text-blue-400'}
											  href={data.indebtedness_file.file}>{data.indebtedness_file.name}</Link>
										: null
								}
							</div>
						</div>
						<div className={'flex item-center justify-between border-b pb-1 mb-5'}>
							<div className={'text-gray-400 font-semibold'}>
								{t('applications.success_projects_file')}:
							</div>
							<div className={'text-black font-bold pl-3'}>
								{
									data && data.success_projects_file && data.success_projects_file.file ?
										<Link className={'text-blue-400'}
											  href={data.success_projects_file.file}>{data.success_projects_file.name}</Link>
										: null
								}
							</div>
						</div>
						<div className={'flex item-center justify-between border-b pb-1'}>
							<div className={'text-gray-400 font-semibold'}>
								{t('applications.file')}:
							</div>
							<div className={'text-black font-bold pl-3'}>
								{
									data && data.file ?
										<Link className={'text-blue-400'}
											  href={data.file}>{t('applications.file')}</Link>
										: null
								}
							</div>
						</div>
					</div>

				</div>

				{
					data && data.confirmation_documents.length > 0 ?
						<div className="grid grid-cols-12 gap-4">
							<div className="col-span-12">
								<h2 className={'text-gray-400 font-semibold'}>Obyet ma'lumotlari</h2>
							</div>
							{
								data.confirmation_documents.map((item) => {
									return (

										<div className="col-span-6 col-start-1" key={item.id}>
											<div className={'flex item-center justify-between border-b'}>
												<div className={'text-black font-bold pl-3'}>
													{
														data && data.indebtedness_file && data.indebtedness_file.file ?
															<Link className={'text-blue-400'}
																  href={item.attachment.file}>{item.attachment.name}</Link>
															: null
													}
												</div>
											</div>
										</div>
								)
								})
							}

						</div>
						: null
				}


				<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
					<h2 className={'text-gray-400 font-semibold'}>Performers list</h2>
					{
						data?.performers && data.performers.length ?
							<div className="grid grid--cols-12 gap-4">
								<Table
									isLoading={isPending}
									columns={columns}
									data={data.performers}
									screen={true}
									pagination={false}
								/>
							</div>
							:
							<div>Performs list is empty</div>
					}
					<Modal
						animation={'fade'}
						visible={!!performerRejectText}
						onClose={()=>setPerformerRejectText('')}
						title={'evolution_text'}
					>
						<div>
							{performerRejectText}
						</div>
					</Modal>
				</Restricted>


				<div className="flex gap--lg items-center justify-between">
					<Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
						Back
					</Button>

					<Restricted permittedRole={[ROLE_LIST.BALANCE]}>
						<div className={'flex justify-end'}>
							<ShowIf
								show={
									data?.status === STATUS_LIST.NEW || data?.status === STATUS_LIST.IN_PROCES
									&& data?.object_evaluation_balance_organization === null
								}
							>
								<div className="flex gap--lg items-center mr-3">
									{/*<Button onClick={() => navigate('reject')} theme={BUTTON_THEME.DANGER_OUTLINE}>*/}
									{/*	Return*/}
									{/*</Button>*/}

									<Button onClick={() => navigate('balance-organization')}
											theme={BUTTON_THEME.PRIMARY}
									>
										set_balance_organization
									</Button>

								</div>
							</ShowIf>


							<ShowIf
								show={
									data?.object_evaluation_balance_organization !== null && !data?.confirmation_documents.length
								}
							>
								<Button onClick={() => navigate('balance-object-info')} theme={BUTTON_THEME.PRIMARY}>
									ballance_object_info
								</Button>
							</ShowIf>


							<ShowIf
								show={
									data?.status === STATUS_LIST.IN_PROCES &&
									data?.answer_status === STATUS_LIST.APPROVED
								}
							>
								<div className="flex gap--lg items-center">
									<Button
										onClick={() => operatorApproveAppeal()}
										theme={BUTTON_THEME.PRIMARY}
										disabled={isOperatorApprovePending}
									>
										Send reply letter
									</Button>
								</div>
							</ShowIf>
						</div>
					</Restricted>



				<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
						<ShowIf
							show={
								data?.status === STATUS_LIST.IN_PROCES
							}
						>
							<div className="flex gap--lg items-center">

								<Button onClick={() => navigate('reject')} theme={BUTTON_THEME.DANGER_OUTLINE}>
									Return
								</Button>

								{
									data && !data.performers?.length ?
										<Button onClick={() => navigate(`/applications/${data?.id}/responsibility`)}
												theme={BUTTON_THEME.PRIMARY}>
											Set Responsibility
										</Button>
										: null
								}

								{
									confirmedByPerformers ?
										<Button onClick={() => confirmApplication()} theme={BUTTON_THEME.PRIMARY}>
											Confirm
										</Button>
										:
										null
								}
							</div>
						</ShowIf>
					</Restricted>

					<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_X]}>
						<ShowIf
							show={
								data?.status === STATUS_LIST.ACCEPTED || data?.status === STATUS_LIST.IN_PROCES
							}
						>
							<div className="flex gap--lg items-center">
								{
									!confirmPerformer?.evaluation_status && confirmPerformer?.status === 'completed' ?
										<Button theme={BUTTON_THEME.DANGER_OUTLINE}>
											Returned
										</Button>
										:
										confirmPerformer?.status !== 'completed' ?
											<Button theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject-performer')}>
												Return
											</Button>
										: null
								}


								{
									confirmPerformer?.evaluation_status  && confirmPerformer?.status === 'completed' ?
										<Button theme={BUTTON_THEME.GREEN}>
											Confirmed
										</Button>
									:
										confirmPerformer?.status !== 'completed' ?
										<Button onClick={() => confirmByPerformer()} theme={BUTTON_THEME.PRIMARY}>
											Confirm
										</Button>
									: null

								}

							</div>
						</ShowIf>
					</Restricted>


					<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
						<ShowIf
							show={
								!!IsReadyToConcept
							}
						>
							<div className="flex gap--lg items-center">
								<Button onClick={() => navigate('set-object-concept')} theme={BUTTON_THEME.PRIMARY}>
									set_object_concept
								</Button>
							</div>
						</ShowIf>
					</Restricted>

					<Restricted permittedRole={[ROLE_LIST.BASIN_B_B]}>
						<ShowIf
							show={
								!!IsReadyToConfirmDocumentApplicationEvolution
							}
						>
							<div className="flex gap--lg items-center">
								<Button onClick={() => confirmByHavzaApplication(false)}
										theme={BUTTON_THEME.DANGER_OUTLINE}>
									Return
								</Button>
								<Button onClick={() => confirmByHavzaApplication(true)} theme={BUTTON_THEME.PRIMARY}>
									Confirm
								</Button>
							</div>
						</ShowIf>
					</Restricted>


					{/*<Restricted permittedRole={[ROLE_LIST.OPERATOR]}>*/}
					{/*	<ShowIf*/}
					{/*		show={*/}
					{/*			data?.status === STATUS_LIST.NEW ||*/}
					{/*			(*/}
					{/*				data?.answer_status === STATUS_LIST.RETURNED &&*/}
					{/*				data?.status === STATUS_LIST.IN_PROCES*/}
					{/*			)*/}
					{/*		}*/}
					{/*	>*/}
					{/*		<div className="flex gap--lg items-center">*/}
					{/*			<Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>*/}
					{/*				Return*/}
					{/*			</Button>*/}
					{/*			<Button onClick={() => navigate('reply')} theme={BUTTON_THEME.PRIMARY}>*/}
					{/*				Send reply letter*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</ShowIf>*/}
					{/*	<ShowIf*/}
					{/*		show={*/}
					{/*			data?.status === STATUS_LIST.IN_PROCES &&*/}
					{/*			data?.answer_status === STATUS_LIST.APPROVED*/}
					{/*		}*/}
					{/*	>*/}
					{/*		<div className="flex gap--lg items-center">*/}
					{/*			<Button*/}
					{/*				onClick={() => operatorApproveAppeal()}*/}
					{/*				theme={BUTTON_THEME.PRIMARY}*/}
					{/*				disabled={isOperatorApprovePending}*/}
					{/*			>*/}
					{/*				Send reply letter*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</ShowIf>*/}
					{/*</Restricted>*/}

					{/*<Restricted permittedRole={[ROLE_LIST.HEAD]}>*/}
					{/*	<ShowIf*/}
					{/*		show={*/}
					{/*			data?.status === STATUS_LIST.IN_PROCES &&*/}
					{/*			data?.answer_status === STATUS_LIST.IN_PROGRESS*/}
					{/*		}*/}
					{/*	>*/}
					{/*		<div className="flex gap--lg items-center">*/}
					{/*			<Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>*/}
					{/*				Return*/}
					{/*			</Button>*/}
					{/*			<Button onClick={() => approveAppeal()} theme={BUTTON_THEME.PRIMARY}*/}
					{/*					disabled={isPending}>*/}
					{/*				Confirm*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</ShowIf>*/}
					{/*</Restricted>*/}
					{/*<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>*/}
					{/*	<ShowIf show={data?.status === STATUS_LIST.RETURNED}>*/}
					{/*		<div className="flex gap--lg items-center">*/}
					{/*			<Button onClick={() => navigate('edit')} theme={BUTTON_THEME.PRIMARY}>*/}
					{/*				Edit*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</ShowIf>*/}
					{/*	<ShowIf show={data?.status === STATUS_LIST.APPROVED}>*/}
					{/*		<div className="flex gap--lg items-center">*/}
					{/*			<Button onClick={() => navigate(`/applications/${id}/add`)}*/}
					{/*					theme={BUTTON_THEME.PRIMARY}>*/}
					{/*				Submit application*/}
					{/*			</Button>*/}
					{/*		</div>*/}
					{/*	</ShowIf>*/}
					{/*</Restricted>*/}
				</div>


				{
					data?.status && data?.answers?.length > 0 &&
					<>
						<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
							<ShowIf
								show={
									data?.status === STATUS_LIST.RETURNED ||
									data?.status === STATUS_LIST.APPROVED ||
									data?.status === STATUS_LIST.REJECTED
								}
							>
								<Tag
									title={data?.status === STATUS_LIST.RETURNED ? 'Reason for return' : 'Reply letter'}
									string
									type="vertical">
									{data?.answers?.[data?.answers?.length - 1]?.text ?? ''}
								</Tag>
								<Tag title="Documents" type="vertical">
									<div className="grid grid--cols-3 gap--lg">
										{
											data?.answers?.[data?.answers?.length - 1]?.files?.map((file) => {
												return (
													<FileUpLoader
														key={file.id}
														value={file}
														id={file.id as string}
													/>
												)
											})
										}
									</div>
								</Tag>
							</ShowIf>
						</Restricted>


						<Restricted permittedRole={[ROLE_LIST.HEAD, ROLE_LIST.OPERATOR]}>
							<ShowIf
								show={
									data?.status === STATUS_LIST.IN_PROCES ||
									data?.status === STATUS_LIST.APPROVED ||
									data?.status === STATUS_LIST.REJECTED
								}
							>
								<Tag
									title="Reply letter"
									string
									type="vertical"
								>
									{data?.answers?.[data?.answers?.length - 1]?.text ?? ''}
								</Tag>
								<Tag title="Documents" type="vertical">
									<div className="grid grid--cols-3 gap--lg">
										{
											data?.answers?.[data?.answers?.length - 1]?.files?.map((file) => {
												return (
													<FileUpLoader
														key={file.id}
														value={file}
														id={file.id as string}
													/>
												)
											})
										}
									</div>
								</Tag>
							</ShowIf>
							<ShowIf
								show={
									data?.answer_status === STATUS_LIST.RETURNED && data?.status === STATUS_LIST.IN_PROCES
								}
							>
								<Tag
									title="Manager's return comment"
									string
									type="vertical"
								>
									{data?.answers?.[data?.answers?.length - 1]?.note ?? ''}
								</Tag>
							</ShowIf>
						</Restricted>
					</>
				}
			</Wrapper>


		</PageLayout>
	)
}

export default Index
