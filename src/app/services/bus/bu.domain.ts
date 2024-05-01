export interface IBuDTO {
    id: number;
    name: string;
    active: boolean;
}

export interface IBuResponse {
    data: IBuDTO;
    message: string;
}
