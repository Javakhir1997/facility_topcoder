import {
  Button,
  CheckboxInput,
  FormGrid,
  Input,
  PageLayout,
  PageTitle,
  Select,
} from "@components/index";
import { useSelect } from "@hooks/index";
import { useNavigate } from "react-router-dom";
import { projectScheme } from "@shared/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { BUTTON_THEME, FIELD } from "@shared/constants";
import { ProjectForm } from "@interfaces/projects.interface";
import { getSelectValue, showMessage } from "@shared/utilities";
import useAddProject from "@modules/projects/hooks/useAddProject";

export default function AddProject() {
  const navigate = useNavigate();
  const useAddProjectData = useAddProject();
  const { data: typesData } = useSelect("object-types");
  const { data: districts = [] } = useSelect("districts");
  const { data: organizations } = useSelect("owner-organization");

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

  async function onSubmit(data: ProjectForm) {
    const res = await useAddProjectData.addProject(data);
    if (res) {
      showMessage("Project created successfully", "success");
      navigate(-1);
    }
  }

  const objectTypesOptions = (typesData?.results || []).map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <PageLayout>
      <div className="full-width d-flex justify-center align-center bg-white rounded-2xl px-5">
        <PageTitle title="Project">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button type="submit" theme={BUTTON_THEME.PRIMARY}>
              Send
            </Button>
          </div>
        </PageTitle>
      </div>

      <form
        className="p-10 w-full  bg-white rounded-2xl"
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </form>
    </PageLayout>
  );
}
