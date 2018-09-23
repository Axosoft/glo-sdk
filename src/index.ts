type User = {
    id: string,
    email: string,
    name: string,
    role: string
};

type Label = {
    id: string,
    text: string,
    color: {
        r: number,
        g: number,
        b: number
    }
};

type CardComment = {
    id: string,
    user: [User],
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
    cards: [Card]
};

type Card = {
    id: string,
    title: string,
    description: string,
    dueDate: string,
    assignees: [User],
    labels: [Label],
    comments: [Comment],
    activities: [Activity]
};

type Board = {
    id: string,
    users: [User],
    columns: [Column],
    labels: [Label]
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

// export default {}