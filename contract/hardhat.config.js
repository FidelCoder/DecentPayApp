// require("@nomiclabs/hardhat-waffle");
// require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");



// Initialize `dotenv` with the `.config()` function
require("dotenv").config({ path: ".env" });

// Environment variables should now be available
// under `process.env`
const PRIVATE_KEY ="4631b73bedaad273f06dba53872ab67cc2bfcd639fccc21508b589c74706eee4";
const RPC_URL ="https://rpc.gnosis.gateway.fm";

// Show an error if environment variables are missing
if (!PRIVATE_KEY) {
  console.error("Missing PRIVATE_KEY environment variable");
}

if (!RPC_URL) {
  console.error("Missing RPC_URL environment variable");
}

// Add the alfajores network to the configuration
module.exports = {
  solidity: "0.8.0",
  networks: {
    gnosis: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};