import {
  Button,
  FileUpLoader,
  Input,
  NumberFormattedInput,
  Select,
} from "@components/UI";
import { ICurrentInvestmentForm } from "@interfaces/projectsPassport.interface";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { interceptor } from "@shared/libraries";
import { getSelectValue, showMessage } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
type CurrentInvestmentsProps = {
  investmentForm: UseFormReturn<ICurrentInvestmentForm>;
  objectTypesOptions: { value: number; label: string }[];
  projectPassportToEdit: number | null;
};
export default function CurrentInvestments({
  investmentForm,
  objectTypesOptions,
  projectPassportToEdit,
}: CurrentInvestmentsProps) {
  const investmentFieldArray = useFieldArray({
    control: investmentForm.control,
    name: "investments",
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
    console.log(index, id, type);
    const currentReports =
      investmentForm.getValues(`investments.${index}.report`) || [];
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

      interceptor.delete(`report/fact/${id}`).then(() => {
        showMessage(`${t("Investment removed successfully")} 📄🡆🗑️`, "success");
        handleRemoveReportInvest(index, id!);
      });
    }
    setShowPermissionModal(false);
    setPendingDelete(null);
  };
  const handleAddReport = (planIndex: number) => {
    const currentReports =
      investmentForm.getValues(`investments.${planIndex}.report`) || [];
    const updatedReports = [
      ...currentReports,
      { id: Math.random(), fact: "", price: "", date: null, file: null },
    ];

    investmentForm.setValue(`investments.${planIndex}.report`, updatedReports);
  };

  const handleRemoveReportInvest = (invIndex: number, reportId: number) => {
    const currentReports =
      investmentForm.getValues(`investments.${invIndex}.report`) || [];
    const updatedReports = currentReports.filter(
      (report) => report.id !== reportId
    );

    investmentForm.setValue(`investments.${invIndex}.report`, updatedReports);
  };
  return (
    <form>
      {investmentFieldArray.fields.map((investField, investIndex) => {
        const reportArray =
          investmentForm.watch(`investments.${investIndex}.report`) || [];

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
              key={investField.id}
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "10px",
                alignItems: "end",
              }}
            >
              <Input
                id={`investments.${investIndex}.object`}
                type={FIELD.TEXT}
                label="Object"
                placeholder="Enter object"
                error={
                  investmentForm.formState.errors.investments?.[investIndex]
                    ?.object?.message
                }
                {...investmentForm.register(
                  `investments.${investIndex}.object`
                )}
              />
              <Controller
                name={`investments.${investIndex}.object_type`}
                control={investmentForm.control}
                render={({ field: { value, ref, onChange, onBlur } }) => (
                  <Select
                    ref={ref}
                    id="type"
                    options={objectTypesOptions}
                    onBlur={onBlur}
                    label="Type"
                    placeholder="Select type"
                    error={
                      investmentForm?.formState?.errors?.investments?.[
                        investIndex
                      ]?.object_type?.message
                    }
                    value={getSelectValue(objectTypesOptions, value)}
                    defaultValue={getSelectValue(objectTypesOptions, value)}
                    handleOnChange={(e) => onChange(e as string)}
                  />
                )}
              />
            </div>
            <Controller
              name={`investments.${investIndex}.report`}
              control={investmentForm.control}
              render={() => (
                <>
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
                        id={`investments.${investIndex}.report.${reportIndex}.fact`}
                        type={FIELD.TEXT}
                        label="Fact"
                        placeholder="Enter fact"
                        error={
                          investmentForm.formState.errors?.investments?.[
                            investIndex
                          ]?.report?.[reportIndex]?.fact?.message
                        }
                        {...investmentForm.register(
                          `investments.${investIndex}.report.${reportIndex}.fact`
                        )}
                      />
                      <Controller
                        name={`investments.${investIndex}.report.${reportIndex}.price`}
                        control={investmentForm.control}
                        render={({ field }) => (
                          <NumberFormattedInput
                            id={`investments.${investIndex}.report.${reportIndex}.price`}
                            maxLength={20}
                            disableGroupSeparators={false}
                            allowDecimals={false}
                            label="Investment price (mln)"
                            placeholder="Enter investment price"
                            error={
                              investmentForm.formState.errors?.investments?.[
                                investIndex
                              ]?.report?.[reportIndex]?.price?.message
                            }
                            {...field}
                          />
                        )}
                      />
                      <Input
                        id={`investments.${investIndex}.report.${reportIndex}.date`}
                        label="Date (16-07-2025)"
                        placeholder="Enter date (16-07-2025)"
                        error={
                          investmentForm.formState.errors.investments?.[
                            investIndex
                          ]?.report?.[reportIndex]?.date?.message
                        }
                        {...investmentForm.register(
                          `investments.${investIndex}.report.${reportIndex}.date`
                        )}
                      />
                      <Controller
                        name={`investments.${investIndex}.report.${reportIndex}.file`}
                        control={investmentForm.control}
                        render={({
                          field: { onChange, value, ref, onBlur },
                        }) => (
                          <FileUpLoader
                            id={`investments.${investIndex}.report.${reportIndex}.file`}
                            ref={ref}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            multi={false}
                            label="Upload PDF"
                            error={
                              investmentForm.formState.errors?.investments?.[
                                investIndex
                              ]?.report?.[reportIndex]?.file?.message
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
                            "investments"
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
                </>
              )}
            />
          </div>
        );
      })}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="button"
          theme={BUTTON_THEME.PRIMARY}
          onClick={() =>
            investmentFieldArray.append({
              project: projectPassportToEdit,
              object: "",
              object_type: null,
              report: [
                {
                  id: Math.random(),
                  fact: "",
                  price: "",
                  date: "",
                  file: null,
                },
              ],
            })
          }
        >
          + Add investment
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
