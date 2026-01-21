import { Button, FileUpLoader } from "@components/UI";
import { IAddProjectFilesForm } from "@interfaces/projectsPassport.interface";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import { BUTTON_THEME } from "@shared/constants";
import { interceptor } from "@shared/libraries";
import { showMessage } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ProjectFilesProps = {
  projectPassportToEdit: number | null;
  projectFilesForm: UseFormReturn<IAddProjectFilesForm>;
};

export default function PtojectFiles({ projectFilesForm }: ProjectFilesProps) {
  const useFieldArrayOfProjectFilesForm = useFieldArray({
    control: projectFilesForm.control,
    name: "files",
  });
  const { t } = useTranslation();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    index: number;
    id: number | null | undefined;
    type: string;
  } | null>(null);
  const handleDeleteWithPermission = (
    index: number,
    id: number | null |undefined,
    type: string
  ) => {
    if (useFieldArrayOfProjectFilesForm.fields.length <= 1) {
      setShowWarningModal(true);
      return;
    }
    setPendingDelete({ index, id, type });
    setShowPermissionModal(true);
  };
  const handlePermissionResponse = (confirm: boolean) => {
    if (confirm && pendingDelete) {
      const { index, id } = pendingDelete;
      if (id) {
        interceptor.delete(`attachment/${id}`).then(() => {
          showMessage(`${t("File removed successfully")} 📄🡆🗑️`, "success");
          useFieldArrayOfProjectFilesForm.remove(index);
        });
      }
    }
    setShowPermissionModal(false);
    setPendingDelete(null);
  };
  return (
    <form>
      {useFieldArrayOfProjectFilesForm.fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "end",
          }}
        >
          <Controller
            name={`files.${index}.file`}
            control={projectFilesForm.control}
            render={({ field: { onChange, value, ref, onBlur } }) => (
              <FileUpLoader
                id={`files.${index}.file`}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                multi={false}
                label="Upload PDF"
                error={
                  projectFilesForm.formState.errors.files?.[index]?.file
                    ?.message
                }
              />
            )}
          />

          <Button
            type="button"
            theme={BUTTON_THEME.DANGER}
            onClick={() =>
              handleDeleteWithPermission(
                index,
                field?.file?.id,
                "project-files"
              )
            }
          >
            x
          </Button>
        </div>
      ))}

      <Button
        type="button"
        theme={BUTTON_THEME.PRIMARY}
        onClick={() =>
          useFieldArrayOfProjectFilesForm.append({
            file: null,
          })
        }
      >
        + Add file
      </Button>
      {showWarningModal && (
        <WarningModal
          text="You can not delete last item"
          handleWarning={() => setShowWarningModal(false)}
        />
      )}
      {showPermissionModal && (
        <PermissionModal
          text="Are you sure you want to delete this item? It can not be restored"
          handlePermission={handlePermissionResponse}
        />
      )}
    </form>
  );
}
