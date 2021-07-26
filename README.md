## etoken-list

List all token holder addresses and balances at any specified blockchain height.  This package makes queries to an [SLPDB](https://github.com/simpleledger/SLPDB) via the slpserve http gateway.

NOTE: All list results provided by this package should be double-checked between multiple SLPDB nodes because any instance of SLPDB may be out-of-sync, have an outdated version, or have a corrupted database.  Be sure to know the SLPDB node instances you connecting to can be trusted and are properly maintained.

For a token this library can:

* [List all token holder balances and addresses](#list-of-token-holders)
* [List all token UTXO values](#list-of-coins)
* [List all NFT token holders](#list-all-holders-of-an-nft-in-an-nft1-group)
* [List tokens linked to a specific Token Document Hash](#list-linked-tokens)
* [List all NFTs that were ever part of an NFT Group](#list-all-nfts-in-an-nft1-group-not-only-the-current-holders)

Applications can use this information to:

* Distribute eCash rewards to token holders, pro rata
* Airdrop existing token holders with new etokens, pro rata
* Build a token staking rewards systems using coin age
* Public key and user coordination in decentralized applications

By default this package connects to a public SLPDB node, but this can be overridden using `Config.SetUrl("__")`.



### Demo App

This demo app allows the user to print eToken lists to the console. User can then copy/paste list result into Electrum ABC to distribute XEC rewards.


#### Run the demo CLI application
```
$ git clone https://github.com/bytesofman/etoken-list.git
$ cd slp-list
$ npm i
$ npm start
```



## Install 

#### node.js

`npm i etoken-list`

#### browser

```<script src='https://unpkg.com/etoken-list'></script>```



## Example Usage

### List of token holders

Get a list of token holder addresses and balances for a token using custom SLPDB instance:

```ts
let etokenlist = require("etoken-list");
slplist.Config.SetUrl("https://tokendb.kingbch.com");
const blockCutoff = 620971;
let list;

(async () => {
    list = await etokenlist.List.GetAddressListFor(
        "4bd147fc5d5ff26249a9299c46b80920c0b81f59a60e05428262160ebee0b0c3",
        blockCutoff,
        true
    );
    console.log(list);
})();
```

### List of coins

List the individual UTXOs, coin age, etc for a specified token ID:

```ts
let etokenlist = require("etoken-list");
slplist.Config.SetUrl("https://tokendb.kingbch.com");
const blockCutoff = 620971;
let list;

(async () => {
    list = await etokenlist.List.GetCoinListFor(
        "4bd147fc5d5ff26249a9299c46b80920c0b81f59a60e05428262160ebee0b0c3",
        blockCutoff
    );
    console.log(list);
})();

```

### List all holders of an NFT in an NFT1 Group

List the NFT holders for a specific NFT1 Group:

```ts
let etokenlist = require("etoken-list");
slplist.Config.SetUrl("https://tokendb.kingbch.com");
let list;

(async () => {
    list = await etoken.Nft1List.GetConfirmedNftTokenHolders(
        "<eTokenID>"
    );
    console.log(list);
})();
```

### List linked tokens

List all tokens with a Genesis pointing to a specific Document Hash:

```ts
let etokenlist = require("etoken-list");
etokenlist.Config.SetUrl("https://tokendb.kingbch.com");
let list;

(async () => {
    list = await etoken.List.SearchForTokenIdInDocHash(
        "<DocHash>",
    );
    console.log(list);
})();
```

### List all NFTs in an NFT1 Group (not only the current holders)

List all NFTs created for this specific NFT1 Group:

```ts
let etokenlist = require("etoken-list");
etokenlist.Config.SetUrl("https://tokendb.kingbch.com");
let list;

(async () => {
    list = await etokenlist.Nft1List.SearchForNftsInGroup(
        "<GroupID>"
    );
    console.log(list);
})();
```



## Change Log

### 1.0.0 Reset
- Converted from SLP to eCash

### 1.1.0
- Added nft method "GetConfirmedNftTokenHolders"
- Slightly modified options for "SearchForNftsInGroup"

### 1.0.0
- (breaking change) Complete refactoring of all methods
- (breaking change) Added static Config class for setting SLPDB URL
- Complete unit test coverage

### 0.1.0
- Removed support for unconfirmed transactions
- Don't publish .ts files to npm

### 0.0.8
- Allow mempool slp list queries, use block height = -1

### 0.0.7
- Include Genesis balance in query.ts
- Removed BigNumber.js dependency from demo.ts in favor of Big.js 
- NOTE: All number rounding in demo uses default of ROUND_HALF_UP

### 0.0.6
- Updated gRPC deps and utilized the new getMedianTime() method

### 0.0.5
- Switched to big.js from bignumber.js in deps (demo.ts still uses BigNumber.js)
- Added MTP block selection option in demo.ts
- Other minor updates
