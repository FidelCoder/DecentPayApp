// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { ethers } = require("ethers");


async function main() {
  // Deploy the USDERC20Token first
  const initialSupply = ethers.utils.parseUnits("1000000", 18); // 1 million tokens with 18 decimals
  const USDERC20Token = await hre.ethers.getContractFactory("USDC");
  const usdToken = await USDERC20Token.deploy(initialSupply);

  await usdToken.deployTransaction.wait();

  console.log(`USDERC20Token deployed to: ${usdToken.address}`);

  // Use the deployed USDERC20Token's address to deploy MyContract
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy(usdToken.address);

  await myContract.deployTransaction.wait();

  console.log(`MyContract deployed to: ${myContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
