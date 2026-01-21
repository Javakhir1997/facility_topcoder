import {
  Button,
  CheckboxInput,
  FormGrid,
  Input,
  NumberFormattedInput,
  PageLayout,
  PageTitle,
  Select,
} from "@components/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDistricts, useSelect } from "@hooks/index";
import {
  IAdditionalInvestmentForm,
  IAddProjectFilesForm,
  IAddProjectPassportForm,
  ICurrentInvestmentForm,
  IMonitoringForm,
  IProjectPlanForm,
} from "@interfaces/projectsPassport.interface";
import Title from "@modules/projects-passport/components/Title/title";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import {
  additionalInvestmentScheme,
  addProjectFilesScheme,
  addProjectPassportScheme,
  currentInvestmentScheme,
  monitoringScheme,
  projectPlanScheme,
} from "@shared/helpers";
import { getSelectValue, showMessage } from "@shared/utilities";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PtojectFiles from "./project-files";
import ProjectPlans from "./project-plans";
import CurrentInvestments from "./current-investments";
import AdditionalInvestmentsForm from "./additional-form";
import Monitoring from "./monitoring";
import {
  useAddAdditionalInvestment,
  useAddInvestment,
  useAddMonitoring,
  useAddProjectPlans,
  useProjectPlanObjects,
} from "@modules/projects-passport/hooks";
import useAddProjectPassport from "@modules/projects-passport/hooks/addProjectPassport";
import { useNavigate } from "react-router-dom";

interface SelectOption {
  value: number;
  label: string;
  type?: string;
}

interface UseSelectResponse {
  data: SelectOption[];
}

export default function AddProjectPassport() {
  const { data: allObjects } = useSelect("object");
  const [projectPassportToEdit, setProjectPassportToEdit] = useState<
    number | null
  >(null);
  const [isplanSaved, setIsplanSaved] = useState(false);
  const [isGeneralSubmitted, setIsGeneralSubmitted] = useState(false);
  const generalForm = useForm<IAddProjectPassportForm>({
    mode: "onTouched",
    defaultValues: {
      code: null,
      region: null,
      districts: [],
      owner_organization: null,
      object: [],
      private_partner: "",
      stir: "",
      registry_number: "", 
      interval_years: "",
      contract_term: null,
      project_price: "",
      status: false,
    },
    resolver: yupResolver(addProjectPassportScheme),
  });
  const projectFilesForm = useForm<IAddProjectFilesForm>({
    mode: "onTouched",
    defaultValues: {
      files: [{ file: undefined }],
    },
    resolver: yupResolver(addProjectFilesScheme),
  });
  const projectPlan = useForm<IProjectPlanForm>({
    mode: "onTouched",
    defaultValues: {
      plans: [
        {
          object: "",
          object_type: null,
          project: projectPassportToEdit,
          report: [
            {
              id: null,
              plan: "",
              price: "",
              date: null,
            },
          ],
        },
      ],
    },
    resolver: yupResolver(projectPlanScheme),
  });

  const investmentForm = useForm<ICurrentInvestmentForm>({
    mode: "onTouched",
    defaultValues: {
      investments: [
        {
          project: projectPassportToEdit,
          object: "",
          object_type: null,
          report: [
            {
              fact: "",
              price: "",
              date: "",
              file: null,
            },
          ],
        },
      ],
    },
    resolver: yupResolver(currentInvestmentScheme),
  });

  const additionalInvestmentForm = useForm<IAdditionalInvestmentForm>({
    mode: "onTouched",
    defaultValues: {
      additionalInvestments: [
        {
          project: projectPassportToEdit,
          object: "",
          object_type: null,
          report: [
            {
              addition: "",
              price: "",
              date: "",
              file: null,
            },
          ],
        },
      ],
    },
    resolver: yupResolver(additionalInvestmentScheme),
  });
  const monitoringForm = useForm<IMonitoringForm>({
    mode: "onTouched",
    defaultValues: {
      items: [
        { project: projectPassportToEdit, date: "", file: null, comment: "" },
      ],
    },
    resolver: yupResolver(monitoringScheme),
  });
  const { data: regions } = useSelect("region") as UseSelectResponse;
  const { data: organizations } = useSelect(
    "owner-organization",
    { region: String(generalForm.watch("region") || "") },
    !!generalForm.watch("region")
  ) as UseSelectResponse;
  const regionId = generalForm.watch("region");
  const { data: districts = [] } = useDistricts(regionId);
  const addProjectPassportData = useAddProjectPassport();

  const onSubmitGeneral = async () => {
    const isFilesValid = await projectFilesForm.trigger();
    if (!isFilesValid) {
      console.log("Files form is not valid");
      return;
    }
    const filesData = projectFilesForm.getValues();
    const files = await onSubmitFiles(filesData);

    generalForm.setValue("files", files);

    const finalData = generalForm.getValues();

    const response = await addProjectPassportData.addProjectPassort(finalData);
    setProjectPassportToEdit(response.id);
    projectPlan.reset({
      plans: [
        {
          object: "",
          project: response.id,
          object_type: null,
          report: [
            {
              plan: "",
              price: "",
              date: null,
            },
          ],
        },
      ],
    });
    investmentForm.reset({
      investments: [
        {
          project: response.id,
          object: "",
          object_type: null,
          report: [
            {
              fact: "",
              price: "",
              date: "",
              file: null,
            },
          ],
        },
      ],
    });
    additionalInvestmentForm.reset({
      additionalInvestments: [
        {
          project: response.id,
          object: "",
          object_type: null,
          report: [
            {
              addition: "",
              price: "",
              date: "",
              file: null,
            },
          ],
        },
      ],
    });
    monitoringForm.reset({
      items: [{ project: response.id, date: "", file: null, comment: "" }],
    });
    setIsGeneralSubmitted(true);
    return response;
  };

  const onSubmitFiles = async (data: IAddProjectFilesForm) => {
    const datas = data.files.map((item) => {
      return item?.file?.id;
    });

    return datas;
  };

  const addProjectPlansData = useAddProjectPlans();
  const onSubmitPlans = async (data: IProjectPlanForm) => {
    const items = data.plans.flatMap((plan) => {
      const projectId = plan.project;

      return plan.report.map((reportItem) => {
        return {
          project: projectId,
          draft: plan.object,
          object_type: Number(plan.object_type),
          plan: reportItem.plan,
          price: Number(reportItem.price),
          date: reportItem.date,
        };
      });
    });
    const res = await addProjectPlansData.addProjectPlan({ items });
    return res;
  };
  async function onSavePlans() {
    const data = projectPlan.getValues();
    const isPlanValid = await projectPlan.trigger();
    if (!isPlanValid) {
      console.log("Plan is not valid");
      return;
    }
    const investments = data.plans.map((plan) => ({
      object: plan.object,
      project: plan.project,
      object_type: plan.object_type,
      report: plan.report.map(() => ({
        fact: "",
        price: "",
        date: "",
        file: null,
      })),
    }));
    const additionalInvestments = data.plans.map((plan) => ({
      object: plan.object,
      project: plan.project,
      object_type: plan.object_type,
      report: plan.report.map(() => ({
        addition: "",
        price: "",
        date: "",
        file: null,
      })),
    }));

    investmentForm.reset({ investments });
    additionalInvestmentForm.reset({ additionalInvestments });
    setIsplanSaved(true);
  }
console.log(investmentForm.watch("investments"))
  const addInvestmentsData = useAddInvestment();
  const onSubmitInvestments = async (data: ICurrentInvestmentForm) => {
    const items = data.investments.flatMap((invest) => {
      const projectId = invest.project;
      return invest.report.map((reportItem) => {
        return {
          project: projectId,
          draft: invest.object,
          object_type: Number(invest.object_type),
          fact: reportItem.fact,
          price: Number(reportItem.price),
          date: reportItem.date,
          file: reportItem?.file?.id,
        };
      });
    });
    const res = await addInvestmentsData.addInvestment({ items });
    return res;
  };
  const addAdditionalInvestmentsData = useAddAdditionalInvestment();
  const onSubmitAdditonalInvestments = async (
    data: IAdditionalInvestmentForm
  ) => {
    const items = data.additionalInvestments.flatMap((invest) => {
      const projectId = invest.project;
      return invest.report.map((reportItem) => {
        return {
          project: projectId,
          draft: invest.object,
          object_type: Number(invest.object_type),
          addition: reportItem.addition,
          price: Number(reportItem.price),
          date: reportItem.date,
          file: reportItem?.file?.id,
        };
      });
    });
    const res = await addAdditionalInvestmentsData.addInvestment({ items });
    return res;
  };

  const addMonitoringData = useAddMonitoring();
  const onSubmitMonitoring = async (data: IMonitoringForm) => {
    const transformedData = data.items.map((item) => ({
      ...item,
      file: item?.file?.id ?? null,
    }));
    const res = addMonitoringData.addMonitoring(transformedData);
    return res;
  };
  const useProjectPlanObjectsData = useProjectPlanObjects();
  const objects = useMemo(() => {
    const results = useProjectPlanObjectsData?.projectsPlan;
    if (results) {
      return results.map((item: { id: number; name: string }) => ({
        value: item.id,
        label: item.name,
      }));
    }
    return [];
  }, [useProjectPlanObjectsData?.projectsPlan]);

  const navigate = useNavigate();

  async function submitAllForms() {
    const isPlanValid = await projectPlan.trigger();
    if (!isPlanValid) {
      console.log("Plan form is not valid");
      return;
    }

    const isInvestmentValid = await investmentForm.trigger();
    if (!isInvestmentValid) {
      console.log("Investment form is not valid");
      return;
    }

    const isAddInvestmentValid = await additionalInvestmentForm.trigger();
    if (!isAddInvestmentValid) {
      console.log("Additional form is not valid");
      return;
    }

    const isMonitoringValid = await monitoringForm.trigger();
    if (!isMonitoringValid) {
      console.log("Monitoring form is not valid");
      return;
    }
    const planData = projectPlan.getValues();
    const responseOfPlans = await onSubmitPlans(planData);
    const investmentData = investmentForm.getValues();
    const responseOfInvestment = await onSubmitInvestments(investmentData);
    const addInvestmentData = additionalInvestmentForm.getValues();
    const responseOfAddInvestment = await onSubmitAdditonalInvestments(
      addInvestmentData
    );
    const addMonitoringData = monitoringForm.getValues();
    const responseOfMonitoring = await onSubmitMonitoring(addMonitoringData);
    if (
      responseOfPlans &&
      responseOfInvestment &&
      responseOfAddInvestment &&
      responseOfMonitoring
    ) {
      showMessage("All data has been sent successfully.", "success");
      setTimeout(() => {
        navigate("https://dxsh.technocorp.uz");
      }, 500);
    }
  }

  const { data: typesData } = useSelect("object-types");

  const objectTypesOptions = (typesData?.results || []).map((item) => ({
    value: item.id,
    label: item.name,
  }));
  console.log(projectFilesForm.watch("files"));
  return (
    <PageLayout>
      <PageTitle title="Create project passport" />
      <div style={{ marginTop: "20px" }}></div>
      <>
        <Title title="General information" />
        <form onSubmit={generalForm.handleSubmit(onSubmitGeneral)}>
          <FormGrid>
            <Controller
              name="region"
              control={generalForm.control}
              render={({ field: { value, ref, onChange, onBlur } }) => (
                <Select
                  ref={ref}
                  id="region"
                  options={regions}
                  onBlur={onBlur}
                  label="Region object"
                  isMulti={false}
                  error={generalForm.formState.errors?.region?.message}
                  value={getSelectValue(regions, value)}
                  placeholder="Select region object"
                  defaultValue={getSelectValue(regions, value)}
                  handleOnChange={(e) => {
                    onChange(Number(e));
                  }}
                />
              )}
            />

            <Controller
              name="districts"
              control={generalForm.control}
              render={({ field: { value, ref, onChange, onBlur } }) => (
                <Select
                  ref={ref}
                  id="districts"
                  options={districts}
                  onBlur={onBlur}
                  label="Districts"
                  isMulti={true}
                  error={generalForm.formState.errors?.districts?.message}
                  value={getSelectValue(districts, value)}
                  placeholder="Select districts"
                  defaultValue={getSelectValue(districts, value)}
                  handleOnChange={(e) => onChange(e as string[])}
                />
              )}
            />

            <Controller
              name="owner_organization"
              control={generalForm.control}
              render={({ field: { value, ref, onChange, onBlur } }) => (
                <Select
                  ref={ref}
                  id="balanceHolder"
                  options={organizations}
                  onBlur={onBlur}
                  label="Balance holding organization"
                  placeholder="Select balance holding organization"
                  error={
                    generalForm.formState.errors?.owner_organization?.message
                  }
                  value={getSelectValue(organizations, value)}
                  defaultValue={getSelectValue(organizations, value)}
                  handleOnChange={(e) => onChange(e as string)}
                />
              )}
            />

            <Controller
              name="object"
              control={generalForm.control}
              render={({ field: { value, ref, onChange, onBlur } }) => (
                <Select
                  ref={ref}
                  id="objects"
                  options={allObjects}
                  onBlur={onBlur}
                  label="Objects"
                  isMulti={true}
                  error={generalForm.formState.errors?.object?.message}
                  value={getSelectValue(allObjects, value)}
                  placeholder="Select objects"
                  defaultValue={getSelectValue(allObjects, value)}
                  handleOnChange={(e) => onChange(e as string[])}
                />
              )}
            />

            <Input
              id="private_partner"
              type={FIELD.TEXT}
              label="Private partner"
              placeholder="Enter private partner"
              error={generalForm.formState.errors.private_partner?.message}
              {...generalForm.register("private_partner")}
            />

            <Controller
              name="stir"
              control={generalForm.control}
              render={({ field }) => (
                <NumberFormattedInput
                  id="stir"
                  maxLength={9}
                  disableGroupSeparators
                  allowDecimals={false}
                  label="STIR"
                  placeholder="Enter STIR"
                  error={generalForm.formState.errors?.stir?.message}
                  {...field}
                />
              )}
            />

            <Input
              id="registry_number"
              label="Registry number"
              placeholder="Enter registry number"
              error={generalForm.formState.errors.registry_number?.message}
              {...generalForm.register("registry_number")}
            />

            <Input
              id="interval_years"
              label="Project years (2025-2030)"
              placeholder="Enter project years"
              error={generalForm.formState.errors.interval_years?.message}
              {...generalForm.register("interval_years")}
            />

            <Controller
              name="contract_term"
              control={generalForm.control}
              render={({ field }) => (
                <NumberFormattedInput
                  id="contract_term"
                  maxLength={3}
                  disableGroupSeparators
                  allowDecimals={false}
                  label="Contract term (year)"
                  placeholder="Enter contract term (year)"
                  error={generalForm.formState.errors?.contract_term?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="project_price"
              control={generalForm.control}
              render={({ field }) => (
                <NumberFormattedInput
                  id="project_price"
                  maxLength={20}
                  disableGroupSeparators={false}
                  allowDecimals={false}
                  label="Project price (mln)"
                  placeholder="Enter project price (mln)"
                  error={generalForm.formState.errors?.project_price?.message}
                  {...field}
                />
              )}
            />

            <Controller
              name="status"
              control={generalForm.control}
              render={({ field }) => (
                <CheckboxInput
                  id="status"
                  label="Project status"
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
          </FormGrid>
          <>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid gray",
                margin: "20px 0",
              }}
            />
            <Title title="Project files" />
            <PtojectFiles
              projectFilesForm={projectFilesForm}
              projectPassportToEdit={projectPassportToEdit}
            />
          </>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              marginTop: "40px",
              marginRight: "40px",
            }}
          >
            <Button
              type="submit"
              theme={BUTTON_THEME.PRIMARY}
              disabled={addProjectPassportData.isPending}
              big={true}
            >
              Send
            </Button>
          </div>
        </form>
      </>

      {isGeneralSubmitted && (
        <>
          <>
            <div
              style={{
                width: "100%",
                borderBottom: "1px solid gray",
                margin: "20px 0",
              }}
            />
            <Title title="Investment plan" />
            <ProjectPlans
              onSavePlans={onSavePlans}
              projectPassportToEdit={projectPassportToEdit}
              objects={objects}
              projectPlan={projectPlan}
              objectTypesOptions={objectTypesOptions}
            />
          </>

          {isplanSaved && (
            <>
              <>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid gray",
                    margin: "20px 0",
                  }}
                />
                <Title title="Current Investment" />

                <CurrentInvestments
                  objects={objects}
                  investmentForm={investmentForm}
                  objectTypesOptions={objectTypesOptions}
                />
              </>

              <>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid gray",
                    margin: "20px 0",
                  }}
                />
                <Title title="Additional Investment" />
                <AdditionalInvestmentsForm
                  additionalInvestmentForm={additionalInvestmentForm}
                  objects={objects}
                  objectTypesOptions={objectTypesOptions}
                />
              </>

              <>
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid gray",
                    margin: "20px 0",
                  }}
                />
                <Title title="Monitoring" />
                <Monitoring
                  projectPassportToEdit={projectPassportToEdit}
                  monitoringForm={monitoringForm}
                />
                <div
                  style={{
                    width: "100%",
                    borderBottom: "1px solid gray",
                    margin: "20px 0",
                  }}
                />
              </>
            </>
          )}
          {isplanSaved && (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                marginTop: "40px",
                marginRight: "40px",
              }}
            >
              <Button
                type="submit"
                theme={BUTTON_THEME.PRIMARY}
                disabled={addProjectPassportData.isPending}
                big={true}
                onClick={() => submitAllForms()}
              >
                Send
              </Button>
            </div>
          )}
        </>
      )}
    </PageLayout>
  );
}
