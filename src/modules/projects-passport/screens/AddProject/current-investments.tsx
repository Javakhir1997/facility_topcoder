import {
  FileUpLoader,
  Input,
  NumberFormattedInput,
  Select,
} from "@components/UI";
import { ICurrentInvestmentForm } from "@interfaces/projectsPassport.interface";
import { FIELD } from "@shared/constants";
import { getSelectValue } from "@shared/utilities";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
type Object = {
  value: number;
  label: string;
};
type CurrentInvestmentsProps = {
  objects: Object[];
  investmentForm: UseFormReturn<ICurrentInvestmentForm>;
  objectTypesOptions: { value: number; label: string }[];
};
export default function CurrentInvestments({
  investmentForm,
  objectTypesOptions,
}: CurrentInvestmentsProps) {
  const investmentFieldArray = useFieldArray({
    control: investmentForm.control,
    name: "investments",
  });
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
                    isDisabled={true}
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
                    </div>
                  ))}
                </>
              )}
            />
          </div>
        );
      })}
    </form>
  );
}
