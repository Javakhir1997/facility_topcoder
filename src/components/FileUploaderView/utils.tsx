import React from "react";

// 1. formatFileSize oldiga "export" qo'shildi
export const formatFileSize = (bytes: number | undefined) => {
    if (!bytes || bytes === 0) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};


// ... boshqa funksiyalar (formatFileSize, getFileIcon) turibdi

// YANGI: Fayl nomini qisqartiruvchi funksiya
export const shortenFileName = (fileName: string, maxLength: number = 20) => {
    if (!fileName || fileName.length <= maxLength) return fileName;

    // Fayl kengaytmasini ajratib olamiz (masalan: pdf)
    const lastDotIndex = fileName.lastIndexOf(".");

    // Agar kengaytma bo'lmasa, shunchaki oxiriga ... qo'yamiz
    if (lastDotIndex === -1) {
        return fileName.substring(0, maxLength) + "...";
    }

    const extension = fileName.substring(lastDotIndex); // .pdf
    const name = fileName.substring(0, lastDotIndex);   // fayl nomi

    // Nomni qisqartiramiz va oxiriga kengaytmani ulaymiz
    // Masalan: "Juda_uzun_nom" -> "Juda_uz..." + ".pdf"
    return name.substring(0, maxLength - 4) + "..." + extension;
};

// 2. getFileIcon oldiga "export" qo'shildi
export const getFileIcon = (fileName: string) => {
    const ext = fileName?.split(".").pop()?.toLowerCase();

    switch (ext) {
        case "pdf":
            return {
                color: "text-blue-500 bg-blue-50",
                icon: (
                    <img src="/public/images/pdf-svgrepo-com.svg" />
                ),
            };
        case "doc":
        case "docx":
            return {
                color: "text-blue-500 bg-blue-50",
                icon: (
                    <img src="/public/images/docx-svgrepo-blue.svg" />
                ),
            };
        case "xls":
        case "xlsx":
            return {
                color: "text-green-500 bg-green-50",
                icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                ),
            };
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
            return {
                color: "text-purple-500 bg-purple-50",
                icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                ),
            };
        default:
            return {
                color: "text-gray-500 bg-gray-50",
                icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                ),
            };
    }
};