import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  BUTTON_THEME,
  convertDateFormat,
  FIELD,
  getPlanTableRows,
  getSearchParamsAsObject,
  getSelectValue,
  ROLE_LIST,
  transformYearsToOptions,
} from "@app/shared";
import {
  Button,
  GridWrapper,
  HR,
  Loader,
  PageLayout,
  PageTitle,
  Restricted,
  Row,
  Select,
  Status,
  Tag,
  Wrapper,
} from "@app/components";
import { InvestmentDetailTable } from "@modules/investments/components";
import { usePlanCreatedYears, usePlanDetail } from "@modules/investments/hooks";
import { useApplicationDetail } from "@modules/applicationsOld/hooks";
import { useTranslation } from "react-i18next";

const Index = () => {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { year = "" } = getSearchParamsAsObject(searchParams);
  const { years, isPending: isYearPending } = usePlanCreatedYears();
  const { data: application } = useApplicationDetail();
  const { t } = useTranslation();

  const { isPending: isPlanDetail, planDetail } = usePlanDetail(
    year ? year : years?.years?.[0],
    !!year || !!years?.years?.[0],
  );

  if (isYearPending) {
    return (
      <PageLayout>
        <Loader />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex gap--lg justify-between items-center">
        <Button
          type={FIELD.BUTTON}
          theme={BUTTON_THEME.OUTLINE}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Restricted permittedRole={ROLE_LIST.REGION_OPERATOR}>
          <div className="flex items-center gap--lg">
            <Button
              type={FIELD.BUTTON}
              onClick={() => navigate(`/investments/${id}/add`)}
            >
              Fill in the plan
            </Button>

            <Button
              type={FIELD.BUTTON}
              onClick={() =>
                navigate(
                  `/investments/${planDetail?.id}/edit/?applicationId=${planDetail?.application?.id}`,
                )
              }
            >
              Edit
            </Button>
          </div>
        </Restricted>
      </div>

      <PageTitle title={`ID: ${id}`}>
        <Select
          id="year"
          type="filter"
          options={transformYearsToOptions(years?.years ?? [])}
          value={getSelectValue(
            transformYearsToOptions(years?.years ?? []),
            year ? year : years?.years?.[0],
          )}
          placeholder="Select the year"
          defaultValue={getSelectValue(
            transformYearsToOptions(years?.years ?? []),
            year ? year : years?.years?.[0],
          )}
          handleOnChange={(e) => setSearchParams(e ? { year: String(e) } : {})}
        />
      </PageTitle>

      <Wrapper>
        <div className="flex gap--5xl items-center">
          <Tag title="Application status">
            {application?.status && <Status status={application.status} />}
          </Tag>

          <Tag title="Date" string>
            {convertDateFormat(application?.created_at)}
          </Tag>
        </div>

        <HR />

        <div className="grid grid--cols-1 gap--lg">
          <GridWrapper>
            <Row
              label="Duration (from)"
              value={
                application?.from_date
                  ? `${application?.from_date} ${t("year")}`
                  : ""
              }
            />

            <Row
              label="Duration (to)"
              value={
                application?.to_date
                  ? `${application?.to_date} ${t("year")}`
                  : ""
              }
              background
            />
          </GridWrapper>
        </div>
      </Wrapper>

      <InvestmentDetailTable
        isPending={isPlanDetail}
        data={getPlanTableRows(planDetail)}
      />
    </PageLayout>
  );
};

export default Index;
