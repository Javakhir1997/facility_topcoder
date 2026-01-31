// src/interfaces/deal.interface.ts

// Statuslar uchun enum (ixtiyoriy, lekin foydali)
export type DealStatusType = 'in_process' | 'finished' | 'rejected' | 'new'; // va boshqalar

export interface IDealDetail {
  id: number;
  application: number; // Application ID
  register_code: string;
  status: DealStatusType | string;
  
  // Sanalar (Backenddan ko'pincha string keladi)
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;

  // Fayllar (nullable bo'lishi mumkin)
  pdf_attachment: string | null;
  docx_attachment: string | null;
  deal_files: string[]; // Qo'shimcha fayllar massivi

  // Ijrochi (Performer) ma'lumotlari
  // Sizning kodingizda: data?.performer.status ishlatilgan
  performer: {
    id?: number;
    status: string; // Masalan: 'in_process'
    assigned_at?: string;
    // Boshqa kerakli fieldlar
  };

  // Agar dealga biriktirilgan ijrochilar ro'yxati qaytsa:
  performers?: IAttachedPerformer[];
}

// Ijrochilar uchun yordamchi interfeys
export interface IAttachedPerformer {
  id: number; // Bu user ID yoki connection ID bo'lishi mumkin
  full_name?: string; // Ko'rsatish uchun
  deadline: string;
  status?: string;
}