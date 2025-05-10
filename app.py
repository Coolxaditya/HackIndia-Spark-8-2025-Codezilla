from flask import Flask, request, jsonify
import json
import cv2
from pyzbar.pyzbar import decode
from io import BytesIO
import numpy as np
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
# Function to decode the QR code from the uploaded image
def decode_qr(image_file):
    # Read the image from the file
    img = cv2.imdecode(np.frombuffer(image_file.read(), np.uint8), cv2.IMREAD_COLOR)
    # Decode the QR code
    decoded_objects = decode(img)
    
    for obj in decoded_objects:
        try:
            # Decode the QR data to UTF-8
            data = obj.data.decode('utf-8')
            parsed_data = json.loads(data)
            return parsed_data
        except json.JSONDecodeError:
            return None  # Invalid JSON
        except Exception as e:
            print(f"Error decoding QR code: {e}")
            return None
    return None  # No QR code found


# Function to validate NFT (this is just an example of validation)
def validate_nft(token_id, token_uri):
    valid_nfts = [
        {"tokenId": "1", "tokenURI": "ipfs://QmExampleTokenURI1/metadata.json"},
        {"tokenId": "2", "tokenURI": "ipfs://QmExampleTokenURI2/metadata.json"},
        # Add more valid NFTs as needed
    ]
    
    # Check if the token_id and token_uri exist in the valid NFTs list
    for nft in valid_nfts:
        if nft["tokenId"] == token_id and nft["tokenURI"] == token_uri:
            return True
    return False


# Route to handle NFT validation
@app.route('/validate-nft', methods=['POST'])
@cross_origin()
def validate_nft_endpoint():
    if 'image' not in request.files:
        return jsonify({"error": "No image file found"}), 400
    
    image_file = request.files['image']
    
    # Decode the QR code from the image
    nft_data = decode_qr(image_file)
    
    if nft_data and "tokenId" in nft_data and "tokenURI" in nft_data:
        token_id = nft_data["tokenId"]
        token_uri = nft_data["tokenURI"]
        
        # Validate the NFT
        if validate_nft(token_id, token_uri):
            return jsonify({
                "valid": True,
                "tokenId": token_id,
                "tokenURI": token_uri
            })
        else:
            return jsonify({
                "valid": False,
                "tokenId": token_id,
                "tokenURI": token_uri
            })
    else:
        return jsonify({"error": "QR code is invalid or missing 'tokenId'/'tokenURI'"}), 400


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
