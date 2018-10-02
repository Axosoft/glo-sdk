import { AxiosInstance } from "axios";


export default class BoardFunctions {
    axios: AxiosInstance;
    constructor(axios: AxiosInstance) {
        this.axios = axios;
    }

    async createBoard(name: string): Promise<Board> {
        if (name == null) {
            throw 'Missing board name';
        }

        return (await this.axios.post(`/api/glo/boards`, {
            name,
            is_public: false
        })).data;
    }

    async deleteBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        return (await this.axios.delete(`/api/glo/boards/${boardId}`)).data;
    }

    async archiveBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        return (await this.axios.post(`/api/glo/boards/${boardId}/archive`)).data;
    }

    async unarchiveBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        return (await this.axios.post(`/api/glo/boards/${boardId}/unarchive`)).data;
    }

    async renameBoard(boardId: string, newName: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }
        if (newName == null) {
            throw 'Missing new name';
        }

        return (await this.axios.post(`/api/glo/boards/${boardId}`, {
            id: boardId,
            name: newName
        })).data;
    }

    async inviteUserToBoard(boardId: string, userId: string, role: 'full'): Promise<Board> {
        if (boardId == null) {
            throw 'Missing board ID';
        }
        if (userId == null) {
            throw 'Missing user ID';
        }
        if (role == null) {
            throw 'Missing role';
        }

        return (await this.axios.post(`/api/glo/boards/${boardId}/members`, {
            added: {
                id: userId,
                role
            }
        })).data;
    }

    async removeUserFromBoard(boardId: string, member: Member): Promise<Board> {
        if (boardId == null) {
            throw 'Missing board ID';
        }
        if (member == null) {
            throw 'Missing board member to remove';
        }

        return (await this.axios.post(`/api/glo/boards/${boardId}/members`, {
            removed: member
        })).data;
    }

    async getBoardActivity(boardId: string, page = 1, page_size = 50): Promise<[Activity]> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        return (await this.axios.get(`/api/activity/board/${boardId}?page=${page}&page_size=${page_size}`)).data;
    }

    async getBoards(options: {
        archived: boolean | null,
        fields: [BoardField]
    }): Promise<[Member]> {
        return (await this.axios.get(`/api/glo/boards?archivied=${options.archived}&fields=${options.fields.join('%2C')}`)).data;
    }

    async getArchivedBoards(options: {
        fields: [BoardField]
    }) {
        return await this.getBoards({
            archived: true,
            fields: options.fields
        });
    }

};

export type BoardField = keyof Board

export type Board = {
    archived_columns: [string],
    columns: [string],
    created_by: string,
    created_date: string,
    external_provider_members: [Member],
    id: string,
    invited_members: [string],
    is_public: boolean,
    labels: [string],
    members: [Member],
    name: string
};

export type Member = {
    created_date: string,
    email: string,
    glo_user: null,
    id: string,
    identities: [],
    name: string,
    role: string,
    sync_provider_identities: string,
    updated_date: string,
    username: string
}

export type Activity = {
    activity_data: ActivityData,
    board_id: string,
    created_date: string,
    event: string,
    id: string,
    user_id: string
}

export type ActivityData = {
    board: {
        id: string,
        name: string
    },
    members: [Member],
    user: Member
}
