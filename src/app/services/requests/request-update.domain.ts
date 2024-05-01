export interface IRequestUpdateDTO {
    projectCode: string;
    buId: number;
    visitorCompanyName: string;
    visitorType: number;
    coordinator: string;
    externalPeopleNum: number;
    internalPeopleNum: number;
    welcomeWithLogo: boolean;
    startDate: Date;
    finishDate: Date;
    tourNeeded: boolean;
    tourResponsibleName: string;
    tourResponsiblePhone: string;
    comments: string;
}

export interface IRequestResponse {
    data: IRequestUpdateDTO;
    message: string;
}
