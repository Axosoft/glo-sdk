# GitKraken Glo Node SDK

## Contributing

### Features
There are plenty of calls to the Glo API that still need to be added. Additionally extra functionality and helper functions on top of these can also be built out.

### Testing
I don't know very much about Jest and using mocks, so help in this area would be much appreciated!

Jest has been set up in this project, and tests will be run as a part of CI when that is set up. Testing for all the API calls and helper functions would be a big help.

### Documentation
Documenting this project by means of tsdoc (jsdoc?) or some other format would be a big assistance. The docs can also be generated as a part of CI.

## How to Use
*NOT YET ON NPM*

`const Glo = require('glo-node-sdk')(AUTH_TOKEN, options);`
```
import gloNode from "glo-node-sdk";
const Glo = gloNode(AUTH_TOKEN, options);
```

### Options
```
{
    v: number,          // The version of the API you are using. Right now the only valid version is 0
    baseUrl: string     // The base url of the API you are calling. Defaults to https://app.gitkraken.com
}
```