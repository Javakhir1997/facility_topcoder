import { Button, FileUpLoader, FileUpLoader2, Input } from "@components/UI";
import { IMonitoringForm } from "@interfaces/projectsPassport.interface";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";


type MonitoringProps = {
  monitoringForm:UseFormReturn<IMonitoringForm>
  projectPassportToEdit:number|null
}; 
export default function Monitoring({
  monitoringForm,
  projectPassportToEdit,
}: MonitoringProps) {
  const monitoringFormUseFieldArray = useFieldArray({
    control: monitoringForm.control,
    name: "items",
  });
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
            onClick={() => monitoringFormUseFieldArray.remove(index)}
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
            date: "",
            file: null,
            comment: "",
          })
        }
      >
        + Add monitoring
      </Button>
    </form>
  );
}
