import v1 from "./v1";


const api = (token: string) => {
    return v1(token);
};
module.exports = api

export default api
