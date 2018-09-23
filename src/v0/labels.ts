import { AxiosInstance } from "axios";


export default class LabelFunctions {
    axios: AxiosInstance;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async createLabel(boardId: string, name: string, color: Color): Promise<string> {
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
};

export type Label = {
    id: string,
    boardId: string,
    text: string,
    color: Color
};

export type Color = {
    r: number,
    g: number,
    b: number
}