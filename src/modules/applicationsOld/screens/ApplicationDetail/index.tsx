import {
	Button,
	FileUpLoader,
	GridWrapper, Modal,
	PageLayout,
	PageTitle,
	Restricted,
	Row, ShowIf,
	Status,
	Tag,
	Wrapper
} from '@app/components'
// import {ICertificate} from '@app/interfaces'
import {
	BUTTON_THEME,
	convertDateFormat,
	FIELD,
	formatString,
	formatToMillion,
	// getFileBase64,
	getMonthInRussian,
	getTodayAsString,
	ROLE_LIST,
	// showMessage,
	STATUS_LIST
} from '@app/shared'
import HR from '@components/HR'
import {useAppContext} from '@app/hooks'
// import {useChallenge} from '@modules/authentication/hooks'
// import SIGNATURE from '@modules/authentication/signature/Eimzo.js'
import {useNavigate} from 'react-router-dom'
import {useApplicationDetail, useApplicationFileGenerate, useApplicationFileUpdate} from '@modules/applicationsOld/hooks'
import {useApprove, useOperatorApprove} from '@modules/applications/hooks'
import {useTranslation} from 'react-i18next'
import {useState} from 'react'
import styles from '@modules/applications/screens/AddAppeal/styles.module.scss'
// import Script from '@modules/authentication/signature/e-imzo.js?raw'


const Index = () => {
	const {data} = useApplicationDetail()
	const {user} = useAppContext()
	// const Client = useMemo(() => new SIGNATURE(), [])
	const [modal, setModal] = useState<string | undefined>(undefined)
	const [file, setFile] = useState<number | undefined>(undefined)
	const {isPending, approveAppealAsync, approveAppeal} = useApprove(true)
	const navigate = useNavigate()
	const {t} = useTranslation()
	const {isPending: isOperatorApprovePending, operatorApproveAppeal} = useOperatorApprove(true)
	// const [isScriptLoaded, setIsScriptLoaded] = useState(false)

	// useEffect(() => {
	// 	const scriptContent = Script
	// 	const script = document.createElement('script')
	// 	script.type = 'text/javascript'
	// 	script.id = 'signature-script'
	// 	script.text = scriptContent
	// 	document.head.appendChild(script)
	// 	setIsScriptLoaded(true)
	//
	// 	script.onerror = () => {
	// 		showMessage('Error loading E-IMZO script', 'error')
	// 	}
	// 	return () => {
	// 		document.head.removeChild(script)
	// 	}
	// }, [])

	const handleCloseModal = () => {
		setModal(undefined)
		setFile(undefined)
	}


	// const {handleChallenge, isPending: isChallengePending} = useChallenge('timestamp')


	const {isPending: isGeneratingFile, generateFile} = useApplicationFileGenerate()
	const {isPending: isUpdateFile, editApplicationFiles} = useApplicationFileUpdate()

	// const handleLoadKey = (data: { signature: ICertificate | undefined }) => {
	// 	Client
	// 		.loadKey(data?.signature as unknown as ICertificate)
	// 		.then((res: { id: string }) => {
	// 			Client.createPkcs7(res.id, 'imzo fayl')
	// 				.then((pkcs7: string) => {
	// 					handleChallenge({pkcs7})
	// 						.then(({pkcs7b64, ...data}) => {
	// 								if (data?.status === 1) {
	// 									console.log(pkcs7b64)
	// 									// verify(pkcs7b64, true, 'imzo fayl').then(res=>console.log(res))
	// 								} else {
	// 									showMessage('Oops! An error occurred. Please try again later.', 'error')
	// 								}
	// 							}
	// 						)
	// 				})
	// 				.catch(() => showMessage('Oops! An error occurred. Please try again later.', 'error'))
	// 		})
	// 		.catch(() => {
	// 			showMessage('Check if the key password is entered correctly', 'error')
	// 		})
	// }


	return (
		<PageLayout>
			<PageTitle title="Application">
				<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
					<Button onClick={() => navigate(`/appeals/${data?.appeal?.id}`)}>
						View the appeal
					</Button>
				</Restricted>
			</PageTitle>
			<Wrapper>
				<div className="flex gap--5xl items-center">
					<Tag title="Application status">
						{
							data?.status &&
							<Status status={data.status}/>
						}
					</Tag>
					<ShowIf show={[ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role)}>
						<Tag title="MOF conclusion">
							<Status status={data?.answer_type ?? STATUS_LIST.INCOMPLETE}/>
						</Tag>
						<Tag title="Application type">
							{
								data?.type &&
								<Status status={data.type}/>
							}
						</Tag>
					</ShowIf>
					<Tag title="Date" string>
						{convertDateFormat(data?.created_at)}
					</Tag>
				</div>
				<HR/>
				<div className="grid grid--cols-2 gap--lg">
					<GridWrapper>
						<Row label="Project name" value={data?.project_name}/>
						<Row label="Amount (in sum)" value={data?.cost} background/>
					</GridWrapper>
					<GridWrapper>
						<Row label="Duration (from)" value={data?.from_date ? `${data?.from_date} ${t('year')}` : ''}/>
						<Row
							label="Duration (to)" value={data?.to_date ? `${data?.to_date} ${t('year')}` : ''}
							background
						/>
					</GridWrapper>
				</div>
				<HR/>
				<Restricted permittedRole={[ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE]}>
					<div className="grid grid--cols-2  gap--lg">
						<GridWrapper>
							<Row label="Applicant's last name" value={data?.appeal?.lastname}/>
							<Row label="Applicant's first name" value={data?.appeal?.firstname} background/>
							<Row label="Applicant's middle name" value={data?.appeal?.patronymic}/>
							<Row label="Applicant ID or Tax ID number" value={data?.appeal?.id_number} background/>
							<Row label="Region" value={data?.appeal?.region?.label}/>
							<Row label="Address" value={data?.appeal?.address} background/>
							<Row label="Organization name" value={data?.appeal?.organization}/>
						</GridWrapper>
						<GridWrapper>
							<Row label="Taxpayer Identification Number (TIN)" value={data?.appeal?.inn_number}
							     background/>
							<Row label="Bank account number" value={data?.appeal?.bank_account}/>
							<Row label="Phone number" value={data?.appeal?.phone} background/>
							<Row label="Email address" value={data?.appeal?.email}/>
							<Row label="Balance holding organization" value={data?.appeal?.owner_organization?.label}
							     background/>
							<Row label="WMF type" value={formatString(data?.appeal?.object_types)}/>
							<Row label="Objects" value={formatString(data?.appeal?.sxo_objects)} background/>
						</GridWrapper>
					</div>
					<HR/>
				</Restricted>
				<Tag title="Documents" type="vertical">
					<div className="grid grid--cols-3 gap--lg">
						{
							data?.files?.map((file) => {
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
				<HR/>
				<Tag title="Application content" string type="vertical">
					{data?.description ?? ''}
				</Tag>
				{
					data?.status && data?.answers?.length > 0 &&
					<>
						<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
							<ShowIf
								show={data?.status === STATUS_LIST.RETURNED}
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
						<Restricted permittedRole={[ROLE_LIST.FINANCE_EMPLOYEE, ROLE_LIST.HEAD]}>
							<ShowIf
								show={
									data?.status === STATUS_LIST.RESPONSE_IN_PROGRESS ||
									data?.answer_status === STATUS_LIST.IN_PROGRESS
								}
							>
								<Tag
									title={data?.status === STATUS_LIST.RETURNED ? 'Reason for return' : 'Reply letter'}
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
						</Restricted>
						<ShowIf
							show={
								data?.status === STATUS_LIST.APPROVED ||
								data?.status === STATUS_LIST.REJECTED
							}
						>
							<Tag
								title={data?.status === STATUS_LIST.RETURNED ? 'Reason for return' : 'Reply letter'}
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
					</>

				}
				<Restricted permittedRole={[ROLE_LIST.OPERATOR, ROLE_LIST.FINANCE_EMPLOYEE]}>
					<ShowIf
						show={!!data?.sxo_files?.length && data?.status === STATUS_LIST.SENT_TO_MOF}
					>
						<Tag title="Documents sent to the Ministry of Finance" type="vertical">
							<div className="grid grid--cols-3 gap--lg">
								{
									data?.sxo_files?.map((file) => {
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
				<Restricted permittedRole={[ROLE_LIST.OPERATOR]}>
					<ShowIf
						show={data?.status === STATUS_LIST.RESPONSE_IN_PROGRESS}
					>
						<Tag
							title={data?.status === STATUS_LIST.RETURNED ? 'Reason for return' : 'Reply letter'}
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
				</Restricted>
			</Wrapper>
			<div className="flex gap--lg items-center justify-between">
				<Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
					Back
				</Button>
				<Restricted permittedRole={[ROLE_LIST.OPERATOR]}>
					<ShowIf
						show={
							data?.status === STATUS_LIST.NEW ||
							(
								data?.answer_status === STATUS_LIST.RETURNED &&
								data?.status === STATUS_LIST.SENT_TO_MOF
							)
						}
					>
						<div className="flex gap--lg items-center justify-between">
							<Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
								Return
							</Button>
							<Button onClick={() => navigate('sent')} theme={BUTTON_THEME.PRIMARY}>
								Send the application to MOF
							</Button>
						</div>
					</ShowIf>
					<ShowIf
						show={
							data?.status === STATUS_LIST.RESPONSE_IN_PROGRESS &&
							(
								data?.answer_status === STATUS_LIST.REJECTED ||
								data?.answer_status === STATUS_LIST.APPROVED
							)
						}
					>
						<div className="flex gap--lg items-center justify-between">
							<Button
								onClick={() => operatorApproveAppeal()}
								theme={BUTTON_THEME.PRIMARY}
								disabled={isOperatorApprovePending}
							>
								Send reply letter
							</Button>
						</div>
					</ShowIf>
				</Restricted>
				<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
					<ShowIf show={data?.status === STATUS_LIST.RETURNED}>
						<Button onClick={() => navigate('edit')} theme={BUTTON_THEME.PRIMARY}>
							Edit
						</Button>
					</ShowIf>
				</Restricted>
				<Restricted permittedRole={[ROLE_LIST.FINANCE_EMPLOYEE]}>
					<ShowIf
						show={data?.status === STATUS_LIST.SENT_TO_MOF && !data?.answer_status}
					>
						<div className="flex gap--lg items-center justify-between">
							<Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
								Return
							</Button>
							<Button onClick={() => navigate('reply')} theme={BUTTON_THEME.PRIMARY}>
								Send conclusion
							</Button>
						</div>
					</ShowIf>
				</Restricted>
				<Restricted permittedRole={[ROLE_LIST.HEAD]}>
					<ShowIf
						show={data?.status === STATUS_LIST.RESPONSE_IN_PROGRESS && data?.answer_status === STATUS_LIST.IN_PROGRESS}>
						<div className="flex gap--lg items-center justify-between">
							<Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
								Cancel
							</Button>
							{
								data?.answer_type !== STATUS_LIST.NEGATIVE ?
									<Button
										onClick={
											() => generateFile({
												day: getTodayAsString(),
												month: getMonthInRussian(),
												project_cost: formatToMillion(data?.cost) ?? '',
												fullName: `${data?.appeal.firstname?.[0]}. ${data?.appeal?.lastname}`,
												from_date: data?.from_date as unknown as string ?? '',
												to_date: data?.to_date as unknown as string ?? '',
												bank_account: data?.appeal?.bank_account,
												company_name: data?.appeal?.organization ?? '',
												object_name: formatString(data?.appeal.sxo_objects),
												object_region: data?.appeal?.sxo_region?.label as string ?? '',
												object_type: formatString(data?.appeal.object_types),
												mfo: `1011`
											}).then(data => {
												setModal(data?.file_path)
												setFile(data?.attachment)
											})
										}
										theme={BUTTON_THEME.PRIMARY}
										disabled={isGeneratingFile}
									>
										Generate contract
									</Button> :
									<Button onClick={() => approveAppeal()} theme={BUTTON_THEME.PRIMARY}
									        disabled={isPending}>
										Confirm
									</Button>
							}
						</div>
					</ShowIf>
				</Restricted>
			</div>

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
						data={modal ?? ''}
						type="application/pdf"
					/>
				</div>
				<div className="flex gap--lg items-center justify-end">
					<Button
						type={FIELD.BUTTON}
						onClick={
							() => editApplicationFiles(
								{
									data: file ?? '',
									id: data?.answers?.[data?.answers?.length - 1]?.id ?? ''
								}
							).then(() => {
								approveAppealAsync()
									.then(() => {
										setFile(undefined)
										setModal(undefined)
										navigate(-1)
									})
							})
						}
						theme={BUTTON_THEME.PRIMARY}
						disabled={isPending || isUpdateFile}
					>
						Submit
					</Button>
				</div>
			</Modal>
		</PageLayout>
	)
}

export default Index
