import {
  Button,
  FileUpLoader,
  GridWrapper,
  HR,
  Loader,
  PageLayout,
  PageTitle,
  Row,
  Status,
  Tag,
  Wrapper,
} from "@components/index";
import Title from "@modules/projects-passport/components/Title/title";
import useProjectPassportDetail from "@modules/projects-passport/hooks/useProjectDetail";
import { BUTTON_THEME } from "@shared/constants";
import { useNavigate } from "react-router-dom";
export interface Project {
  id: number;
  code: string;
  region: Region;
  districts: District[];
  owner_organization: Organization;
  object: ProjectObject[];
  private_partner: string;
  stir: string;
  registry_number: string;
  interval_years: string;
  contract_term: number;
  project_price: number;
  status: boolean;
  files: ProjectFile[];
  monitoring: Monitoring[];
  project_plans: ProjectPlan[];
  facts: Fact[];
  additional: Additional[];
}

export interface Region {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
}

export interface Organization {
  id: number;
  name: string;
}

export interface ProjectObject {
  id: number;
  name: string;
}

export interface ProjectFile {
  id: number;
  file: string;
  name: string;
  project: number;
}

export interface Monitoring {
  project: {
    id: number;
    code: string;
  };
  id:number
  date: string;
  file: ProjectFile;
  comment: string;
}

export interface ProjectPlan {
  id: number;
  project: {
    id: number;
    code: string;
  };
  draft: string;
  object_type: { id: number; name: string };
  plan: string;
  price: number;
  date: number;
}

export interface Draft {
  id: number;
  name: string;
}

export interface Fact {
  id: number;
  project: {
    id: number;
    code: string;
  };
  draft: string;
  object_type: { id: number; name: string };
  fact: string;
  price: number;
  date: string;
  file: ProjectFile;
}

export interface Additional {
  id: number;
  project: {
    id: number;
    code: string;
  };
  draft: string;
  object_type: { id: number; name: string };
  addition: string;
  price: number;
  date: string;
  file: ProjectFile;
}

export default function Index() {
  const navigate = useNavigate();
  const { data }: { data: Project } = useProjectPassportDetail();
   console.log(data);
  return (
    <PageLayout>
      {data ? (
        <>
          <PageTitle title="General information" />
          <Wrapper>
            <div className="flex gap--5xl items-center">
              <Tag title="Project status">
                <Status status={data.status ? "approved" : "rejected"} />
              </Tag>
              <Tag title="Project years" string>
                {data?.interval_years}
              </Tag>
            </div>
            <HR />
            <div className="grid grid--cols-2  gap--lg">
              <GridWrapper>
                <Row label="Region" value={data?.region?.name} />
                <Row
                  label="District"
                  value={data?.districts[0]?.name}
                  background
                />
                <Row
                  label="Organization name"
                  value={data?.owner_organization?.name}
                />
                <Row label="Object" value={data?.object[0]?.name} background />
                <Row label="STIR" value={data?.stir} />
              </GridWrapper>
              <GridWrapper>
                <Row label="Registry number" value={data?.registry_number} />
                <Row
                  label="Contract term"
                  value={data?.contract_term}
                  background
                />
                <Row label="Project price" value={data?.project_price} />
                <Row
                  label="Private partner"
                  value={data?.private_partner}
                  background
                />
                <Row label="Project code" value={data?.code} />
              </GridWrapper>
            </div>
          </Wrapper>
          {data?.files.length > 0 && (
            <>
              <Title title="Project files" />
              <Wrapper>
                <div
                  style={{
                    display: "flex",
                    gap: "30px",
                    flexDirection: "column",
                  }}
                >
                  {data?.files.map((file, idx) => (
                    <div style={{ display: "flex", gap: "30px" }} key={idx}>
                      <FileUpLoader id={String(file?.id)} value={file} />
                    </div>
                  ))}
                </div>
              </Wrapper>
            </>
          )}

          {data?.project_plans.length > 0 && (
            <>
              <Title title="Project plan" />
              <Wrapper>
                <div className="grid grid--cols-2  gap--lg">
                  {data?.project_plans.map((plan, idx) => (
                    <GridWrapper key={idx}>
                      <Row label="Object" value={plan?.draft} />
                      <Row
                        label="Object type"
                        value={plan?.object_type?.name}
                      />
                      <Row label="Plan" value={plan?.plan} background />
                      <Row label="Date" value={plan?.date} />
                      <Row label="Price" value={plan?.price} background />
                    </GridWrapper>
                  ))}
                </div>
              </Wrapper>
            </>
          )}

          {data?.facts.length > 0 && (
            <>
              <Title title="Current Investment" />
              <Wrapper>
                <div className="grid grid--cols-2  gap--lg">
                  {data.facts.map((fact, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <GridWrapper key={idx}>
                        <Row label="Object" value={fact?.draft} />
                        <Row
                          label="Object type"
                          value={fact?.object_type?.name}
                        />
                        <Row label="Fact" value={fact?.fact} background />
                        <Row label="Date" value={fact?.date} />
                        <Row label="Price" value={fact?.price} background />
                      </GridWrapper>
                      <FileUpLoader
                        key={fact?.id}
                        id={String(fact?.id)}
                        value={{
                          id: fact?.id,
                          file: fact?.file?.file,
                          name: fact?.file?.file
                            ? fact.file.file.replace(
                                "http://dxsh.technocorp.uz/media/attachments/",
                                ""
                              )
                            : "Investment file",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Wrapper>
            </>
          )}

          {data?.additional.length > 0 && (
            <>
              <Title title="Additional Investment" />
              <Wrapper>
                <div className="grid grid--cols-2  gap--lg">
                  {data.additional.map((addition, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <GridWrapper key={idx}>
                        <Row label="Object" value={addition?.draft} />
                        <Row
                          label="Object type"
                          value={addition?.object_type?.name}
                        />
                        <Row
                          label="Fact"
                          value={addition.addition}
                          background
                        />
                        <Row label="Date" value={addition?.date} />
                        <Row label="Price" value={addition?.price} background />
                      </GridWrapper>
                      <FileUpLoader
                        key={addition.id}
                        id={String(addition.id)}
                        value={{
                          id: addition?.id,
                          file: addition?.file?.file,
                          name: addition?.file?.file
                            ? addition.file.file.replace(
                                "http://dxsh.technocorp.uz/media/attachments/",
                                ""
                              )
                            : "Investment file",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Wrapper>
            </>
          )}

          {data?.monitoring.length > 0 && (
            <>
              <Title title="Monitoring" />
              <Wrapper>
                <div className="grid grid--cols-2  gap--lg">
                  {data.monitoring.map((monitor, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                      }}
                    >
                      <GridWrapper key={idx}>
                        <Row label="Comment" value={monitor?.comment} />
                        <Row label="Date" value={monitor?.date} background />
                      </GridWrapper>
                      <FileUpLoader
                        id={String(idx)}
                        value={{
                          id: monitor?.id,
                          file: monitor?.file?.file,
                          name: monitor?.file?.file
                            ? monitor?.file?.file.replace(
                                "http://dxsh.technocorp.uz/media/attachments/",
                                ""
                              )
                            : "Monitoring file",
                        }}
                      />
                    </div>
                  ))}
                </div>
              </Wrapper>
            </>
          )}
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
