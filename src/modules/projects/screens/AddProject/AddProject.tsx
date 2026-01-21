import {
  Button,
  CheckboxInput,
  FormGrid,
  Input,
  PageLayout,
  PageTitle,
  Select,
} from "@components/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelect } from "@hooks/index";
import { ProjectForm } from "@interfaces/projects.interface";
import useAddProject from "@modules/projects/hooks/useAddProject";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { projectScheme } from "@shared/helpers";
import { getSelectValue, showMessage } from "@shared/utilities";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function AddProject() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectForm>({
    defaultValues: {
      name: "",
      type: null,
      owner_organization: null,
      district: [],
      address: "",
      used: false,
      investment_plan_created: false,
    },
    resolver: yupResolver(projectScheme),
  });
  const useAddProjectData = useAddProject();
  const navigate=useNavigate()
  async function onSubmit(data: ProjectForm) {
    const res = await useAddProjectData.addProject(data);
    if (res) {
      showMessage("Project created successfully","success");
      navigate(-1)
    }
  }
  const { data: organizations } = useSelect("owner-organization");
  const { data: districts = [] } = useSelect("districts");
  const { data: typesData } = useSelect("object-types");

  const objectTypesOptions = (typesData?.results || []).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <PageLayout>
      <PageTitle title="Project" />
      <div style={{ marginTop: "20px" }}></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGrid>
          <Input
            id="name"
            type={FIELD.TEXT}
            label="Object name"
            placeholder="Enter object name"
            error={errors.name?.message}
            {...register("name")}
          />
          <Controller
            name="type"
            control={control}
            render={({ field: { value, ref, onChange, onBlur } }) => (
              <Select
                ref={ref}
                id="type"
                options={objectTypesOptions}
                onBlur={onBlur}
                label="Type"
                placeholder="Select type"
                error={errors?.type?.message}
                value={getSelectValue(objectTypesOptions, value)}
                defaultValue={getSelectValue(objectTypesOptions, value)}
                handleOnChange={(e) => onChange(e as string)}
              />
            )}
          />
          <Controller
            name="owner_organization"
            control={control}
            render={({ field: { value, ref, onChange, onBlur } }) => (
              <Select
                ref={ref}
                id="balanceHolder"
                options={organizations}
                onBlur={onBlur}
                label="Balance holding organization"
                placeholder="Select balance holding organization"
                error={errors?.owner_organization?.message}
                value={getSelectValue(organizations, value)}
                defaultValue={getSelectValue(organizations, value)}
                handleOnChange={(e) => onChange(e as string)}
              />
            )}
          />
          <Controller
            name="district"
            control={control}
            render={({ field: { value, ref, onChange, onBlur } }) => (
              <Select
                ref={ref}
                id="districts"
                options={districts}
                onBlur={onBlur}
                label="Districts"
                isMulti={true}
                error={errors?.district?.message}
                value={getSelectValue(districts, value)}
                placeholder="Select districts"
                defaultValue={getSelectValue(districts, value)}
                handleOnChange={(e) => onChange(e as string[])}
              />
            )}
          />
          <Input
            id="addess"
            type={FIELD.TEXT}
            label="Address"
            placeholder="Enter address"
            error={errors.address?.message}
            {...register("address")}
          />
          <Controller
            name="used"
            control={control}
            render={({ field }) => (
              <CheckboxInput
                id="used"
                label="Project status"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
          <Controller
            name="investment_plan_created"
            control={control}
            render={({ field }) => (
              <CheckboxInput
                id="investment_plan_created"
                label="Investment plan created"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </FormGrid>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "40px",
            marginRight: "40px",
          }}
        >
          <Button type="submit" theme={BUTTON_THEME.PRIMARY}>
            Send
          </Button>
        </div>
      </form>
    </PageLayout>
  );
}
