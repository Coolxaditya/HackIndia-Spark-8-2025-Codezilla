async function main() {
    // Get the account to deploy from
    const [deployer] = await ethers.getSigners();
    
    console.log("Deploying contracts with the account:", deployer.address);

    // Get the contract to deploy
    const MyNFT = await ethers.getContractFactory("MyNFT");
    console.log("Get");
    const myNFT = await MyNFT.deploy();
    console.log("Deploy");
    
    console.log("MyNFT contract deployed to:", myNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
