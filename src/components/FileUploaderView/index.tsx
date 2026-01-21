import { formatFileSize, getFileIcon, shortenFileName } from "./utils";


interface IFile {
    id?: string | number;
    name: string;
    url: string;
    size?: number; // Optional qildik, chunki sizda 0 kelishi mumkin
    type?: string;
}

interface FileUpLoaderProps {
    value?: IFile | null;
    id?: string;
    label?: string;
    readOnly?: boolean; // Agar faqat ko'rish uchun bo'lsa
}

const FileUpLoader: React.FC<FileUpLoaderProps> = ({ value, id, label }) => {
    // Agar value bo'lmasa, oddiy input yoki bo'sh joy qaytarish mumkin
    if (!value) {
        return (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-400 text-sm">
                Fayl mavjud emas
            </div>
        );
    }

    // Icon va rangni aniqlaymiz
    const { icon, color } = getFileIcon(value.name);
    // Hajmni formatlaymiz
    const sizeString = formatFileSize(value.size);
    const shortName = shortenFileName(value.name, 25);
    return (
        <div className="w-full">
            {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

            <div
                className="flex items-center p-3 bg-[#F0F0F0] rounded-[26px] hover:shadow-sm transition-shadow duration-200 group cursor-pointer"
                onClick={() => window.open(value.url, "_blank")} // Bosganda faylni ochish
                title="Faylni yuklab olish"
            >
                {/* 1. ICON QISMI */}
                <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg ${color}`}>
                    {icon}
                </div>

                {/* 2. MA'LUMOT QISMI (Name & Size) */}
                <div className="ml-4 flex-1 overflow-hidden">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                        {/* {value.name} */}
                        {shortName}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        {/* Agar size 0 bo'lsa, fayl kengaytmasini ko'rsatamiz */}
                        <span className="uppercase font-medium bg-gray-100 px-1.5 py-0.5 rounded">
                            {value.name.split('.').pop() || 'FILE'}
                        </span>
                        {sizeString && (
                            <>
                                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                <span>{sizeString}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* 3. DOWNLOAD ICON (O'ng tomonda) */}
                <div className="ml-2 text-gray-400 group-hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FileUpLoader;