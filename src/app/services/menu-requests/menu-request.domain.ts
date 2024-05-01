export interface IMenuRequestDTO {
    id: number;
    requestId: number;
    type: string;
    name: string;
    date: Date;
    time: string;
    coffee?: number;
    peopleNum: number;
    comments: string;
}

export interface IMenuRequestResponse {
    data: IMenuRequestDTO;
    message: string;
}