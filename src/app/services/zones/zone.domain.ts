export interface IZoneDTO {
    id: number;
    name: string;
    active: boolean;
}

export interface IZoneResponse {
    data: IZoneDTO;
    message: string;
}
