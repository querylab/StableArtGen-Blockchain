require('@nomicfoundation/hardhat-toolbox');

const privateKey = "wallet private ket mumbai polygon"; // my wallet private key polygon mumbai testnework
//  alchemy polygone mumbai testnet api key
const ALCHEMY_API_KEY = "VU2Gl0LisHtXp6vxaTNTyC80SB1Ooqau"; //Alchemy apikey

module.exports = {
  solidity: '0.8.17',
  networks: {
    hardhat: {},
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [privateKey],
    },
  },
};
