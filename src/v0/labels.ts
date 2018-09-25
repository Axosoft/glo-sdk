import { AxiosInstance } from "axios";


export default class LabelFunctions {
    axios: AxiosInstance;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async createLabel(boardId: string, name: string, color: Color): Promise<[Label]> {
        if (boardId == null) {
            throw 'Missing Board Id';
        }
        if (name == null) {
            throw 'Missing Label Name';
        }
        if (color == null) {
            throw 'Missing Label Color';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}/labels`, {
            name,
            color
        });
        return response.data;
    }

    async deleteLabel(boardId: string, labelId: string): Promise<{ labelsRemoved: [string] }> {
        if (boardId == null) {
            throw 'Missing Board Id';
        }
        if (labelId == null) {
            throw 'Missing Label ID';
        }
        const response = await this.axios.delete(`/api/glo/boards/${boardId}/labels`, {
            data: {
                id: labelId
            }
        });

        return response.data;
    }

    async updateLabel(boardId: string, labelId: string, name?: string, color?: Color): Promise<[Label]> {
        if (boardId == null) {
            throw 'Missing Board Id';
        }
        if (labelId == null) {
            throw 'Missing Label ID';
        }
        if (name == null) {
            throw 'Missing Label Name';
        }
        if (color == null) {
            throw 'Missing Label Color';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}/labels`, {
            name,
            color,
            id: labelId
        });
        return response.data;
    }
};

export type Label = {
    color: Color,
    created_by: string,
    created_date: string,
    id: string,
    name: string
};

export type Color = {
    r: number,
    g: number,
    b: number
}