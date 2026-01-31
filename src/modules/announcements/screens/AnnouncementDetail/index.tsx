import {
	Button,
	PageLayout,
	PageTitle,
	Restricted,
	Row,
	ShowIf,
	Status,
	Wrapper
} from '@app/components'
import { BUTTON_THEME, ROLE_LIST, STATUS_LIST } from '@app/shared'
import HR from '@components/HR'
import { useAnnouncementDetail } from '@modules/announcements/hooks'
import { useAppContext } from '@app/hooks'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Link, TextArea } from "@radix-ui/themes";
import { Column } from "react-table";
import { IPerformer } from "@app/interfaces";
import { useEffect, useMemo, useState } from "react";

import DatePicker from '@components/UI/DatePicker'
import { useForm, FormProvider, Controller } from "react-hook-form";
import useUpdateAnnouncementConfirm from "@modules/announcements/hooks/useAnnouncementUpdateConfirm";

// Sana formatlash funksiyasi
const formatDate = (date: any) => {
	if (!date) return null;
	return new Date(date).toISOString().split('T')[0];
};

const Index = () => {

	const { data } = useAnnouncementDetail();
	const { user } = useAppContext();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const { updateAnnouncementConfirm } = useUpdateAnnouncementConfirm()

	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const methods = useForm({
		defaultValues: {
			description: ""
		}
	});

	const watchedDescription = methods.watch("description");

	useEffect(() => {
		if (data && data.description) {
			methods.setValue("description", data.description);
		}
	}, [data, methods]);

	const hasScheduledDate = data?.start_date && data?.end_date;

	const onSubmit = (formData: any) => {
		if (!hasScheduledDate && (!startDate || !endDate)) {
			alert("Iltimos, boshlanish va tugash sanalarini belgilang!");
			return;
		}

		const payload = {
			id: data?.id,
			start_date: hasScheduledDate ? data.start_date : formatDate(startDate),
			end_date: hasScheduledDate ? data.end_date : formatDate(endDate),
			description: formData.description,
		};

		updateAnnouncementConfirm(payload);
	};

	return (
		<PageLayout>
			<PageTitle title="Announcement" />
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<div>
						<Wrapper>
							{/* --- 1. CHROYLI DIZAYN QISMI (Start/End Date) --- */}
							{!hasScheduledDate && (
								<div className="mb-8">
									{/* Card Container */}
									<div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
										<h3 className="text-lg font-semibold text-slate-700 mb-4 flex items-center gap-2">
											📅 Loyiha muddatini belgilash
										</h3>
										
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											{/* Start Date Block */}
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium text-slate-600">
													Boshlanish sanasi
												</label>
												<div className="bg-white rounded-lg">
													<DatePicker
														value={startDate}
														onChange={(date) => setStartDate(date)}
														placeholder="Kun / Oy / Yil"
														minDate={new Date(2020, 0, 1)}
														maxDate={new Date(2030, 11, 31)}
													/>
												</div>
											</div>

											{/* End Date Block */}
											<div className="flex flex-col gap-2">
												<label className="text-sm font-medium text-slate-600">
													Tugash sanasi
												</label>
												<div className="bg-white rounded-lg">
													<DatePicker
														value={endDate}
														onChange={(date) => setEndDate(date)}
														placeholder="Kun / Oy / Yil"
														minDate={new Date(2020, 0, 1)}
														maxDate={new Date(2030, 11, 31)}
													/>
												</div>
											</div>
										</div>

										{/* Description Block inside the Card */}
										<div className="mt-6">
											<label className="text-sm font-medium text-slate-600 mb-2 block">
												{t('description')}
											</label>
											<div className="bg-white rounded-lg overflow-hidden border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
												<Controller
													name="description"
													control={methods.control}
													rules={{ required: true }}
													render={({ field }) => (
														<TextArea
															size="3"
															rows={5}
															variant="soft" // "soft" variant chiroyliroq ko'rinishi mumkin
															placeholder="Loyiha haqida batafsil ma'lumot kiriting..."
															style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent' }}
															{...field}
															value={field.value || ''}
														/>
													)}
												/>
											</div>
											{methods.formState.errors.description && (
												<span className="text-red-500 text-sm mt-1 block">Tavsif kiritish majburiy</span>
											)}
										</div>
									</div>
									
									{/* Ajratuvchi chiziq kerak emas, chunki Card ishlatdik */}
								</div>
							)}

							{/* --- 2. DETAIL QISMI (O'qish uchun) --- */}
							<div className="grid grid--cols gap--lg">
								<div className='border rounded-2xl'>
									<Row label="Applicant's last name" value={data?.applications[0].lastname} />
									<Row label="Applicant's first name" value={data?.applications[0].firstname} background />
									<Row label="Applicant's company_name name" value={data?.applications[0].company_name} />
									<Row label="Applicant's phone name" value={data?.applications[0].phone} />
									<Row label="Applicant's email name" value={data?.applications[0].email} />
									<Row label="Applicant's activity_type name" value={data?.applications[0].activity_type} />
									<Row label="Applicant's created_at name" value={data?.applications[0].created_at} />
									<Row label="Address" value={data?.address} />
									{data?.region ? <Row label="Region" value={data?.region?.label} /> : null}
								</div>
							</div>

							<HR />

							{/* Ma'lumotlarni ko'rsatish bloki */}
							<div className='flex flex-col items-start'>
								<div className='w-full'>
									<Row
										label="start_date"
										value={data?.start_date || (startDate ? formatDate(startDate) : '-')}
									/>
									<Row
										label="end_date"
										value={data?.end_date || (endDate ? formatDate(endDate) : '-')}
									/>
									<Row label="status" value={data?.status} />
								</div>
							</div>

							<HR />

							<div className='flex flex-col items-start'>
								<div className='w-full'>
									<Row
										label="Эълон мазмуни"
										value={
											watchedDescription // Priority 1: Hozir yozilayotgan
											|| data?.description // Priority 2: Baza
											|| "Ma'lumot yo'q"
										}
									/>
								</div>
							</div>

						</Wrapper>
					</div>

					<Restricted permittedRole={[ROLE_LIST.MINISTRY_DXSH_B_B]}>
						<ShowIf show={data?.status === STATUS_LIST.ACCEPTED}>
							<div className="mt-4 flex justify-end gap-3"> {/* Buttonlarni o'ngga taqadik */}
								<Button
									theme={BUTTON_THEME.DANGER_OUTLINE}
									onClick={(e) => {
										e.preventDefault();
										navigate('reject');
									}}
								>
									Return
								</Button>

								<Button
									theme={BUTTON_THEME.PRIMARY}
									onClick={methods.handleSubmit(onSubmit)}
									type="submit"
								>
									Confirm
								</Button>
							</div>
						</ShowIf>
					</Restricted>
				</form>
			</FormProvider>
		</PageLayout>
	)
}

export default Index