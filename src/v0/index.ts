import a, {
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
    AxiosInstance,
    AxiosAdapter,
    Cancel,
    CancelToken,
    CancelTokenSource,
    Canceler
} from 'axios';

import LabelFunctions from './labels';
import BoardFunctions from './boards';

export default class {
    token: string;
    Labels: LabelFunctions;
    Boards: BoardFunctions;
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
    }



}
