# GitKraken Glo Node SDK
[![Build Status](https://travis-ci.org/James-Quigley/glo-node-sdk.svg?branch=master)](https://travis-ci.org/James-Quigley/glo-node-sdk)
## Contributing

### Features
There are plenty of calls to the Glo API that still need to be added. Additionally extra functionality and helper functions on top of these can also be built out.

### Testing
I don't know very much about Jest and using mocks, so help in this area would be much appreciated! If there are better ways to do what I'm trying to do, please let me know.

Jest has been set up in this project, and tests are run with CI.

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