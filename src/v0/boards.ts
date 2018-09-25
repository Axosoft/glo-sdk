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

        const response = await this.axios.post(`/api/glo/boards`, {
            name,
            is_public: false
        });

        return response.data;
    }

    async deleteBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        const response = await this.axios.delete(`/api/glo/boards/${boardId}`);
        return;
    }

    async archiveBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}/archive`);
        return;
    }

    async unarchiveBoard(boardId: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}/unarchive`);
        return;
    }

    async renameBoard(boardId: string, newName: string): Promise<void> {
        if (boardId == null) {
            throw 'Missing board ID';
        }
        if (newName == null) {
            throw 'Missing new name';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}`, {
            id: boardId,
            name: newName
        });
        return;
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

        const response = await this.axios.post(`/api/glo/boards/${boardId}/members`, {
            added: {
                id: userId,
                role
            }
        });
        return response.data;
    }

    async removeUserFromBoard(boardId: string, member: Member): Promise<Board> {
        if (boardId == null) {
            throw 'Missing board ID';
        }
        if (member == null) {
            throw 'Missing board member to remove';
        }

        const response = await this.axios.post(`/api/glo/boards/${boardId}/members`, {
            removed: member
        });
        return response.data;
    }

    async getBoardActivity(boardId: string, page = 1, page_size = 50): Promise<[Activity]> {
        if (boardId == null) {
            throw 'Missing board ID';
        }

        const response = await this.axios.get(`/api/activity/board/${boardId}?page=${page}&page_size=${page_size}`);
        return response.data;
    }

    // async getBoards(options: {
    //     archived: boolean | null,
    //     fields: []
    // }): Promise<[Member]> {

    // }
};

// export type BoardField =
//     'archived_date' |
//     'name'          |
//     'members'       |
//     'members.role'  |
//     'sync_provider';

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