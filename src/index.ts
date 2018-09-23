import v0 from "./v0";

type User = {
    id: string,
    email: string,
    name: string,
    role: string
};

type Label = {
    id: string,
    boardId: string,
    text: string,
    color: {
        r: number,
        g: number,
        b: number
    }
};

type CardComment = {
    id: string,
    user: string,
    text: string,
    date: string
};

type Activity = {
    id: string,
    text: string,
    date: string
};

type Column = {
    id: string,
    title: string,
    order: number,
    cards: [string]
};

type Card = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    assignees: [string],
    labels: [string],
    comments: [string],
    activities: [string]
};

type Board = {
    id: string,
    users: [string],
    columns: [string],
    labels: [string]
};

// const Boards = {
//   create: async (name: string) => {
//     // Create a board
//   },
//   delete: async (id: string) => {
//     // Delete a board
//   },
//   list: async (page: number, count: number) => {
//     // List a users boards. Maybe paged?
//   },
//   details: async (id: string) => {
//     // Get a boards details
//   }
// };


// class Glo {
//   Boards;
//   Cards;
//   Labels;

//   constructor(token: string) {
//   }
// }

type Options = {
    v: number,
    baseUrl: string
};

// type v0 = {
//     Labels:
// }

export default (token: string, {
    v = 0,
    baseUrl = 'https://app.gitkraken.com/'
}): any => {
    // Some logic here about versioning.
    if (v != 0) {
        throw 'Invalid version';
    }
    return new v0(token, baseUrl);
};