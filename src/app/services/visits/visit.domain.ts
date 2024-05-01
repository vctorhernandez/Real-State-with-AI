export interface IVisitDTO {
    id: number;
    name: string;
    active: boolean;
}

export interface IVisitResponse {
    data: IVisitDTO;
    message: string;
}
