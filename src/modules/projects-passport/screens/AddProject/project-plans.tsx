import { Button, Input, NumberFormattedInput, Select } from "@components/UI";
import { IProjectPlanForm } from "@interfaces/projectsPassport.interface";
import AddingObjectModal from "@modules/projects-passport/components/AddingObjectModal/AddingObjectModal";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { getSelectValue } from "@shared/utilities";
import { useState } from "react";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";

type Object = {
  value: number;
  label: string;
};
type ProjectPlansProps = {
  onSavePlans: () => void;
  projectPassportToEdit: number | null;
  objects: Object[];
  projectPlan: UseFormReturn<IProjectPlanForm>;
  objectTypesOptions:{value:number,label:string}[]
};
export default function ProjectPlans({
  onSavePlans,
  projectPassportToEdit,
  projectPlan,
  objectTypesOptions,
}: ProjectPlansProps) {
  const planArray = useFieldArray({
    control: projectPlan.control,
    name: "plans",
  });
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
                        onClick={() => handleRemoveReport(planIndex, report.id)}
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
            <Button
              type="button"
              theme={BUTTON_THEME.DANGER}
              onClick={() => planArray.remove(planIndex)}
              style={{ marginTop: "10px" }}
            >
              x Remove object
            </Button>
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
        <Button
          type="button"
          theme={BUTTON_THEME.PRIMARY_OUTLINE}
          onClick={onSavePlans}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
