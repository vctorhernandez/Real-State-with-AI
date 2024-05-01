export interface IRoomDTO {
    id: number;
    name: string;
    description: string;
    image: string;
    active: boolean;
}

export interface IRoomResponse {
    data: IRoomDTO;
    message: string;
}
