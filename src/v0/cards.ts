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

    async archiveCard(board_id: string, card_id: string): Promise<void> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}/archive`, {})).data
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

    async addAndRemoveAssignees(board_id: string, card_id: string, added: [{ id: string }] | [], removed: [{ id: string }] | []): Promise<{
        errors: [string],
        id: string,
        members: [{ id: string }]
    }> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}/members`, {
            added,
            removed
        })).data;
    }

    async addAssignees(board_id: string, card_id: string, assignees: [{ id: string }]): Promise<{
        errors: [string],
        id: string,
        members: [{ id: string }]
    }> {
        return await this.addAndRemoveAssignees(board_id, card_id, assignees, []);
    }

    async addAssignee(board_id: string, card_id: string, user_id: string): Promise<{
        errors: [string],
        id: string,
        members: [{ id: string }]
    }> {
        return await this.addAndRemoveAssignees(board_id, card_id, [{ id: user_id }], []);
    }

    async removeAssignees(board_id: string, card_id: string, assignees: [{ id: string }]): Promise<{
        errors: [string],
        id: string,
        members: [{ id: string }]
    }> {
        return await this.addAndRemoveAssignees(board_id, card_id, [], assignees);
    }

    async removeAssignee(board_id: string, card_id: string, user_id: string): Promise<{
        errors: [string],
        id: string,
        members: [{ id: string }]
    }> {
        return await this.addAndRemoveAssignees(board_id, card_id, [], [{ id: user_id }]);
    }

    async addAndRemoveLabels(board_id: string, card_id: string, added: [{ id: string }] | [], removed: [{ id: string }] | []): Promise<{
        labels: [{
            id: string,
            name: string
        }]
    }> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}/labels`, {
            added,
            removed
        })).data;
    }

    async addLabels(board_id: string, card_id: string, labels: [{ id: string }]): Promise<{
        labels: [{
            id: string,
            name: string
        }]
    }> {
        return await this.addAndRemoveLabels(board_id, card_id, labels, []);
    }

    async addLabel(board_id: string, card_id: string, label_id: string): Promise<{
        labels: [{
            id: string,
            name: string
        }]
    }> {
        return await this.addAndRemoveLabels(board_id, card_id, [{ id: label_id }], []);
    }

    async removeLabels(board_id: string, card_id: string, labels: [{ id: string }]): Promise<{
        labels: [{
            id: string,
            name: string
        }]
    }> {
        return await this.addAndRemoveLabels(board_id, card_id, [], labels);
    }

    async removeLabel(board_id: string, card_id: string, label_id: string): Promise<{
        labels: [{
            id: string,
            name: string
        }]
    }> {
        return await this.addAndRemoveLabels(board_id, card_id, [], [{ id: label_id }]);
    }

    async changeDueDate(board_id: string, card_id: string, due_date: string | null) : Promise<{id: string, due_date: string}> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}`, {
            id: card_id,
            fields: ["due_date"],
            due_date
        })).data
    }

    async removeDueDate(board_id: string, card_id: string) : Promise<{id: string, due_date: string}> {
        return await this.changeDueDate(board_id, card_id, null);
    }

    async addComment(board_id: string, card_id: string, text: string) : Promise<Comment> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/comments`, {
            board_id,
            card_id,
            text
        })).data;
    }

    async editComment(board_id: string, comment_id: string, text: string) : Promise<Comment>{
        return (await this.axios.post(`/api/glo/boards/${board_id}/comments/${comment_id}`, {
            id: comment_id,
            text
        })).data;
    }

    async deleteComment(board_id: string, comment_id: string) : Promise<void> {
        return (await this.axios.delete(`/api/glo/board/${board_id}/comments/${comment_id}`)).data
    }

    async subscribe(board_id: string, card_id: string) : Promise<void> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}/subscribe`)).data;
    }

    async unsubscribe(board_id: string, card_id: string) : Promise<void> {
        return (await this.axios.post(`/api/glo/boards/${board_id}/cards/${card_id}/unsubscribe`)).data;
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

export type Comment = {
    board_id: string,
    card_id: string,
    created_by: string,
    created_date: string,
    id: string,
    text: string,
    updated_date: string,
    user: {
        id: string
    }
}
