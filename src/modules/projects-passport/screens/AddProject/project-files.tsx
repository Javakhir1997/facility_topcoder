import { Button, FileUpLoader, FileUpLoader2, Input } from "@components/UI";
import { IAddProjectFilesForm } from "@interfaces/projectsPassport.interface";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { Controller, useFieldArray,  UseFormReturn } from "react-hook-form";

type ProjectFilesProps = {
  projectPassportToEdit: number | null;
  projectFilesForm:UseFormReturn<IAddProjectFilesForm>
};

export default function PtojectFiles({
  projectPassportToEdit,
  projectFilesForm,
}: ProjectFilesProps) {



  const useFieldArrayOfProjectFilesForm = useFieldArray({
    control: projectFilesForm.control, 
    name: "files",
  });

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
            onClick={() => useFieldArrayOfProjectFilesForm.remove(index)}
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
            project: projectPassportToEdit,
            fileName: "",
            file: null,
          })
        }
      >
        + Add file
      </Button>
    </form>
  );
}
