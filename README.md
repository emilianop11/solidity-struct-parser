# solidity-struct-parser
A module to parse solidity response structs to JSON

This is a WIP that I need for a personal project. I couldnt find a library that can parse the structs returned by a smart contract into plain JSON, so i created this simple module.
Tests and more features will be added later as I have more time.
PRs are more than welcome!

As an example, lets take the Contracts struct defined in my solidity contract:

```
struct Contract{
    uint256 _Id;
    address createdBy;
    uint256 totalValue;
    uint unlockTime;
    address[] whiteListedParties;
}
```

https://www.npmjs.com/package/solidity-struct-parser

```
npm install solidity-struct-parser
```

```
const {ParseSolidityStruct} = require("solidity-struct-parser");
//getContractsForAddress() returns an array of Contract
contracts = await escrow.connect(wallet).getContractsForAddress();
const parsedContracts = ParseSolidityStruct(contracts);


//parsedContracts will equal
[
  {
    "_Id": 1,
    "createdBy": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "totalValue": 200,
    "unlockTime": 1675014383,
    "whiteListedParties": [
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", "0x90F79bf6EB2c4f870365E785982E1f101E93b906"
    ]
  }
]
```