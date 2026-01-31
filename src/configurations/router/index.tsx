import { createBrowserRouter, Navigate } from "react-router-dom";
import { Error } from "@app/components";
import App from "@app/App.tsx";

import {
  AddAppeal,
  AppealDetail,
  Appeals,
  ReplyAppeal,
  Login,
  ReturnAppeal,
  Responsibility,
  RejectApplication,
  BalanceApplication,
  ConfirmPerformerApplication,
  BalanceObjectInfo,
  RejectPerformerApplication,
  SetObjectConcept,
  HavzaObjectInfoConfirm,
  Conception,
  RejectConception,
  AttachPerformer,
  ConceptionDetail,
  Dashboard,
  Announcements,
  AddAnnouncement,
  AnnouncementDetail,
  TenderList,
  AddTender,
  TenderApplicantList,
  ProjectPasswordList,
  DealDetail,
  DealsList,
  DealConfirmFile,
  NotFound,
  FinansPlansList,
  FinansPlansDetails,
  AddFinansPlansDetails,
  TenderDetail,
  WinnerTenderDetail,
  AttachPerformerDeal,
  AttachCondeRegisterDeal,
  RejectDeal,
  RejectApplicantDeal,
  RejectMinistryDeal,
  RejectVazDxshDeal,
  RejectMasulBolimDxsh,
  AddProjectPassort,
  ProjectPassportDetail,
  Projects,
  ProjectDetail,
  EditProject,
  AddProject,
  DeedLists,
  DeedDetails,
  ApcationFormList,
  AddAplicationForm,
  AplicationDetails,
  InvestmentList,
  InvestmentDetail,
  AddInvestment,
  ReportDetail,
  AddReport,
  ReportReturn,
} from "@app/modules";
import { AddConcept } from "@modules/applicationsOld";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      //   applications
      {
        path: "applications",
        children: [
          {
            index: true,
            element: <Appeals />,
          },
          {
            path: "add",
            element: <AddAppeal />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <AppealDetail />,
              },
              {
                path: "reply",
                element: <ReplyAppeal />,
              },
              {
                path: "responsibility",
                element: <Responsibility />,
              },
              {
                path: "balance-organization",
                element: <BalanceApplication />,
              },
              {
                path: "return",
                element: <ReturnAppeal />,
              },
              {
                path: "reject",
                element: <RejectApplication />,
              },
              {
                path: "confirm-performer",
                element: <ConfirmPerformerApplication />,
              },
              {
                path: "reject-performer",
                element: <RejectPerformerApplication />,
              },
              {
                path: "balance-object-info",
                element: <BalanceObjectInfo />,
              },
              {
                path: "set-object-concept",
                element: <SetObjectConcept />,
              },
              {
                path: "set-object-info-evolution",
                element: <HavzaObjectInfoConfirm />,
              },
              {
                path: "edit",
                element: <AddAppeal edit={true} />,
              },
            ],
          },
        ],
      },
      //   conceptions
      {
        path: "conceptions",
        children: [
          {
            index: true,
            element: <Conception />,
          },
          {
            path: "add",
            element: <AddAppeal />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <ConceptionDetail />,
              },
              {
                path: "reject",
                children: [
                  {
                    index: true,
                    element: <RejectConception />,
                  },
                ],
              },
              {
                path: "attach-performer",
                children: [
                  {
                    index: true,
                    element: <AttachPerformer />,
                  },
                ],
              },
            ],
          },
        ],
      },
      //   announcements
      {
        path: "announcements",
        children: [
          {
            index: true,
            element: <Announcements />,
          },
          {
            path: "add",
            element: <AddAnnouncement />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <AnnouncementDetail />,
              },
              {
                path: "reject",
                children: [
                  {
                    index: true,
                    element: <RejectConception />,
                  },
                ],
              },
              {
                path: "attach-performer",
                children: [
                  {
                    index: true,
                    element: <AttachPerformer />,
                  },
                ],
              },
            ],
          },
        ],
      },
      //   Objects
      {
        path: "objects",
        children: [
          {
            index: true,
            element: <Projects />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <ProjectDetail />,
              },
              {
                path: "edit",
                element: <EditProject />,
              },
            ],
          },
          {
            path: "add",
            element: <AddProject />,
          },
        ],
      },
      //   tenders
      {
        path: "tenders",
        children: [
          {
            index: true,
            element: <TenderList />,
          },
          {
            path: "add",
            element: <AddTender />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <TenderDetail />,
              },
              {
                path: "winnerCreate",
                children: [
                  {
                    index: true,
                    element: <TenderApplicantList />,
                  },
                ],
              },

              {
                path: "get-participant",
                children: [
                  {
                    index: true,
                    element: <WinnerTenderDetail />,
                  },
                ],
              },
              {
                path: "attach-performer",
                children: [
                  {
                    index: true,
                    element: <AttachPerformer />,
                  },
                ],
              },
            ],
          },
        ],
      },
      //   deals
      {
        path: "deals",
        children: [
          {
            index: true,
            element: <DealsList />,
          },
          {
            path: "add",
            element: <AddAnnouncement />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <DealDetail />,
              },
              {
                path: "confirmfile",
                element: <DealConfirmFile />,
              },
              {
                path: "reject",
                children: [
                  {
                    index: true,
                    element: <RejectDeal />,
                  },
                ],
              },
              {
                path: "reject_applicant",
                children: [
                  {
                    index: true,
                    element: <RejectApplicantDeal />,
                  },
                ],
              },
              {
                path: "reject-ministry",
                children: [
                  {
                    index: true,
                    element: <RejectMinistryDeal />,
                  },
                ],
              },
              {
                path: "reject-vazdxsh",
                children: [
                  {
                    index: true,
                    element: <RejectVazDxshDeal />,
                  },
                ],
              },
              {
                path: "reject-masulbolimdxsh",
                children: [
                  {
                    index: true,
                    element: <RejectMasulBolimDxsh />,
                  },
                ],
              },
              {
                path: "attach-performer",
                children: [
                  {
                    index: true,
                    element: <AttachPerformerDeal />,
                  },
                ],
              },
              {
                path: "attach-code-register",
                children: [
                  {
                    index: true,
                    element: <AttachCondeRegisterDeal />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // Finans Plans
      {
        path: "finans",
        children: [
          {
            index: true,
            element: <FinansPlansList />,
          },
          {
            path: "add",
            element: <AddFinansPlansDetails />,
          },
          {
            path: ":id",
            element: <FinansPlansDetails />,
          },
        ],
      },
      // monitoring
      {
        path: "monitoring",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
        ],
      },
      //   Old Projects
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <ProjectPasswordList />,
          },
          {
            path: "add",
            element: <AddProjectPassort />,
          },
          {
            path: ":id",
            element: <ProjectPassportDetail />,
          },
        ],
      },
      // Deed pages
      {
        path: "deed",
        children: [
          {
            index: true,
            element: <DeedLists />,
          },
          {
            path: ":id",
            element: <DeedDetails />,
          },
        ],
      },
      // Applications Form
      {
        path: "applicationform",
        children: [
          {
            index: true,
            element: <ApcationFormList />,
          },
          {
            path: "add",
            element: <AddAplicationForm />,
          },
          {
            path: ":id",
            element: <AplicationDetails />,
          },
        ],
      },
      // Add Concept
      {
        path: "add",
        children: [
          {
            index: true,
            element: <AddConcept />,
          },
        ],
      },

      // Investments
      {
        path: "investments",
        children: [
          {
            index: true,
            element: <InvestmentList />,
          },
          {
            path: ":id",
            children: [
              {
                index: true,
                element: <InvestmentDetail />,
              },
              {
                path: "add",
                element: <AddInvestment />,
              },
              {
                path: "edit",
                element: <AddInvestment edit={true} />,
              },
              {
                path: "report",
                children: [
                  {
                    index: true,
                    element: <ReportDetail />,
                  },
                  {
                    path: "add",
                    element: <AddReport />,
                  },
                  {
                    path: "edit",
                    element: <AddReport edit={true} />,
                  },
                  {
                    path: "return",
                    element: <ReportReturn />,
                  },
                ],
              },
            ],
          },
        ],
      },
      { path: "/403", element: <NotFound /> },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "*",
    element: <Navigate to="/applications" />,
    errorElement: <Error />,
  },
]);
