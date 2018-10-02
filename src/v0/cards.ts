import { AxiosInstance } from "axios";

export default class CardFunctions {
    axios: AxiosInstance;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async createCard(board_id: string, column_id: string, name: string, position: number, labels: [{ id: string, name: string }], members: [{ id: string }]): Promise<Card> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards`, {
            board_id: board_id,
            column_id: column_id,
            labels,
            members,
            name,
            position
        })).data;
    }

    async deleteCard(board_id: string, card_id: string): Promise<void> {
        return (await this.axios.delete(`/api/glo/boards/${board_id}/cards/${card_id}`, {})).data
    }

    async getCards(board_id: string, options: {
        archived: boolean | null,
        fields: [CardFields]
    }): Promise<
    [
        {
            column_id: string,
            card_counts: {
                unarchived: number,
                archived: number
            },
            cards: [Card]
        }
    ]> {
        return (await this.axios.get(`/api/glo/boards/${board_id}/cards?archived=${options.archived}&fields=${options.fields.join('%2C')}`)).data;
    }

    async getArchivedCards(board_id: string, options: {
        fields: [CardFields]
    }): Promise<
    [
        {
            column_id: string,
            card_counts: {
                unarchived: number,
                archived: number
            },
            cards: [Card]
        }
    ]> {
        return (await this.axios.get(`/api/glo/boards/${board_id}/cards?archived=true&fields=${options.fields.join('%2C')}`)).data;
    }
};

export type CardFields = keyof Card;

export type Card = {
    attachment_count: number,
    board_id: string,
    column_id: string,
    comment_count: number,
    completed_task_count: number,
    created_by: string,
    created_date: string,
    description: null | {
        created_by: string,
        created_date: string,
        text: string,
        updated_date: string,
        user: {
            id: string,
            name: string
        }
    },
    id: string,
    labels: [string],
    members: [string],
    name: string,
    total_task_count: number,
    updated_date: string
}
