import { Button, Input, NumberFormattedInput, Select } from "@components/UI";
import { IProjectPlanForm } from "@interfaces/projectsPassport.interface";
import AddingObjectModal from "@modules/projects-passport/components/AddingObjectModal/AddingObjectModal";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { interceptor } from "@shared/libraries";
import { getSelectValue, showMessage } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

type ProjectPlansProps = {
  projectPassportToEdit: number | null;
  projectPlan: UseFormReturn<IProjectPlanForm>;
  objectTypesOptions: { value: number; label: string }[];
};
export default function ProjectPlans({
  projectPassportToEdit,
  projectPlan,
  objectTypesOptions,
}: ProjectPlansProps) {
  const planArray = useFieldArray({
    control: projectPlan.control,
    name: "plans",
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
    id: number | null | undefined,
    type: string
  ) => {
    console.log(index,id,type)
    if (type === "plans") {
      const currentReports =
        projectPlan.getValues(`plans.${index}.report`) || [];
      if (currentReports.length <= 1) {
        console.log("Last report in last plan cannot be deleted");
        setShowWarningModal(true);
        return;
      }
    }
    setPendingDelete({ index, id, type });
    setShowPermissionModal(true);
  };
  const handlePermissionResponse = (confirm: boolean) => {
    if (confirm && pendingDelete) {
      const { index, id } = pendingDelete;

      interceptor.delete(`report/project-plan/${id}`).then(() => {
        showMessage(`${t("Plan removed successfully")} 📄🡆🗑️`, "success");
        handleRemoveReport(index, id!);
      });
    }
    setShowPermissionModal(false);
    setPendingDelete(null);
  };
  const handleAddReport = (planIndex: number) => {
    const currentReports =
      projectPlan.getValues(`plans.${planIndex}.report`) || [];
    const updatedReports = [
      ...currentReports,
      { id: Math.random(), plan: "", price: "", date: null },
    ];

    projectPlan.setValue(`plans.${planIndex}.report`, updatedReports);
  };

  const handleRemoveReport = (planIndex: number, reportId: number) => {
    const currentReports =
      projectPlan.getValues(`plans.${planIndex}.report`) || [];

    const updatedReports = currentReports.filter(
      (report) => report.id !== reportId
    );

    projectPlan.setValue(`plans.${planIndex}.report`, updatedReports);
  };

  const [showModal, setShowModal] = useState(false);
  function handleShowModal(arg: boolean) {
    setShowModal(arg);
  }
  return (
    <form>
      {showModal && (
        <AddingObjectModal
          text="Object name"
          handleShowModal={handleShowModal}
        />
      )}
      {planArray.fields.map((planField, planIndex) => {
        const reports = projectPlan.watch(`plans.${planIndex}.report`) || [];

        return (
          <div
            key={planField.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "end", gap: "10px" }}>
              <Input
                id={`plans.${planIndex}.object`}
                type={FIELD.TEXT}
                label="Object"
                placeholder="Enter object"
                error={
                  projectPlan.formState.errors.plans?.[planIndex]?.object
                    ?.message
                }
                {...projectPlan.register(`plans.${planIndex}.object`)}
              />
              <Controller
                name={`plans.${planIndex}.object_type`}
                control={projectPlan.control}
                render={({ field: { value, ref, onChange, onBlur } }) => (
                  <Select
                    ref={ref}
                    id="type"
                    options={objectTypesOptions}
                    onBlur={onBlur}
                    label="Type"
                    placeholder="Select type"
                    error={
                      projectPlan?.formState?.errors?.plans?.[planIndex]
                        ?.object_type?.message
                    }
                    value={getSelectValue(objectTypesOptions, value)}
                    defaultValue={getSelectValue(objectTypesOptions, value)}
                    handleOnChange={(e) => onChange(e as string)}
                  />
                )}
              />
            </div>

            <Controller
              name={`plans.${planIndex}.report`}
              control={projectPlan.control}
              render={() => (
                <>
                  {reports.map((report, reportIndex) => (
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
                        id={`plans.${planIndex}.report.${reportIndex}.plan`}
                        type={FIELD.TEXT}
                        label="Work type"
                        placeholder="Enter work type"
                        error={
                          projectPlan.formState.errors.plans?.[planIndex]
                            ?.report?.[reportIndex]?.plan?.message
                        }
                        {...projectPlan.register(
                          `plans.${planIndex}.report.${reportIndex}.plan`
                        )}
                      />

                      <Controller
                        name={`plans.${planIndex}.report.${reportIndex}.price`}
                        control={projectPlan.control}
                        render={({ field }) => (
                          <NumberFormattedInput
                            id={`plans.${planIndex}.report.${reportIndex}.price`}
                            maxLength={20}
                            disableGroupSeparators={false}
                            allowDecimals={false}
                            label="Price of the work type (mln)"
                            placeholder="Enter price of the work type (mln)"
                            error={
                              projectPlan.formState.errors.plans?.[planIndex]
                                ?.report?.[reportIndex]?.price?.message
                            }
                            {...field}
                          />
                        )}
                      />
                      <Controller
                        name={`plans.${planIndex}.report.${reportIndex}.date`}
                        control={projectPlan.control}
                        render={({ field }) => (
                          <NumberFormattedInput
                            id={`plans.${planIndex}.report.${reportIndex}.date`}
                            maxLength={4}
                            disableGroupSeparators={true}
                            allowDecimals={false}
                            label="Years of implementation (2025)"
                            placeholder="Enter of implementation (2025)"
                            error={
                              projectPlan.formState.errors.plans?.[planIndex]
                                ?.report?.[reportIndex]?.date?.message
                            }
                            {...field}
                          />
                        )}
                      />

                      <Button
                        type="button"
                        theme={BUTTON_THEME.DANGER}
                        onClick={() =>
                          handleDeleteWithPermission(
                            planIndex,
                            report.id,
                            "plans"
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
                    onClick={() => handleAddReport(planIndex)}
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
            planArray.append({
              object: "",
              project: projectPassportToEdit,
              object_type: null,
              report: [
                {
                  id: Math.random(),
                  plan: "",
                  price: "",
                  date: null,
                },
              ],
            })
          }
        >
          + Add object
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
