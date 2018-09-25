import v0 from "./v0";

type Options = {
    v: number,
    baseUrl: string
};

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