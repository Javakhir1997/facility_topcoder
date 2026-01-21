import {
	FileUpLoaderView,
	PageLayout,
	PageTitle,
	Status,
	Tag,
	Wrapper,
	GridWrapper,
	Row,
	Button,
	Restricted
} from '@app/components'
import { convertDateFormat, STATUS_LIST, BUTTON_THEME, ROLE_LIST } from '@app/shared'
import { useDealDetail } from '@modules/deals/hooks'
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { useNavigate } from 'react-router-dom';

// ... (importlar o'sha holatda qoladi)

const Index = () => {
	const { data, isPending } = useDealDetail();
	const navigate = useNavigate();
	const formatFile = (url: string | undefined, id: string) => {
		// 1. Agar URL kelmasa (null yoki undefined bo'lsa), hech narsa qaytarmaydi
		if (!url) return null;

		// 2. Fayl nomini URL ichidan ajratib oladi
		// Masalan: "http://site.uz/media/deal_87.pdf" -> "deal_87.pdf"
		const fileName = url.split('/').pop() || "file";

		// 3. Fayl kengaytmasini (ext) aniqlaydi
		// Masalan: "deal_87.pdf" -> "pdf"
		const extension = fileName.split('.').pop();

		// 4. Komponent kutayotgan tayyor obyektni qaytaradi
		return {
			id: id,            // Biz bergan unikal ID
			name: fileName,    // Fayl nomi
			url: url,          // Yuklab olish uchun to'liq yo'l
			size: 0,           // Hajmi (URL dan bilib bo'lmaydi, shunchaki 0)
			ext: extension,    // Kengaytma (pdf, docx)
			type: extension    // Fayl turi
		};
	};
	// Fayl formatlash memoizatsiya qilingan
	const formattedFiles = useMemo(() => ({
		pdf: data?.pdf_attachment ? formatFile(data.pdf_attachment, "pdf_id") : null,
		docx: data?.docx_attachment ? formatFile(data.docx_attachment, "docx_id") : null
	}), [data]);

	if (isPending) return <PageLayout>Yuklanmoqda...</PageLayout>;

	// Ma'lumot topilmasa xunuk ko'rinmasligi uchun
	if (!data) return (
		<PageLayout>
			<Wrapper>Ma'lumot topilmadi</Wrapper>
		</PageLayout>
	);

	return (
		<PageLayout>
			<div className="flex justify-between items-center mb--md">
				<PageTitle title={`Bitim #${data.id}`} />
				<div className="flex gap--sm">
					<Button
						theme={BUTTON_THEME.OUTLINE}
						onClick={() => navigate(-1)}
					>
						Orqaga
					</Button>
					<Restricted to={[ROLE_LIST.OPERATOR]}> {/* Huquqni tekshirish */}
						<Button
							theme={BUTTON_THEME.PRIMARY}
							onClick={() => navigate(`/deals/edit/${data.id}`)}
						>
							Tahrirlash
						</Button>
					</Restricted>
				</div>
			</div>

			<Wrapper className="mb--lg">
				<Tag title="Umumiy ma'lumotlar" type="vertical">
					<GridWrapper cols={3} gap="xl" className="py--md">
						<Row title="ID raqami">
							<span className="text--bold text--primary">#{data.id}</span>
						</Row>
						<Row title="Ariza raqami">
							<span className="text--medium">{data.application}</span>
						</Row>
						<Row title="Hozirgi holat">
							<Status statusList={STATUS_LIST} status={data.status} />
						</Row>
						<Row title="Boshlanish sanasi">
							<span>{data.start_date ? convertDateFormat(data.start_date) : "—"}</span>
						</Row>
						<Row title="Tugash sanasi">
							<span className={data.end_date ? "text--danger" : ""}>
								{data.end_date ? convertDateFormat(data.end_date) : "—"}
							</span>
						</Row>
					</GridWrapper>
				</Tag>
			</Wrapper>

			<Wrapper>
				<Tag title="Hujjatlar" type="vertical">
					<div className="grid grid--cols-2 gap--xl">
						<div className="p--md border--radius-md bg--light-gray">
							<span className="display--block mb--sm text--muted">PDF Varianti</span>
							<FileUpLoaderView value={formattedFiles.pdf} id="pdf" readonly />
						</div>
						<div className="p--md border--radius-md bg--light-gray">
							<span className="display--block mb--sm text--muted">Word Varianti</span>
							<FileUpLoaderView value={formattedFiles.docx} id="docx" readonly />
						</div>
					</div>
				</Tag>
			</Wrapper>
		</PageLayout>
	)
}

export default Index