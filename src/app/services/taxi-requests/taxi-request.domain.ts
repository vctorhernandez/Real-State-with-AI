export interface ITaxiRequestDTO {
    id: number;
    requestId: number;
    date: Date;
    time: string;
    peopleNum: string;
    origin: string;
    destination: string;
    whoPays: string;
    comments?: string;
}

export interface ITaxiRequestResponse {
    data: ITaxiRequestDTO;
    message: string;
}
