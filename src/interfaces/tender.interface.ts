// src/interfaces/tender.interface.ts

import { IUserData, IFIle, ISelectOption } from '@app/interfaces'

/* =========================================================
   COMMON / HELPER TYPES
========================================================= */

export type TenderStatus =
    | 'new'
    | 'pending'
    | 'approved'
    | 'rejected'
    | 'accepted'
    | 'in_process'
    | 'returned'

interface District {
    id: number
    name: string
}

interface ObjectType {
    id: number
    name: string
}

interface ObjectItem {
    id: number
    name: string
    district: District[]
}

interface BalanceOrganization {
    id: number
    name: string
}

/* =========================================================
   TENDER LIST (TABLE / PAGINATION)
========================================================= */

export interface ITenderList {
    id: number
    object_name: string
    object_type: string
    address: string
    start_date: string
    end_date: string
    applicants_count: number
    applicant_name: string
    status: TenderStatus
    caption?: string
}

/* =========================================================
   PERFORMER (EVALUATION)
========================================================= */

export interface IPerformerTender {
    id: number
    status: 'pending' | 'completed'
    deadline: string
    evaluation_status: boolean | null
    evaluation_text: string | null
    evaluation_file: string | null
    performer: {
        id: number
        full_name: string
    }
}

/* =========================================================
   ANSWERS (COMMENTS / RESPONSES)
========================================================= */

export interface ITenderAnswer {
    id: number
    text: string | null
    note: string | null
    created_by: IUserData
    created_at: string
    files: IFIle[]
}

/* =========================================================
   TENDER DETAIL (FULL VIEW)
========================================================= */

export interface ITenderDetail {
    id: number

    /* --- Applicant info --- */
    firstname: string | null
    lastname: string | null
    middle_name: string | null
    pinfl: string | null
    passport_seria: string | null
    passport_number: string | null
    phone: string | null
    email: string | null
    address: string | null

    /* --- Tender info --- */
    body: string | null
    status: TenderStatus
    created_at: string
    updated_at: string

    /* --- Relations --- */
    district: District | null
    object_type: ObjectType
    object: ObjectItem[]
    balance_organization: BalanceOrganization

    /* --- Scoring --- */
    investment_ability_ball: number
    region_by_ball: number
    experience_ball: number
    techniques_ball: number
    stability_rating_ball: number
    success_projects_ball: number
    return_on_investment_ball: number

    /* --- Files --- */
    confirmation_documents: {
        id: string
        attachment: {
            name: string
            file: string
        }
    }[]

    /* --- Performers --- */
    performers?: IPerformerTender[]

    /* --- Answers --- */
    answers?: ITenderAnswer[]
}

/* =========================================================
   FORMS
========================================================= */

export interface ITenderCreateForm {
    firstname: string
    lastname: string
    middle_name?: string | null
    pinfl: string
    passport_number: string
    address: string
    phone: string
    email: string
    content: string
    object_ids: number[]
    object_type_id: number
    balance_organization_id: number
    files: any[]
}

export interface ITenderReplyForm {
    response_text: string
    response_type: 'positive' | 'negative' | 'returned'
    files: any[]
}


export interface ITenderWinnerAddForm {
    winner:string,
    vice_winner:string,
    protocol: IFIle[];
}



export interface ITenderReturnForm {
    comment: string
}
