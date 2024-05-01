export interface IMenuTypeDTO {
    id: number;
    name: string;
    type: string;
    active: boolean;
}

export interface IMenuTypeResponse {
    data: IMenuTypeDTO;
    message: string;
}
