import { Button, GridWrapper, HR, Loader, PageLayout, PageTitle, Row, Status, Tag, Wrapper } from "@components/index";
import type { ProjectDetail } from "@interfaces/projects.interface";
import useProjectDetail from "@modules/projects/hooks/useGetProjectDetail";
import { BUTTON_THEME } from "@shared/constants";
import { useNavigate } from "react-router-dom";

export default function ProjectDetail() {
  const { data }: { data: ProjectDetail } = useProjectDetail();
  const navigate=useNavigate()
  return (
    <PageLayout>
      {data ? (
        <>
          <PageTitle title="Project" />
          <Wrapper>
            <div className="flex gap--5xl items-center">
              <Tag title="Project status">
                <Status status={data?.used ? "positive" : "negative"} />
              </Tag>
              <Tag title="Investment plan created" string>
                <Status
                  status={
                    data?.investment_plan_created ? "positive" : "negative"
                  }
                />
              </Tag>
            </div>
            <HR />
            <div className="grid grid--cols-1  gap--lg">
              <GridWrapper>
                <Row label="Name" value={data?.name} />
                <Row label="Type" value={data?.type.name} background />
                <Row
                  label="Owner organzation"
                  value={data?.owner_organization?.name}
                />
                <Row
                  label="District"
                  value={data?.district[0]?.name}
                  background
                />
                <Row label="Addres" value={data?.address} />
              </GridWrapper>
            </div>
          </Wrapper>
          <div className="flex gap--lg items-center justify-between">
            <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
              Back
            </Button>
            <Button
              onClick={() => navigate("edit")}
              theme={BUTTON_THEME.WARNING}
            >
              Update
            </Button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </PageLayout>
  );
}
