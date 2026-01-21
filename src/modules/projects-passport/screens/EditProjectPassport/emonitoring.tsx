import { Button, FileUpLoader, Input } from "@components/UI";
import { IMonitoringForm } from "@interfaces/projectsPassport.interface";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { interceptor } from "@shared/libraries";
import { showMessage } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type MonitoringProps = {
  monitoringForm: UseFormReturn<IMonitoringForm>;
  projectPassportToEdit: number | null;
};
export default function Monitoring({
  monitoringForm,
  projectPassportToEdit,
}: MonitoringProps) {
  const monitoringFormUseFieldArray = useFieldArray({
    control: monitoringForm.control,
    name: "items",
  });
  const { t } = useTranslation();
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<{
    index: number;
    id: number | null;
    type: string;
  } | null>(null);
  const handleDeleteWithPermission = (
    index: number,
    id: number | null,
    type: string
  ) => {
    if (
      type === "monitoring" &&
      monitoringFormUseFieldArray.fields.length <= 1
    ) {
      setShowWarningModal(true);
      return;
    }
    setPendingDelete({ index, id, type });
    setShowPermissionModal(true);
  };
  const handlePermissionResponse = (confirm: boolean) => {
    if (confirm && pendingDelete) {
      const { index, id } = pendingDelete;

      interceptor.delete(`report/monitoring/${id}`).then(() => {
        showMessage(`${t("Monitoring removed successfully")} 📄🡆🗑️`, "success");
        monitoringFormUseFieldArray.remove(index);
      });
    }
    setShowPermissionModal(false);
    setPendingDelete(null);
  };
  return (
    <form>
      {monitoringFormUseFieldArray.fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "10px",
            alignItems: "end",
          }}
        >
          <Input
            id={`items.${index}.date`}
            label="Date (16-10-2005)"
            placeholder="Enter date (16-10-2005)"
            error={
              monitoringForm.formState.errors.items?.[index]?.date?.message
            }
            {...monitoringForm.register(`items.${index}.date`)}
          />

          <Controller
            name={`items.${index}.file`}
            control={monitoringForm.control}
            render={({ field: { onChange, value, ref, onBlur } }) => (
              <FileUpLoader
                id={`items.${index}.file`}
                ref={ref}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                multi={false}
                label="Upload PDF"
                error={
                  monitoringForm.formState.errors.items?.[index]?.file?.message
                }
              />
            )}
          />

          <Input
            id={`items.${index}.comment`}
            type={FIELD.TEXT}
            label="Comment"
            placeholder="Enter comment"
            error={
              monitoringForm.formState.errors.items?.[index]?.comment?.message
            }
            {...monitoringForm.register(`items.${index}.comment`)}
          />

          <Button
            type="button"
            theme={BUTTON_THEME.DANGER}
            onClick={() =>
              handleDeleteWithPermission(index, field.backend_id, "monitoring")
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
          monitoringFormUseFieldArray.append({
            project: projectPassportToEdit,
            backend_id: Math.random(),
            id: Math.random(),
            date: "",
            file: null,
            comment: "",
          })
        }
      >
        + Add monitoring
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
