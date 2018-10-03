# GitKraken Glo Node SDK
[![Build Status](https://travis-ci.org/James-Quigley/glo-node-sdk.svg?branch=master)](https://travis-ci.org/James-Quigley/glo-node-sdk)
## Contributing
Please feel free to submit PRs! If you have questions, submit a PR with a WIP tag, and ask away. Submitting issues is also helpful.

### Features
There are plenty of calls to the Glo API that still need to be added. Additionally extra functionality and helper functions on top of these can also be built out.

### Testing
I don't know very much about Jest and using mocks, so help in this area would be much appreciated! If there are better ways to do what I'm trying to do, please let me know.

Jest has been set up in this project, and tests are run with CI.

### Error Handling
More robust error handling that offers better information to the user would be beneficial for UX.

### Documentation
Documenting this project by means of tsdoc (jsdoc?) or some other format would be a big assistance. The docs can also be generated as a part of CI.

## How to Use
*NOT YET ON NPM*

`npm install -S glo-node-sdk`
`yarn add glo-node-sdk`

`const Glo = require('glo-node-sdk')(AUTH_TOKEN, options);`
```
import gloNode from "glo-node-sdk";
const Glo = gloNode(AUTH_TOKEN, ?v, ?baseURL);
```

### Options

- v: Right now the only valid version is `0`
- baseURL: If you'd like to test against something other than https://app.gitkraken.com