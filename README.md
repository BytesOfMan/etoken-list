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
$ cd etoken-list
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
etokenlist.Config.SetUrl("https://tokendb.kingbch.com");
const blockCutoff = 695000;
let list;

(async () => {
    list = await etokenlist.List.GetAddressListFor(
        "4bd147fc5d5ff26249a9299c46b80920c0b81f59a60e05428262160ebee0b0c3",
        blockCutoff,
        true
    );
    console.log(list);
})();
// Result

/*
Map(14) {
  'etoken:qqwp8hdcm4pzh0szms4ws7vtg4y6v73ur5k2cwragz' => '100',
  'etoken:qzzm4vmgpqeumxeuccy4xdz05aq2yg6mh5aj2tulx5' => '100',
  'etoken:qr0w2r6hvd3rwlwj7qc520qtkzgqnt90sy0grcj2wt' => '1000',
  'etoken:qzj5zu6fgg8v2we82gh76xnrk9njcreglu4mqtxxh5' => '1000',
  'etoken:qr9dfz5ngm2xtr208fdzp4zny8tcpe4vquyuuuhark' => '888',
  'etoken:qqartrrq3npyzpcqswq2hcslstzu38mq8gmmk4d5rf' => '10',
  'etoken:qr204yfphngxthvnukyrz45u7500tf60vywwgwtned' => '80',
  'etoken:qzln9cyenps0gznst42w3r3788m0fcld55z2hc2v56' => '2',
  'etoken:qryzwruy2qkrr4jyf7l56zsu3tc7dupvjq0e92et39' => '18',
  'etoken:qphlhe78677sz227k83hrh542qeehh8el53xmvqewn' => '7',
  'etoken:qrpl4usqmv9pwk0w53cqduzc8yvc89mswccvzwnx86' => '1',
  'etoken:qr2wg056z9fxzsqcf5t2ju7ch3v66238jvfyvesmj6' => '100',
  'etoken:qqvu0ps25e4vpu00uyla5q4t32ljtuc8uym84ylx2z' => '100',
  'etoken:qz2708636snqhsxu8wnlka78h6fdp77ar5tv2tzg4r' => '996594'
}
*/
```

### List of coins

List the individual UTXOs, coin age, etc for a specified token ID:

```ts
let etokenlist = require("etoken-list");
etokenlist.Config.SetUrl("https://tokendb.kingbch.com");
const blockCutoff = 695000;
let list;

(async () => {
    list = await etokenlist.List.GetCoinListFor(
        "4bd147fc5d5ff26249a9299c46b80920c0b81f59a60e05428262160ebee0b0c3",
        blockCutoff
    );
    console.log(list);
})();

// Result
/*
[
  {
    txid: '5f76f67582c0968369ad2e03f3545e4c28db7f60e21b76255f5e4cfa026afdcb',
    blk: 680063,
    slpAmount: '100',
    address: 'etoken:qqwp8hdcm4pzh0szms4ws7vtg4y6v73ur5k2cwragz',
    vout: 1,
    coinAge: 14937
  },
  {
    txid: '9c3d3fe2528809c8a0fd2eb8b1030e5d8e06bafeb44d272d049081b3ba2cbbb6',
    blk: 680064,
    slpAmount: '100',
    address: 'etoken:qzzm4vmgpqeumxeuccy4xdz05aq2yg6mh5aj2tulx5',
    vout: 1,
    coinAge: 14936
  },
  {
    txid: '62854434f37f77ecc4efa168a9cb568b538c84ffdb11ad809bedae840f141b99',
    blk: 680065,
    slpAmount: '1000',
    address: 'etoken:qr0w2r6hvd3rwlwj7qc520qtkzgqnt90sy0grcj2wt',
    vout: 1,
    coinAge: 14935
  },
  {
    txid: '800bf66b46b65e0f5137a9049a0e5428a56626c030f38fc040c172857e3a9252',
    blk: 680065,
    slpAmount: '1000',
    address: 'etoken:qzj5zu6fgg8v2we82gh76xnrk9njcreglu4mqtxxh5',
    vout: 1,
    coinAge: 14935
  },
  {
    txid: '6632079a5f1a565bd173fdc9c9baac0c5646fae467e2f7e62efd2d0e849d1a65',
    blk: 680086,
    slpAmount: '888',
    address: 'etoken:qr9dfz5ngm2xtr208fdzp4zny8tcpe4vquyuuuhark',
    vout: 1,
    coinAge: 14914
  },
  {
    txid: '05f40504b5d4ca11c714043010fe9f2f8670cc94d11afd11b759a218b712c14b',
    blk: 684267,
    slpAmount: '3',
    address: 'etoken:qqartrrq3npyzpcqswq2hcslstzu38mq8gmmk4d5rf',
    vout: 2,
    coinAge: 10733
  },
  {
    txid: '2eeff69fd2338e50e1934e97dae0c841c7b4ef603e800cd06bc47da46e50a3ae',
    blk: 684293,
    slpAmount: '1',
    address: 'etoken:qqartrrq3npyzpcqswq2hcslstzu38mq8gmmk4d5rf',
    vout: 1,
    coinAge: 10707
  },
  {
    txid: '3f324d982a4cdb650631fda0d9bf8905c593e9483eed7df5d00435afa10bcf59',
    blk: 684293,
    slpAmount: '1',
    address: 'etoken:qqartrrq3npyzpcqswq2hcslstzu38mq8gmmk4d5rf',
    vout: 1,
    coinAge: 10707
  },
  ...
  ,
]
*/

```

### List all holders of an NFT in an NFT1 Group

List the NFT holders for a specific NFT1 Group:

```ts
let etokenlist = require("etoken-list");
etokenlist.Config.SetUrl("https://tokendb.kingbch.com");
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

### 1.0.1
- Readme and repo URL fixes

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
