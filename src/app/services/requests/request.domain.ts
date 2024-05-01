export interface IRequestDTO {
    id?: number;
    applicant: string;
    projectCode: string;
    buId: number;
    visitorCompanyName: string;
    visitorType: number;
    coordinator: string;
    externalPeopleNum: number;
    internalPeopleNum: number;
    startDate: Date;
    finishDate: Date;
    tourNeeded: boolean;
    tourResponsibleName: string;
    tourResponsiblePhone: string;
    status: number;
    creationDate: Date;
    comments: string;
}

export interface IRequestResponse {
    data: IRequestDTO;
    message: string;
    ICanApprove: boolean;
}
