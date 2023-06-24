# StableArtGen-Blockchain 🤖🛒💎🎴

StableArtGen Blockchain is a dApp that uses artificial intelligence technology and smart contracts written in Solidity and Hardhat, along with ReactJS for the user interface. With support for IPFS and nft.storage, it allows users to generate stable images based on user-provided prompts, while integration with Hugging Face and its Stable Diffusion 2 API allows to leverage AI-driven image generation. Requires creating nft.storage and Hugging Face accounts to obtain the respective APIs and using Stable Diffusion 2 to generate AI images.


## Setting Up
---
## 1. Clone the repository

## 2. Install dependencies

```bash
$ cd StableArtGen-Blockchain
$ npm install --save-dev hardhat
```
## 3. Change variables in Files
```bash
# hardhat.config.js
$ ALCHEMY_API_KEY
$ privateKey
# src/config.json 
$ Contract address
# src/App.js 
$ REACT_APP_HUGGING_FACE_API_KEY
$ REACT_APP_NFT_STORAGE_API_KEY

```
## 4. Deployment Solidity Contract Addresses
```bash
$ npx hardhat clean
$ npx hardhat compile
```

## 5. Run tests
``` bash
$ npx hardhat test
```


``` bash
$ npx hardhat run scripts/deploy.js --network mumbai
```
<a href="https://imgur.com/whnXR1G"><img src="https://i.imgur.com/whnXR1G.gif" title="source: imgur.com" /></a>

``` bash

#After deploying the stableartgen.sol replace this address in src/config.json file with the variable:

 address:"0xeD323A00601297Cb364A99bE8061a00a6C5D527b"


```

## 6. Localhost Deployment

``` bash

npm install 

npm start

http://localhost:3000/

```
<a href="https://imgur.com/uRKFZKT"><img src="https://i.imgur.com/uRKFZKT.gif" title="source: imgur.com" /></a>























