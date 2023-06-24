const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners()



  const NAME = "StableArtGen"
  const SYMBOL = "artgen"
  const COST = ethers.utils.parseUnits("1", "ether") // 1 ETH

  const NFT = await hre.ethers.getContractFactory("stableartgen")
  const nft = await NFT.deploy(NAME, SYMBOL, COST)
  await nft.deployed()


 //Consol View
 console.log("***********************************************************************************");
 console.log("Deploying contracts with the account:", deployer.address);
 console.log("Account balance:", (await deployer.getBalance()).toString());
 console.log("*********************************************************************************** \n");
 console.log(`StableArtGen Blockchain Contract: ${nft.address}`,"\n")
 console.log("*********************************************************************************** \n");




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
