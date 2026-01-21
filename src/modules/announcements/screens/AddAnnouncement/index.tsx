import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  Button,
  FormGrid,
  Input,
  Modal,
  NumberFormattedInput,
  PageLayout,
  PageTitle,
  Select,
  MaskInput,
  FileUpLoader,
} from "@app/components";
import {
  BUTTON_THEME,
  FIELD,
  financingOpportunityOptions,
  getSelectValue,
  ownerTypeOptions,
  stabilityRatingOptions,
  techniquesOptions,
} from "@app/shared";
import { appealSchema } from "@app/shared/helpers/yup";
import { useAddAppeal } from "@modules/applications/hooks";
import { CommonService as commonService } from "@app/services";
import styles from "./styles.module.scss";
import { IAppealForm, IFIle } from "@app/interfaces";
import useSelect from "@hooks/useSelect";

interface IProperties {
  edit?: boolean;
}

const Index: FC<IProperties> = ({ edit = false }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [modal, setModal] = useState<string | undefined>(undefined);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(appealSchema(t)),
    defaultValues: {
      owner_type: ownerTypeOptions[0].value?.toString() || "",
      stir: "",
      company_name: "",
      lastname: "",
      firstname: "",
      middle_name: "",
      pinfl: "",
      passport_seria: "",
      passport_number: "",
      address: "",
      phone: "",
      email: "",
      region: undefined,
      district: undefined,
      activity_type: undefined,
      activity_experience: undefined,
      indebtedness_file: undefined,
      stability_rating: undefined,
      success_projects: "",
      success_projects_file: undefined,
      investment_ability: undefined,
      techniques: undefined,
      financing_opportunity: undefined,
      return_on_investment: "false",
      body: "",
    },
  });

  const { data: objects } = useSelect("object");
  const [activeRegion, setActiveRegion] = useState<number | null>(null);

  const ownerType = watch("owner_type");

  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: () => commonService.getRegions(),
  });

  const { data: districts = [] } = useQuery({
    queryKey: ["district", activeRegion],
    queryFn: () => commonService.getDistricts(activeRegion),
    enabled: !!activeRegion,
  });

  const { data: activityTypes = [] } = useQuery({
    queryKey: ["activityTypes"],
    queryFn: () => commonService.getActivityTypes(),
  });

  const { data: organizations } = useSelect("owner-organization");
  const { data: types } = useSelect("object-types-select");

  const { addAppeal, isPending } = useAddAppeal(reset);

  const handleFinalSubmit = handleSubmit((data) => {
    const formData = new FormData();
    if (data.owner_type === "yuridik") {
      formData.append("stir", data.stir || "");
      formData.append("company_name", data.company_name || "");
      formData.append("lastname", data.lastname || "");
      formData.append("firstname", data.firstname || "");
      formData.append("middle_name", data.middle_name || "");
    } else {
      formData.append("lastname", data.lastname || "");
      formData.append("firstname", data.firstname || "");
      formData.append("middle_name", data.middle_name || "");
      formData.append("pinfl", data.pinfl || "");
      formData.append("passport_seria", data.passport_seria || "");
      formData.append("passport_number", data.passport_number || "");
    }

    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    if (data.activity_experience)
      formData.append("activity_experience", String(data.activity_experience));
    formData.append("indebtedness", "true");
    formData.append("success_projects", data.success_projects);
    if (data.investment_ability)
      formData.append("investment_ability", String(data.investment_ability));
    formData.append("return_on_investment", String(data.return_on_investment));
    formData.append("body", data.body);
    formData.append("region", data.region);
    formData.append("district", data.district);

    if (data.region) formData.append("region_by_ball", String(data.region));
    if (data.activity_type)
      formData.append("activity_type", String(data.activity_type));
    if (data.balance_organization)
      formData.append(
        "balance_organization",
        String(data.balance_organization),
      );
    if (data.object_type)
      formData.append("object_type", String(data.object_type));

    data.objects.forEach((num: number) => {
      formData.append("object", num?.toString());
    });

    if (data.stability_rating)
      formData.append("stability_rating", data.stability_rating);
    if (data.techniques) formData.append("techniques", data.techniques);
    if (data.financing_opportunity)
      formData.append("financing_opportunity", data.financing_opportunity);

    if (data.indebtedness_file?.id) {
      formData.append(
        "indebtedness_file",
        data.indebtedness_file?.id?.toString(),
      );
    }
    if (data.success_projects_file?.id) {
      formData.append(
        "success_projects_file",
        data.success_projects_file?.id?.toString(),
      );
    }
    addAppeal(formData as unknown as IAppealForm);
    handleCloseModal();
  });

  const handleCloseModal = () => {
    setModal(undefined);
  };

  console.log(errors, "errors");

  return (
    <PageLayout>
      <PageTitle title={edit ? t("Add announcement") : t("Add announcement")} />
      <FormGrid onSubmit={handleSubmit(handleFinalSubmit as unknown as never)}>
        <Controller
          name="owner_type"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="owner_type"
              {...field}
              value={getSelectValue(ownerTypeOptions, field.value)}
              options={ownerTypeOptions}
              label={t("appeals.person_type")}
              error={error?.message}
              placeholder="Select owner type"
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />
        {ownerType === "yuridik" ? (
          <>
            <Controller
              name="stir"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MaskInput
                  {...field}
                  mask={"999999999"}
                  placeholder={t("appeals.stir")}
                  id="stir"
                  label={t("appeals.stir")}
                  error={error?.message}
                />
              )}
            />
          </>
        ) : (
          <>
            <Controller
              name="pinfl"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MaskInput
                  {...field}
                  mask={"99999999999999"}
                  placeholder={t("appeals.pinfl")}
                  id="pinfl"
                  label={t("appeals.pinfl")}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="passport_seria"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MaskInput
                  {...field}
                  mask={"aa"}
                  placeholder={t("passport_seria")}
                  id="pinfl"
                  label={t("passport_seria")}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="passport_number"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MaskInput
                  {...field}
                  mask={"9999999"}
                  placeholder={t("appeals.passport_number")}
                  id="pinfl"
                  label={t("appeals.passport_number")}
                  error={error?.message}
                />
              )}
            />
          </>
        )}
        <Controller
          name="lastname"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="lastname"
              {...field}
              label={t("appeals.surname")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="firstname"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="firstname"
              {...field}
              label={t("appeals.name")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="middle_name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="middle_name"
              {...field}
              value={field.value?.toString()}
              label={t("appeals.middle_name")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="region"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="region"
              {...field}
              options={regions}
              value={getSelectValue(regions, field.value)}
              label={t("Region")}
              error={error?.message}
              handleOnChange={(e) => {
                field.onChange(e as string);
                setActiveRegion(e as number);
              }}
            />
          )}
        />
        <Controller
          name="district"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="distrcit"
              {...field}
              options={districts}
              value={getSelectValue(districts, field.value)}
              label={t("district")}
              error={error?.message}
              handleOnChange={(e) => {
                field.onChange(e as string);
              }}
            />
          )}
        />
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="address"
              {...field}
              label={t("appeals.address")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="company_name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="company_name"
              {...field}
              label={t("appeals.organization_name")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <MaskInput
              {...field}
              placeholder={t("appeals.phone_number")}
              id="phone"
              label={t("appeals.phone_number")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="email"
              {...field}
              type="email"
              label={t("Email")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="activity_type"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="activity_type"
              {...field}
              options={activityTypes}
              value={getSelectValue(activityTypes, field.value)}
              label={t("appeals.activity_type")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />
        <Controller
          name="activity_experience"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="activity_experience"
              {...field}
              type="number"
              label={t("appeals.work_experience_years")}
              error={error?.message}
            />
          )}
        />
        <Controller
          name="stability_rating"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="stability_rating"
              {...field}
              value={getSelectValue(stabilityRatingOptions, field.value)}
              options={stabilityRatingOptions}
              label={t("appeals.credit_history")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />

        <Controller
          name="investment_ability"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <NumberFormattedInput
              {...field}
              id="investment_ability"
              label={t("appeals.investment_amount_mln")}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="indebtedness"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="indebtedness"
              {...field}
              value={getSelectValue(
                [
                  { value: "true", label: "Ha" },
                  { value: "false", label: "Yo'q" },
                ],
                field.value,
              )}
              options={[
                { value: "true", label: "Ha" },
                { value: "false", label: "Yo'q" },
              ]}
              label={t("Bank maʼlumoti, qarzdorligi mavjud yoki yo‘qligi")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />

        <Controller
          name="indebtedness_file"
          control={control}
          render={({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <FileUpLoader
              id="indebtedness_file"
              ref={ref}
              value={value as unknown as IFIle}
              onBlur={onBlur}
              onChange={onChange}
              label={t("appeals.debt_certificate")}
              error={error?.message}
            />
          )}
        />

        <Controller
          name="success_projects"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="success_projects"
              {...field}
              label={t("appeals.successful_projects_text")}
              error={error?.message}
              className={styles.fullWidth}
            />
          )}
        />

        <Controller
          name="success_projects_file"
          control={control}
          render={({ field: { value, ref, onChange, onBlur } }) => {
            return (
              <FileUpLoader
                id="success_projects_file"
                ref={ref}
                value={value as unknown as IFIle}
                onBlur={onBlur}
                onChange={onChange}
                label={t("DXSH amalga oshirilgan ijobiy loyihalar fayli")}
              />
            );
          }}
        />

        <Controller
          name="techniques"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="techniques"
              {...field}
              value={getSelectValue(techniquesOptions, field.value)}
              options={techniquesOptions}
              label={t("appeals.existing_techniques")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />

        <Controller
          name="financing_opportunity"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="financing_opportunity"
              {...field}
              value={getSelectValue(financingOpportunityOptions, field.value)}
              options={financingOpportunityOptions}
              label={t("appeals.project_financing_opportunity")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />

        <Controller
          name="return_on_investment"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Select
              id="return_on_investment"
              {...field}
              value={getSelectValue(
                [
                  { value: "true", label: "Ha" },
                  { value: "false", label: "Yo'q" },
                ],
                field.value,
              )}
              options={[
                { value: "true", label: "Ha" },
                { value: "false", label: "Yo'q" },
              ]}
              label={t("investment_type")}
              error={error?.message}
              handleOnChange={(e) => field.onChange(e as string)}
            />
          )}
        />

        <Controller
          name="object_type"
          control={control}
          render={({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              id="object_type"
              options={types}
              onBlur={onBlur}
              label="WMF type"
              error={error?.message}
              value={getSelectValue(types, value)}
              placeholder="Select WMF type"
              isMulti={true}
              defaultValue={getSelectValue(types, value)}
              handleOnChange={(e) => {
                onChange(e as string);
              }}
            />
          )}
        />

        <Controller
          name="balance_organization"
          control={control}
          render={({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              id="balance_organization"
              options={organizations}
              onBlur={onBlur}
              label="Balance holding organization"
              error={error?.message}
              isMulti={true}
              value={getSelectValue(organizations, value)}
              defaultValue={getSelectValue(organizations, value)}
              handleOnChange={(e) => {
                onChange(e as string);
              }}
            />
          )}
        />

        <Controller
          name="objects"
          control={control}
          render={({
            field: { value, ref, onChange, onBlur },
            fieldState: { error },
          }) => (
            <Select
              ref={ref}
              id="objects"
              options={objects}
              onBlur={onBlur}
              isMulti={true}
              label="Objects"
              error={error?.message}
              value={getSelectValue(objects, value as unknown as number)}
              placeholder="Select object"
              defaultValue={getSelectValue(objects, value as unknown as number)}
              handleOnChange={(e) => onChange(e as string)}
            />
          )}
        />

        <Controller
          name="body"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              id="body"
              {...field}
              textarea
              label={t("Appeal content")}
              error={error?.message}
              className={styles.fullWidth}
            />
          )}
        />

        <div className="flex justify-between col-span--2 grid-row--10">
          <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
            {t("appeals.back")}
          </Button>

          <Button
            type={FIELD.SUBMIT}
            theme={BUTTON_THEME.PRIMARY}
            disabled={isPending}
          >
            {t("Create announcement")}
          </Button>
        </div>
      </FormGrid>

      <Modal
        animation="flip"
        visible={!!modal}
        times={true}
        onClose={handleCloseModal}
        styles={{ width: "50vw", height: "auto", padding: "20px" }}
      >
        <div className={styles.modal}>
          <h3>{t("Murojaatni tasdiqlang")}</h3>
          <p>
            {t(
              "Kiritilgan ma'lumotlarni tekshirib, yuborish tugmasini bosing.",
            )}
          </p>
        </div>

        <div className="flex gap--lg items-center justify-center mt-4">
          <Button
            type={FIELD.BUTTON}
            theme={BUTTON_THEME.PRIMARY_OUTLINE}
            disabled={isPending}
            onClick={handleCloseModal}
          >
            {t("appeals.edit")}
          </Button>

          <Button
            type={FIELD.BUTTON}
            onClick={handleFinalSubmit}
            theme={BUTTON_THEME.PRIMARY}
            disabled={isPending}
          >
            {t("appeals.submit")}
          </Button>
        </div>
      </Modal>
    </PageLayout>
  );
};

export default Index;
