# eth-story-chain

> Story chain based on ethereum

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

## How to test in local eth chain

### Using `truffle develop`

* Use metamask
* Run `truffle develop` to spin up localhost:9545
* Then in truffle console, run `migrate`
* Then login to metamask using mnemonic phrase outputted after running `truffle develop`
* Switch back custom RPC and input localhost:9545
* Make sure you are logged in for the Metamask
* Refresh the browser and you are ready to use the app

### Using `ganache-cli`

* Use metamask
* Run `ganache-cli` to spin up localhost:8545 server
* Then run `truffle console`
* In the console run `migrate`
* Then login to metamask using mnemonic phrase outputted after running `ganache-cli`
* Switch back custom RPC and input localhost:8545
* Make sure you are logged in for the Metamask
* Refresh the browser and you are ready to use the app

### Troubleshooting

Open developer tools and see what errors are showing up.
* If it is about nonce doesn't match, switch to main net first, then back to the local network
* Sometimes you might need to restart your browser to make Metamask working after changing server
