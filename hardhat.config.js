require('@nomiclabs/hardhat-ethers');
require('dotenv').config();  // To load environment variables from .env file

module.exports = {
  solidity: "0.8.20",  // Use the appropriate Solidity version for your project
  networks: {
    ropsten: {
      url: process.env.ALCHEMY_API_URL,  // Alchemy URL
      accounts: [process.env.PRIVATE_KEY],  // Your wallet's private key
    },
  },
};
