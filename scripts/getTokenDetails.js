// Import ethers from Hardhat
const { ethers } = require("hardhat");

async function main() {
  // Define the address whose tokens you want to query
  const address = "0xFf92c8CF4a52adaCc3e467f113b1aD7333018B13"; // replace with the desired address
  
  // Replace with the address of the ERC-721 contract
  const nftContractAddress = "0xYourContractAddress"; // replace with your contract address

  // Get the contract ABI (ERC-721 interface)
  const nftABI = [
    "function balanceOf(address owner) external view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256)",
    "function tokenURI(uint256 tokenId) external view returns (string)"
  ];

  // Create a contract instance
  const nftContract = new ethers.Contract(nftContractAddress, nftABI, ethers.provider);

  // Get the balance (number of NFTs the address owns)
  const balance = await nftContract.balanceOf(address);
  console.log(`Address ${address} owns ${balance} NFTs`);

  // Loop through all tokenIds the address owns
  for (let i = 0; i < balance; i++) {
    // Get the tokenId at the current index
    const tokenId = await nftContract.tokenOfOwnerByIndex(address, i);
    console.log(`Token ID at index ${i}: ${tokenId.toString()}`);

    // Get the tokenURI for the tokenId
    const tokenURI = await nftContract.tokenURI(tokenId);
    console.log(`Token URI for token ID ${tokenId}: ${tokenURI}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
