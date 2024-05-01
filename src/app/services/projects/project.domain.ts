export interface IProjectDTO {
    id: number;
    code: string;
    description: string;
    projectManager: string;
    cebe: string;
}

export interface IProjectResponse {
    data: IProjectDTO;
    message: string;
}
