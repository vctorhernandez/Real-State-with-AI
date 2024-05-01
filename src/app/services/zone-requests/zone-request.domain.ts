export interface IZoneRequestDTO {
    id: number;
    requestId: number;
    zoneId: number;
}

export interface IZoneRequestResponse {
    data: IZoneRequestDTO;
    message: string;
}