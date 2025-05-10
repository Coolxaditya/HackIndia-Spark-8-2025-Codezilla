const express = require('express');
const multer = require('multer');
const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Initialize Web3 (assuming using Ethereum network)
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID'));

// Middleware for parsing JSON and form data
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

// Serve static files like HTML, CSS, etc.
app.use(express.static(path.join(__dirname, 'public')));

// Simulate NFT validation and fund transfer logic
app.post('/validate-nft', upload.single('image'), (req, res) => {
    // Assuming you have some method to validate the NFT via QR code or image processing
    // Simulate NFT validation by checking if the image file exists (just as a placeholder for now)
    if (req.file) {
        const tokenId = '1234'; // Example token ID
        const tokenURI = 'ipfs://QmZy7H9WuEyZy6xT4Xu3qB3eUJv1AojT7aZ8cUoU2ABCDX/metadata.json' + tokenId; // Example token URI
        
        // Return the validation result
        return res.json({
            valid: true, // In a real-world app, perform actual validation logic
            tokenId: tokenId,
            tokenURI: tokenURI
        });
    } else {
        return res.status(400).json({ valid: false });
    }
});

// Simulate funds transfer via Ethereum
app.post('/send-funds', async (req, res) => {
    const { userAddress, amountInEther } = req.body;
    const senderAddress = '0xD84E1b8CF72f08c7723741eFf063b592A03b976D'; // Replace with the sender's address
    const privateKey = '5e82f9a5b640a0a78801e66e7dc097ab7a299f8c98befc12d1ded12b9f1ca8c5'; // Replace with the sender's private key (DO NOT expose in production)

    try {
        const amountInWei = web3.utils.toWei(amountInEther, 'ether');

        // Create a transaction object
        const tx = {
            from: senderAddress,
            to: userAddress,
            value: amountInWei,
            gas: 2000000,
            gasPrice: await web3.eth.getGasPrice(),
        };

        // Sign the transaction
        const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

        // Send the transaction
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        return res.json({
            success: true,
            transactionHash: receipt.transactionHash
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Error sending funds.' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
