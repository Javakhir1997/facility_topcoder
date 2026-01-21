import {
  Button,
  FileUpLoader,
  Input,
  NumberFormattedInput,
  Select,
} from "@components/UI";
import { IAdditionalInvestmentForm } from "@interfaces/projectsPassport.interface";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { interceptor } from "@shared/libraries";
import { getSelectValue, showMessage } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
type AdditionalFormProps = {
  additionalInvestmentForm: UseFormReturn<IAdditionalInvestmentForm>;
  objectTypesOptions: { value: number; label: string }[];
  projectPassportToEdit: number | null;
};
export default function AdditionalInvestmentsForm({
  additionalInvestmentForm,
  objectTypesOptions,
  projectPassportToEdit,
}: AdditionalFormProps) {
  const additionalInvestmentFieldArray = useFieldArray({
    control: additionalInvestmentForm.control,
    name: "additionalInvestments",
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
    const currentReports =
      additionalInvestmentForm.getValues(
        `additionalInvestments.${index}.report`
      ) || [];
    if (currentReports.length <= 1) {
      console.log("Last report in last investment cannot be deleted");
      setShowWarningModal(true);
      return;
    }

    setPendingDelete({ index, id, type });
    setShowPermissionModal(true);
  };
  const handlePermissionResponse = (confirm: boolean) => {
    if (confirm && pendingDelete) {
      const { index, id } = pendingDelete;

      interceptor.delete(`report/additional/${id}`).then(() => {
        showMessage(
          `${t("Additional investment removed successfully")} 📄🡆🗑️`,
          "success"
        );
        handleRemoveReportInvest(index, id!);
      });

      setShowPermissionModal(false);
      setPendingDelete(null);
    }
  };
  const handleAddReport = (planIndex: number) => {
    const currentReports =
      additionalInvestmentForm.getValues(
        `additionalInvestments.${planIndex}.report`
      ) || [];
    const updatedReports = [
      ...currentReports,
      { id: Math.random(), fact: "", price: "", date: null, file: null },
    ];

    additionalInvestmentForm.setValue(
      `additionalInvestments.${planIndex}.report`,
      updatedReports
    );
  };
  const handleRemoveReportInvest = (invIndex: number, reportId: number) => {
    const currentReports =
      additionalInvestmentForm.getValues(
        `additionalInvestments.${invIndex}.report`
      ) || [];
    const updatedReports = currentReports.filter(
      (report) => report.id !== reportId
    );

    additionalInvestmentForm.setValue(
      `additionalInvestments.${invIndex}.report`,
      updatedReports
    );
  };
  return (
    <form>
      {additionalInvestmentFieldArray.fields.map((investField, investIndex) => {
        const reportArray =
          additionalInvestmentForm.watch(
            `additionalInvestments.${investIndex}.report`
          ) || [];

        return (
          <div
            key={investField.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "end",
              }}
            >
              <Input
                id={`additionalInvestments.${investIndex}.object`}
                type={FIELD.TEXT}
                label="Object"
                placeholder="Enter object"
                error={
                  additionalInvestmentForm.formState.errors
                    .additionalInvestments?.[investIndex]?.object?.message
                }
                {...additionalInvestmentForm.register(
                  `additionalInvestments.${investIndex}.object`
                )}
              />
              <Controller
                name={`additionalInvestments.${investIndex}.object_type`}
                control={additionalInvestmentForm.control}
                render={({ field: { value, ref, onChange, onBlur } }) => (
                  <Select
                    ref={ref}
                    id="type"
                    options={objectTypesOptions}
                    onBlur={onBlur}
                    label="Type"
                    placeholder="Select type"
                    error={
                      additionalInvestmentForm?.formState?.errors
                        ?.additionalInvestments?.[investIndex]?.object_type
                        ?.message
                    }
                    value={getSelectValue(objectTypesOptions, value)}
                    defaultValue={getSelectValue(objectTypesOptions, value)}
                    handleOnChange={(e) => onChange(e as string)}
                  />
                )}
              />
            </div>

            {reportArray.map((report, reportIndex) => (
              <div
                key={report.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                  alignItems: "end",
                }}
              >
                <Input
                  id={`additionalInvestments.${investIndex}.report.${reportIndex}.addition`}
                  type={FIELD.TEXT}
                  label="Addition"
                  placeholder="Enter addition"
                  error={
                    additionalInvestmentForm.formState.errors
                      ?.additionalInvestments?.[investIndex]?.report?.[
                      reportIndex
                    ]?.addition?.message
                  }
                  {...additionalInvestmentForm.register(
                    `additionalInvestments.${investIndex}.report.${reportIndex}.addition`
                  )}
                />

                <Controller
                  name={`additionalInvestments.${investIndex}.report.${reportIndex}.price`}
                  control={additionalInvestmentForm.control}
                  render={({ field }) => (
                    <NumberFormattedInput
                      id={`additionalInvestments.${investIndex}.report.${reportIndex}.price`}
                      maxLength={20}
                      disableGroupSeparators={false}
                      allowDecimals={false}
                      label="Investment price (mln)"
                      placeholder="Enter investment price"
                      error={
                        additionalInvestmentForm.formState.errors
                          ?.additionalInvestments?.[investIndex]?.report?.[
                          reportIndex
                        ]?.price?.message
                      }
                      {...field}
                    />
                  )}
                />

                <Input
                  id={`additionalInvestments.${investIndex}.report.${reportIndex}.date`}
                  label="Date (16-07-2025)"
                  placeholder="Enter date (16-07-2025)"
                  error={
                    additionalInvestmentForm.formState.errors
                      ?.additionalInvestments?.[investIndex]?.report?.[
                      reportIndex
                    ]?.date?.message
                  }
                  {...additionalInvestmentForm.register(
                    `additionalInvestments.${investIndex}.report.${reportIndex}.date`
                  )}
                />

                <Controller
                  name={`additionalInvestments.${investIndex}.report.${reportIndex}.file`}
                  control={additionalInvestmentForm.control}
                  render={({ field: { onChange, value, ref, onBlur } }) => (
                    <FileUpLoader
                      id={`additionalInvestments.${investIndex}.report.${reportIndex}.file`}
                      ref={ref}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      multi={false}
                      label="Upload PDF"
                      error={
                        additionalInvestmentForm.formState.errors
                          ?.additionalInvestments?.[investIndex]?.report?.[
                          reportIndex
                        ]?.file?.message
                      }
                    />
                  )}
                />
                <Button
                  type="button"
                  theme={BUTTON_THEME.DANGER}
                  onClick={() =>
                    handleDeleteWithPermission(
                      investIndex,
                      report.id,
                      "additional-investments"
                    )
                  }
                >
                  x
                </Button>
              </div>
            ))}
            <Button
              type="button"
              theme={BUTTON_THEME.PRIMARY_OUTLINE}
              onClick={() => handleAddReport(investIndex)}
              style={{ marginTop: "10px" }}
            >
              + Add report
            </Button>
          </div>
        );
      })}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          theme={BUTTON_THEME.PRIMARY}
          onClick={() =>
            additionalInvestmentFieldArray.append({
              project: projectPassportToEdit,
              object: "",
              object_type: null,
              report: [
                {
                  id: Math.random(),
                  addition: "",
                  price: "",
                  date: "",
                  file: null,
                },
              ],
            })
          }
        >
          + Add additional investment
        </Button>
      </div>
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
