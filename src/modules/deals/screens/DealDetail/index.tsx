import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
	Button,
	FileUpLoaderView,
	PageLayout,
	PageTitle,
	Tag,
	Wrapper,
	Row,
	GridWrapper,
	Restricted,
	ShowIf,
	Table,
	Status
} from '@app/components'
import { BUTTON_THEME, convertDateFormat, ROLE_LIST, STATUS_LIST } from '@app/shared'

import HR from '@components/HR'

import {
	useDealDetail,
	useConfirmVazDxshDeal,
	useConfirmMasulBolimXodim,
	useConfirmFinanceMinistryDeal,
	useConfirmApplicantDeal,
	useConfirmMinistryHeadDeal,
} from "@modules/deals/hooks";

import { IPerformer } from '@interfaces/appeal.interface'
import { Column } from 'react-table'

// AGAR SIZDA BASE URL BO'LSA SHU YERGA YOZING, AKS HOLDA BO'SH QOLDIRING
const BASE_URL = "";

const Index = () => {
	const { data, isPending } = useDealDetail();
	const { t } = useTranslation();
	const navigate = useNavigate();

	// Hooks
	const { confirmApplicantDeal } = useConfirmApplicantDeal();
	const { confirmVazDxshDeal } = useConfirmVazDxshDeal();
	const { confirmFinanceMinistryDeal } = useConfirmFinanceMinistryDeal()
	const { confirmMasulBolimXodimDeal } = useConfirmMasulBolimXodim();
	const { confirmMinistryHeadDeal } = useConfirmMinistryHeadDeal();

	const [confirmedByPerformers, setConfirmedByPerformers] = useState<boolean>(false);

	// MODAL UCHUN STATE
	const [performerRejectText, setPerformerRejectText] = useState('')

	// Faylni ochish uchun yordamchi funksiya (Headerdagi fayllar uchun)
	const handleOpenFile = (url: string | undefined) => {
		if (!url) return;
		const finalUrl = (url.startsWith('http') || !BASE_URL) ? url : `${BASE_URL}${url}`;
		window.open(finalUrl, '_blank');
	};

	const FileIconSvg = () => (
		<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
			<polyline points="14 2 14 8 20 8"></polyline>
			<line x1="16" y1="13" x2="8" y2="13"></line>
			<line x1="16" y1="17" x2="8" y2="17"></line>
			<polyline points="10 9 9 9 8 9"></polyline>
		</svg>
	);

	const EyeIconSvg = () => (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
			<circle cx="12" cy="12" r="3"></circle>
		</svg>
	);

	useEffect(() => {
		if (!data) return
		if (!data.performers?.length) return;

		const allFieldsTrue = data.performers.every((item: any) =>
			item.status === 'completed'
		);

		setConfirmedByPerformers(allFieldsTrue)
	}, [data]);

	// --- Columns Configuration ---
	const columns: Column<IPerformer>[] = useMemo(
		() => [
			{
				Header: t('performer'),
				accessor: (row: any) => row?.performer?.full_name
			},
			{
				Header: t('deadline'),
				accessor: (row: any) => row?.deadline || '-'
			},
			{
				Header: t('status'),
				accessor: (row: any) => (<Status status={row.status} />)
			},
			{
				Header: t('role'),
				accessor: (row: any) => row?.performer?.role
			},
			{
				Header: t('evalution_status'),
				accessor: (row: any) => {
					if (row.reject === true) return <Status status={'rejected'} />
					if (row.reject === false && row.status === 'completed') return <Status status={'accepted'} />
					return '-'
				}
			},

			// --- 1. EVALUATION FILE (ISHONCHLI TUGMA USULI) ---
			// --- 1. EVALUATION FILE (TUGMA USULIGA O'TKAZILDI) ---
			{
				Header: t('evaluation_file'),
				// 1-O'ZGARISH: .url o'rniga .file yozamiz
				accessor: (row: any) => row?.reject_file?.file,
				Cell: ({ row }: any) => {
					const data = row.original;

					// 2-O'ZGARISH: Bu yerda ham .url o'rniga .file bo'lishi shart!
					const fileUrl = data?.reject_file?.file;

					if (fileUrl) {
						return (
							<div
								// Jadval hodisasini to'xtatish
								onClick={(e) => e.stopPropagation()}
								className="relative z-50"
							>
								<button
									type="button"
									className="text-blue-600 hover:underline bg-transparent border-none p-0 cursor-pointer text-left font-medium"
									onClick={(e) => {
										e.stopPropagation();
										e.preventDefault();

										// URLni to'g'rilash (serverda to'liq link kelayotgan ekan, shuning uchun BASE_URL shart bo'lmasligi mumkin, lekin xavfsizlik uchun qoldiramiz)
										const finalUrl = (fileUrl.startsWith('http') || !BASE_URL)
											? fileUrl
											: `${BASE_URL}${fileUrl}`;

										console.log("Opening file:", finalUrl); // Konsolda tekshirish uchun
										window.open(finalUrl, '_blank');
									}}
								>
									{t('file')}
								</button>
							</div>
						);
					}

					if (data?.reject_file) {
						return <span className="text-gray-500">{t('File biriktirilgan (Link yo\'q)')}</span>;
					}
					return '-';
				}
			},

			// --- 2. EVALUATION TEXT (MODAL OCHISH) ---
			{
				Header: t('evaluation_text'),
				accessor: (row: any) => row?.reject_text,
				Cell: ({ row }: any) => {
					const data = row.original;
					const text = data?.reject_text;

					if (text) {
						return (
							<div
								onClick={(e) => e.stopPropagation()}
								className="relative z-50"
							>
								<Button
									mini
									onClick={(e: any) => {
										e.stopPropagation();
										setPerformerRejectText(text);
									}}
								>
									{t('show')}
								</Button>
							</div>
						)
					}
					return '-';
				}
			},
		], [t]
	)

	// ... Fayl formatlash kodlari ...
	const formattedPdfAttachment = useMemo(() => {
		if (!data?.pdf_attachment) return null;
		const fileName = data.pdf_attachment.split('/').pop() || "deal_file.pdf";
		return { id: "deal_pdf_id", name: fileName, url: data.pdf_attachment, size: 0, ext: "pdf", type: "pdf" };
	}, [data?.pdf_attachment]);

	const formattedDocxAttachment = useMemo(() => {
		if (!data?.docx_attachment) return null;
		const fileName = data.docx_attachment.split('/').pop() || "deal_file.docx";
		return { id: "deal_docx_id", name: fileName, url: data.docx_attachment, size: 0, ext: "docx", type: "docx" };
	}, [data?.docx_attachment]);

	const formattedDealFiles = useMemo(() => {
		if (!data?.deal_files || !data.deal_files.length) return [];
		return data.deal_files.map((fileUrl: string, index: number) => {
			const fileName = fileUrl.split('/').pop() || `file_${index}`;
			const extension = fileName.split('.').pop() || "file";
			return { id: `deal_file_${index}`, name: fileName, url: fileUrl, size: 0, ext: extension, type: extension }
		})
	}, [data?.deal_files]);

	return (
		<PageLayout>
			<PageTitle title={t("Deal Details")} />

			<Wrapper>
				{/* --- MODAL QISMI --- */}
				<ShowIf show={!!performerRejectText}>
					<div
						className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
						onClick={() => setPerformerRejectText('')}
					>
						<div
							className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full m-4 relative"
							onClick={(e) => e.stopPropagation()}
						>
							<h3 className="text-lg font-bold mb-4 border-b pb-2">{t('evaluation_text')}</h3>
							<div className="bg-gray-50 p-4 rounded mb-6 text-gray-700 whitespace-pre-wrap max-h-[60vh] overflow-y-auto">
								{performerRejectText}
							</div>
							<div className="flex justify-end">
								<Button onClick={() => setPerformerRejectText('')} theme={BUTTON_THEME.PRIMARY}>
									{t('Close')}
								</Button>
							</div>
						</div>
					</div>
				</ShowIf>

				{/* --- 1. ASOSIY MA'LUMOTLAR --- */}
				<div className="flex flex-col gap-4 mb-6">
					<h2 className="text-lg font-bold text-gray-800 border-l-4 border-blue-500 pl-3">
						{t("General Information")}
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<GridWrapper>
							<Row label={t("Deal ID")} value={`#${data?.id || '-'}`} background />
							<Row label={t("Application ID")} value={data?.application ? `#${data.application}` : '-'} />
							<Row label={t("Status")} value={data?.status ? <span className="font-bold text-blue-600">{t(data.status)}</span> : '-'} background />
						</GridWrapper>
						<GridWrapper>
							<Row label={t("Start Date")} value={convertDateFormat(data?.start_date) || '-'} background />
							<Row label={t("End Date")} value={convertDateFormat(data?.end_date) || '-'} />
							<Row label={t("Register Code")} value={data?.register_code || '-'} background />
						</GridWrapper>
					</div>
				</div>

				<HR />

				{/* --- 2. HUJJATLAR (DOCUMENTS) --- */}
				<Tag title="Deal Documents" type="vertical">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="flex flex-col gap-2">
							<span className="text-sm font-semibold text-gray-500 uppercase">{t("Deal File (PDF)")}</span>
							{formattedPdfAttachment ? (
								<div className="cursor-pointer hover:opacity-80 transition-all border border-transparent hover:border-blue-300 rounded" onClick={() => handleOpenFile(formattedPdfAttachment.url)}>
									<FileUpLoaderView value={formattedPdfAttachment} id="deal_pdf_view" />
								</div>
							) : <div className="text-gray-400 text-sm italic border p-3 rounded bg-gray-50">{t("No PDF file attached")}</div>}
						</div>
						<div className="flex flex-col gap-2">
							<span className="text-sm font-semibold text-gray-500 uppercase">{t("Deal File (DOCX)")}</span>
							{formattedDocxAttachment ? (
								<div className="cursor-pointer hover:opacity-80 transition-all border border-transparent hover:border-blue-300 rounded" onClick={() => handleOpenFile(formattedDocxAttachment.url)}>
									<FileUpLoaderView value={formattedDocxAttachment} id="deal_docx_view" />
								</div>
							) : <div className="text-gray-400 text-sm italic border p-3 rounded bg-gray-50">{t("No DOCX file attached")}</div>}
						</div>
						{formattedDealFiles.map((file) => (
							<div key={file.id} className="flex flex-col gap-2">
								<span className="text-sm font-semibold text-gray-500 uppercase">{t("Additional File")}</span>
								<div className="cursor-pointer hover:opacity-80 transition-all border border-transparent hover:border-blue-300 rounded" onClick={() => handleOpenFile(file.url)}>
									<FileUpLoaderView value={file} id={file.id} />
								</div>
							</div>
						))}
					</div>
				</Tag>

				<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B, ROLE_LIST.MINISTRY_FINANCE, ROLE_LIST.MINISTRY]}>
					<h2 className={'text-gray-400 font-semibold mt-4'}>Performers list</h2>
					{data?.performers && data.performers.length ? (
						<div className="grid grid-cols-12 gap-4">
							<Table isLoading={isPending} columns={columns} data={data?.performers} screen={true} pagination={false} />
						</div>
					) : (<div>Performs list is empty</div>)}
				</Restricted>

				{/* --- FOOTER BUTTONS (HAMMASI QAYTARILDI) --- */}
				<div className="grid grid-cols-12 gap-4 mt-8">
					<div className="col-span-6">
						<Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>Back</Button>
					</div>

					<div className="col-span-6 justify-end flex">
						<Restricted permittedRole={[ROLE_LIST.BASIN_B_B]}>
							<ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject')}>Return</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.BALANCE]}>
							<ShowIf show={data?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject')}>Return</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
							<ShowIf show={data?.status === STATUS_LIST.NEW || data?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject-vazdxsh')}>Return</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => navigate('attach-performer')} className="mr-2">Xodimga yuborish</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => confirmVazDxshDeal({ reject: false })}>Confirm</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.MINISTRY_FINANCE]}>
							<ShowIf show={data?.performer?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject')}>Return</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => confirmFinanceMinistryDeal({ reject: false })}>Confirm</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.MINISTRY]}>
							<ShowIf show={data?.performer?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject-ministry')}>Return</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => navigate('attach-code-register')} className="mr-2">Register code</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => confirmMinistryHeadDeal({ reject: false })}>Confirm</Button>
							</ShowIf>
							<ShowIf show={data?.performer?.status === STATUS_LIST.COMPLETED}>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => navigate('attach-code-register')}>Register code</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.MINISTRY_M_B_B]}>
							<ShowIf show={data?.performer?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject-masulbolimdxsh')}>Return</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => confirmMasulBolimXodimDeal({ reject: false })}>Confirm</Button>
							</ShowIf>
						</Restricted>

						<Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
							<ShowIf show={data?.performer?.status === STATUS_LIST.IN_PROCES}>
								<Button className={'mr-2'} theme={BUTTON_THEME.DANGER_OUTLINE} onClick={() => navigate('reject_applicant')}>Return</Button>
								<Button theme={BUTTON_THEME.PRIMARY} onClick={() => confirmApplicantDeal({ reject: false })}>Confirm</Button>
							</ShowIf>
						</Restricted>
					</div>
				</div>
			</Wrapper>
		</PageLayout>
	)
}

export default Index