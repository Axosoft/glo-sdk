import a, {
    AxiosInstance
} from 'axios';

import LabelFunctions from './labels';
import BoardFunctions from './boards';
import CardFunctions from './cards';

export default class {
    token: string;
    Labels: LabelFunctions;
    Boards: BoardFunctions;
    Cards: CardFunctions;
    axios: AxiosInstance;

    constructor(token: string, baseUrl: string) {
        this.token = token;
        this.axios = a.create({
            baseURL: baseUrl,
            headers: {
                'Authorization': token
            }
        });
        // this.Labels = Labels;
        this.Labels = new LabelFunctions(this.axios);
        this.Boards = new BoardFunctions(this.axios);
        this.Cards = new CardFunctions(this.axios);
    }



}
