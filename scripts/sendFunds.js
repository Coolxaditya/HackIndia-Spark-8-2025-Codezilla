const { ethers } = require("hardhat");

async function sendFundsToUser(userAddress, amountInEther) {
    const [deployer] = await ethers.getSigners();
    console.log("Sending funds from:", deployer.address);

    // Fetch the deployed FundSender contract
    const FundSender = await ethers.getContractFactory("MyNFT");
    const fundSender = await FundSender.deploy();
    console.log("FundSender deployed at:", fundSender.address);

    // Convert amount to Wei
    const amountInWei = ethers.utils.parseEther(amountInEther);

    // Send the funds to the user address
    const tx = await fundSender.sendFunds(userAddress, { value: amountInWei });
    console.log("Transaction sent:", tx.hash);
    await tx.wait();
    console.log("Transaction confirmed:", tx.hash);
}

async function main() {
    // Assume you got the user address from the QR data
    const userAddress = "0xUserAddressHere"; // Replace with the actual address from QR
    const amount = "0.0001"; // Amount to send in Ether

    await sendFundsToUser(userAddress, amount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
