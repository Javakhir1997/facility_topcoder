import {
  Button,
  CheckboxInput,
  FormGrid,
  Input,
  Loader,
  NumberFormattedInput,
  PageLayout,
  PageTitle,
  Select,
} from "@components/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDistricts, useSelect } from "@hooks/index";
import {
  EProjectToEdit,
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
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PtojectFiles from "./eproject-files";
import ProjectPlans from "./eproject-plans";
import CurrentInvestments from "./ecurrent-investments";
import AdditionalInvestmentsForm from "./eadditional-form";
import Monitoring from "./emonitoring";
import {
  useEditAddInvestment,
  useEditMonitoring,
  useEditPlan,
  useEditProjectPassport,
  useProjectPassportDetail,
} from "@modules/projects-passport/hooks";
import useAddProjectPassport from "@modules/projects-passport/hooks/addProjectPassport";
import { useNavigate } from "react-router-dom";
import useInvestment from "@modules/projects-passport/hooks/useEditInvestment";
import WarningModal from "@modules/projects-passport/components/WarningModal/warning-modal";
import PermissionModal from "@modules/projects-passport/components/PermissionModal/permission-modal";

interface SelectOption {
  value: number;
  label: string;
  type?: string;
}

interface UseSelectResponse {
  data: SelectOption[];
}

export default function EditProjectPassportTest() {
  const { data: allObjects } = useSelect("object");
  const [projectPassportToEdit, setProjectPassportToEdit] = useState<
    number | null
  >(null);
  const {
    data: Project,
    isPending,
    isFetching,
  }: {
    data: EProjectToEdit;
    isPending: boolean;
    isFetching: boolean;
  } = useProjectPassportDetail();

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
      files: [{ file: null }],
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
              id: Math.random(),
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
              id: Math.random(),
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
              id: Math.random(),
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
  console.log(investmentForm.watch("investments"));
  useEffect(() => {
    if (!Project || isFetching) return;

    setProjectPassportToEdit(Project.id);

    generalForm.reset({
      code: Project.code,
      region: Project?.region?.id,
      districts: Project.districts.map((item) => item.id),
      owner_organization: Project?.owner_organization.id,
      object: Project.object.map((item) => item.id),
      private_partner: Project.private_partner,
      stir: Project.stir,
      registry_number: Project.registry_number,
      interval_years: Project.interval_years,
      contract_term: Project.contract_term,
      project_price: String(Project.project_price),
      status: Project.status,
    });

    projectFilesForm.reset({
      files:
        Project.files?.map((item) => ({
          file: item? {
            id: item.id,
            name: item.name,
          }:null,
        })) || [],
    });

    const groupedPlans = new Map<
      string,
      {
        object: string;
        object_type: number;
        report: {
          id: number;
          plan: string;
          price: string;
          date: number | null;
        }[];
      }
    >();
    Project.project_plans?.forEach((item) => {
      const key = `${item?.project?.id}-${item?.draft}`;
      if (!groupedPlans.has(key)) {
        groupedPlans.set(key, {
          object: item.draft,
          object_type: item.object_type.id,
          report: [],
        });
      }
      groupedPlans.get(key)!.report.push({
        id: item?.id,
        plan: item.plan,
        price: String(item.price),
        date: item.date,
      });
    });
    projectPlan.reset({
      plans: Array.from(groupedPlans.values()),
    });

    // Current Investment Form reset
    const groupedFacts = new Map<
      string,
      {
        project: number;
        object: string;
        object_type: number;
        report: {
          id: number;
          fact: string;
          price: string;
          date: string;
          file: {
            id: number;
            file: string;
            name: string;
          };
        }[];
      }
    >();
    Project.facts?.forEach((item) => {
      const key = `${item?.project?.id}-${item?.draft}`;
      if (!groupedFacts.has(key)) {
        groupedFacts.set(key, {
          project: item.project?.id,
          object_type: item.object_type.id,
          object: item.draft,
          report: [],
        });
      }
      groupedFacts.get(key)!.report.push({
        id: item.id,
        fact: item.fact,
        price: String(item.price),
        date: item.date,
        file: item.file
          ? {
              id: item?.file?.id,
              file: item.file?.file ? item.file?.file : "",
              name:
                item.file?.file &&
                item.file.file.replace(
                  "http://dxsh.technocorp.uz/media/attachments/",
                  ""
                ),
            }
          : null,
      });
    });
    investmentForm.reset({
      investments: Array.from(groupedFacts.values()),
    });
    // Additional Investment Form reset
    const groupedAdditionalInv = new Map<
      string,
      {
        project: number;
        object: string;
        object_type: number;
        report: {
          id: number;
          addition: string;
          price: string;
          date: string;
          file: {
            id: number;
            file: string;
            name: string;
          };
        }[];
      }
    >();
    Project.additional?.forEach((item) => {
      const key = `${item?.project?.id}-${item?.draft}`;
      if (!groupedAdditionalInv.has(key)) {
        groupedAdditionalInv.set(key, {
          project: item.project?.id,
          object_type: item.object_type.id,
          object: item.draft,
          report: [],
        });
      }
      groupedAdditionalInv.get(key)!.report.push({
        addition: item.addition,
        price: String(item.price),
        date: item.date,
        id: item.id,
        file: item.file
          ? {
              id: item?.file?.id,
              file: item.file?.file,
              name:
                item.file?.file &&
                item.file.file.replace(
                  "http://dxsh.technocorp.uz/media/attachments/",
                  ""
                ),
            }
          : null,
      });
    });
    additionalInvestmentForm.reset({
      additionalInvestments: Array.from(groupedAdditionalInv.values()),
    });

    monitoringForm.reset({
      items:
        Project.monitoring?.map((item) => ({
          backend_id: item.id,
          id: item.id,
          project: item.project.id,
          date: item.date,
          comment: item.comment,
          file: item.file
            ? {
                id: item?.file?.id,
                file: item.file?.file,
                name:
                  item.file?.file &&
                  item.file.file.replace(
                    "http://dxsh.technocorp.uz/media/attachments/",
                    ""
                  ),
              }
            : null,
        })) || [],
    });
  }, [
    Project,
    isFetching,
    generalForm,
    projectFilesForm,
    projectPlan,
    investmentForm,
    additionalInvestmentForm,
    monitoringForm,
  ]);
  const editProjectPassportData = useEditProjectPassport();
  const onEditGeneral = async () => {
    const isFilesValid = await projectFilesForm.trigger();
    if (!isFilesValid) {
      console.log("Files form is not valid");
      return;
    }
    const filesData = projectFilesForm.getValues();
    const files = await onEditFiles(filesData);

    generalForm.setValue("files", files);

    const finalData = generalForm.getValues();

    const response = await editProjectPassportData.editProjectPassort({
      data: finalData,
      id: projectPassportToEdit,
    });
    return response;
  };
  const onEditFiles = async (data: IAddProjectFilesForm) => {
    const datas = data.files.map((item) => item?.file?.id).filter(Boolean);
    return datas;
  };

  const useEditPlanData = useEditPlan();
  const onEditPlans = async (data: IProjectPlanForm) => {
    const updated = {
      plans: data.plans.map(({ object, report, ...rest }) => ({
        draft: object,
        project: projectPassportToEdit,
        ...rest,
        report: report.map((r) => ({
          ...r,
          id: r.id > 1 ? r.id : -1,
        })),
      })),
    };
    const res = await useEditPlanData.editPlan({ updated });
    return res;
  };
  const useEditInvestmentData = useInvestment();
  const onEditInvestments = async (data: ICurrentInvestmentForm) => {
    const updated = {
      plans: data.investments.map(({ object, report, ...rest }) => ({
        draft: object,
        project: projectPassportToEdit,
        ...rest,
        report: report.map(({ file, ...r }) => ({
          ...r,
          file: file?.id,
          id: r.id > 1 ? r.id : -1,
        })),
      })),
    };
    const res = await useEditInvestmentData.editInvestment(updated);
    return res;
  };

  const useEditAddInvestmentData = useEditAddInvestment();
  const onEditAdditonalInvestments = async (
    data: IAdditionalInvestmentForm
  ) => {
    const updated = {
      additionals: data.additionalInvestments.map(
        ({ object, report, ...rest }) => ({
          draft: object,
          project: projectPassportToEdit,
          ...rest,
          report: report.map(({ file, ...r }) => ({
            ...r,
            file: file?.id,
            id: r.id > 1 ? r.id : -1,
          })),
        })
      ),
    };
    const res = await useEditAddInvestmentData.editAddInvestment(updated);
    return res;
  };

  const useEditMonitoringData = useEditMonitoring();
  const onEditMonitoring = async (data: IMonitoringForm) => {
    const updated = {
      items: data.items.map(({ file, ...rest }) => ({
        ...rest,
        backend_id: rest.backend_id > 1 ? rest.backend_id : -1,
        id: rest.id > 1 ? rest.id : -1,
        file: file?.id,
      })),
    };

    const res = await useEditMonitoringData.editMonitoring(updated);
    return res;
  };

  const navigate = useNavigate();

  const [isDownloading, setIsDownloading] = useState(false)
  async function submitAllForms() {
    setIsDownloading(true)
    const isGeneralFormValid = await generalForm.trigger();
    if (!isGeneralFormValid) {
      console.log("General form is not valid");
      return;
    }

    const isFilesValid = await projectFilesForm.trigger();
    if (!isFilesValid) {
      console.log("Files form is not valid");
      return;
    }
    const isPlansValid = await projectPlan.trigger();

    if (!isPlansValid) {
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
      console.log("Additional investment form is not valid");
      return;
    }
    const isMonitoringValid = await monitoringForm.trigger();
    if (!isMonitoringValid) {
      console.log("Monitoring form is not valid");
      return;
    }
    const resOfGeneral = await onEditGeneral();
    const planData = projectPlan.getValues();
    const resOfPlans = await onEditPlans(planData);

    const investmentData = investmentForm.getValues();
    const resOfInvestment = await onEditInvestments(investmentData);
    const addInvestmentData = additionalInvestmentForm.getValues();
    const resOfAddInvestment = await onEditAdditonalInvestments(
      addInvestmentData
    );
    const monitoringData = monitoringForm.getValues();
    const resOfMonitoring = await onEditMonitoring(monitoringData);
    if (
      resOfGeneral &&
      resOfPlans &&
      resOfInvestment &&
      resOfAddInvestment &&
      resOfMonitoring
    ) {
      setIsDownloading(false)
      showMessage("All data has been updated successfully", "success");
      navigate(-1);
    }
  }
  const { data: typesData } = useSelect("object-types");
  const objectTypesOptions = (typesData?.results || []).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  

  if (isPending || isFetching || !Project) {
    return <Loader />;
  }
  console.log(Project);
  return (
    <PageLayout>
      <PageTitle title="Create project passport" />
      <div style={{ marginTop: "20px" }}></div>
      <>
        <Title title="General information" />
        <form>
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
        </form>
      </>

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
            projectPassportToEdit={projectPassportToEdit}
            projectPlan={projectPlan}
            objectTypesOptions={objectTypesOptions}
          />
        </>

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
              investmentForm={investmentForm}
              objectTypesOptions={objectTypesOptions}
              projectPassportToEdit={projectPassportToEdit}
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
              projectPassportToEdit={projectPassportToEdit}
              additionalInvestmentForm={additionalInvestmentForm}
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
            theme={BUTTON_THEME.WARNING}
            disabled={addProjectPassportData.isPending || isDownloading}
            big={true}
            onClick={() => submitAllForms()}
          >
            Update
          </Button>
        </div>
      </>
      
    </PageLayout>
  );
}
