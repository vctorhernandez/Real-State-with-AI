export interface IRoomRequestDTO {
    id: number;
    requestId: number;
    date: Date;
    time: string;
    roomName: string;
}

export interface IRoomRequestResponse {
    data: IRoomRequestDTO;
    message: string;
}
