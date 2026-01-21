import {
  FileUpLoader,
  Input,
  NumberFormattedInput,
  Select,
} from "@components/UI";
import { IAdditionalInvestmentForm } from "@interfaces/projectsPassport.interface";
import { FIELD } from "@shared/constants";
import { getSelectValue } from "@shared/utilities";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
type Object = {
  value: number;
  label: string;
};

type AdditionalFormProps = {
  additionalInvestmentForm: UseFormReturn<IAdditionalInvestmentForm>;
  objects: Object[];
  objectTypesOptions: { value: number; label: string }[];
};
export default function AdditionalInvestmentsForm({
  additionalInvestmentForm,
  objectTypesOptions,
}: AdditionalFormProps) {
  const additionalInvestmentFieldArray = useFieldArray({
    control: additionalInvestmentForm.control,
    name: "additionalInvestments",
  });
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
                    isDisabled={true}
                    value={getSelectValue(objectTypesOptions, value)}
                    defaultValue={getSelectValue(objectTypesOptions, value)}
                    handleOnChange={(e) => onChange(e as string)}
                  />
                )}
              />
            </div>

            {reportArray.map((_, reportIndex) => (
              <div
                key={reportIndex}
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
              </div>
            ))}
          </div>
        );
      })}
    </form>
  );
}
