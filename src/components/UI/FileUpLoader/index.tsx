import { useCallback, useEffect, forwardRef, useState, useMemo } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Delete, Download, FileUploader } from "@app/assets";
import { Input } from "@components/UI";
import { interceptor, showMessage } from "@app/shared";
import classNames from "classnames";
import { IFIle } from "@app/interfaces";

interface FileUploaderProps {
  onChange?: (file: IFIle | IFIle[] | undefined | null) => void;
  onBlur?: () => void;
  value: IFIle | IFIle[] | undefined | null | File;
  multi?: boolean;
  id: string;
  label?: string;
  error?: string;
  fileAddPath?: string;
  type?: "pdf" | "docx" | "all"; // "all" ikkala format uchun
  isDeletable?: boolean;
}

const Index = forwardRef<HTMLInputElement, FileUploaderProps>(
  (
    {
      onBlur,
      onChange,
      value,
      label,
      error,
      id,
      type = "pdf",
      multi = false,
      isDeletable = false,
      fileAddPath = "attachment",
    },
    ref
  ) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
    const [percentage, setPercentage] = useState<number>(0);

    // Qabul qilinadigan fayl formatlarini aniqlash
    const acceptFormats = useMemo(() => {
      const pdfTypes = { "application/pdf": [".pdf"] };
      const docxTypes = {
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
        "application/vnd.ms-excel": [".xls"],
      };

      if (type === "pdf") return pdfTypes;
      if (type === "docx") return docxTypes;
      return { ...pdfTypes, ...docxTypes }; // "all" holati uchun
    }, [type]);

    const onDrop = useCallback(
      (acceptedFiles: FileWithPath[]) => {
        if (!isLoading) {
          acceptedFiles.forEach((item) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("file", item);
            formData.append("name", item.name);
            
            interceptor
              .post(`${fileAddPath}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                  const total = progressEvent.total || 0;
                  const loaded = progressEvent.loaded || 0;
                  setPercentage(Math.round((loaded / total) * 100));
                },
              })
              .then((res) => {
                showMessage(`${res.data.name} ${t("File successfully accepted")}`, "success");
                if (multi) {
                  const currentValue = Array.isArray(value) ? value : [];
                  onChange?.([...currentValue, res.data] as IFIle[]);
                } else {
                  onChange?.(res.data);
                }
              })
              .catch(() => {
                showMessage(`${item.name} ${t("File not accepted")}`, "error");
              })
              .finally(() => {
                setIsLoading(false);
                setPercentage(0);
              });
          });
        }
      },
      [isLoading, multi, onChange, t, value, fileAddPath]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
      onDrop,
      accept: acceptFormats,
      maxFiles: multi ? 10 : 1,
      maxSize: 10 * 1024 * 1024,
    });

    useEffect(() => {
      if (fileRejections.length > 0) {
        fileRejections.forEach((rejection) => {
          rejection.errors.forEach((err) => {
            if (err.code === "too-many-files") {
              showMessage(t("Send each file separately"));
            } else if (err.code === "file-too-large") {
              showMessage(t("File must not exceed 10 mb"));
            } else if (err.code === "file-invalid-type") {
              const msg = type === "pdf" 
                ? t("Only .pdf files are accepted") 
                : type === "docx" 
                ? t("Only .docx, .xlsx, .doc files are accepted")
                : t("Only PDF, Word and Excel files are accepted");
              showMessage(msg, "error");
            }
          });
        });
      }
    }, [fileRejections, t, type]);

    const handleDelete = (id: string | number) => {
      if (id && !isDeleteLoading && !isLoading && !!onChange) {
        setIsDeleteLoading(true);
        setIsLoading(true);
        interceptor
          .delete(`${fileAddPath}/${id}`)
          .then(() => {
            if (Array.isArray(value)) {
              const newValue = value.filter((i) => i.id !== id);
              onChange?.(newValue.length === 0 ? null : (newValue as IFIle[]));
            } else {
              onChange?.(null);
            }
            showMessage(`${t("File successfully removed")} 📄🡆🗑️`, "success");
          })
          .finally(() => {
            setIsDeleteLoading(false);
            setIsLoading(false);
          });
      }
    };

    const handleDownload = (file?: string) => {
      if (file) window.open(file, "_blank");
    };

    // Yordamchi komponent: Yuklash holati matni
    const renderUploadLabel = () => {
      if (isLoading && !isDeleteLoading) return <span>{percentage}% - {t("Loading...")}</span>;
      if (isDragActive) return <span>{t("Drop your files")} 📂</span>;

      const formatLabel = type === "pdf" ? ".pdf" : type === "docx" ? ".docx, .xlsx" : ".pdf, .docx, .xlsx";
      return (
        <span>
          {t("Upload a file")} ({formatLabel} - {t("up to 10 mb")})
        </span>
      );
    };

    return (
      <Input id={id} label={label} error={error}>
        <div
          className={classNames(styles.root, {
            [styles.isLoading]: isLoading || !onChange,
            [styles.error]: !!error,
          })}
        >
          {/* Fayllar ro'yxati (Multi yoki Single qiymat bo'lsa) */}
          {(Array.isArray(value) ? value : value ? [value] : []).map((item: any, index) => (
             <div key={item.id || index} className={styles.values}>
               <div className={styles.value}>
                 <Input id={String(item.id)} value={item.name} disabled={true} />
               </div>
               {!!onChange && !isDeletable && (
                 <div
                   className={classNames(styles.icon, styles.delete, { [styles.isDelete]: isDeleteLoading })}
                   onClick={() => handleDelete(item.id)}
                 >
                   <Delete />
                 </div>
               )}
               {!isDeletable && (
                 <div className={styles.icon} onClick={() => handleDownload(item.file)}>
                   <Download />
                 </div>
               )}
             </div>
          ))}

          {/* Yuklash Inputi (Agar multi bo'lsa yoki hali fayl yuklanmagan bo'lsa ko'rinadi) */}
          {((multi && (!Array.isArray(value) || value.length < 10)) || !value) && (
            <div className={styles.input} {...getRootProps()}>
              <input ref={ref} {...getInputProps()} onBlur={onBlur} />
              <FileUploader />
              <p>{renderUploadLabel()}</p>
            </div>
          )}
        </div>
      </Input>
    );
  }
);

export default Index;