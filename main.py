import cv2
from pyzbar.pyzbar import decode
from hyperon import MeTTa
import json
import sys
import subprocess

def decode_qr(image_path):
    image = cv2.imread(image_path)
    decoded_objects = decode(image)

    for obj in decoded_objects:
        try:
            data = obj.data.decode('utf-8')
            parsed = json.loads(data)
            return parsed
        except json.JSONDecodeError:
            print("QR code is not in JSON format.")
            return None
        except Exception as e:
            print(f"Error decoding QR code: {e}")
            return None

    print("No QR code found in the image.")
    return None

def validate_nft(token_id, token_uri, metta_file="metta_db.metta"):
    metta = MeTTa()

    # Load metta database
    with open(metta_file) as file:
        metta.run(file.read())

    # Build and run the validation query
    query = f'!(isvalid "{token_id}" "{token_uri}")'
    result = metta.run(query)

    # Interpret result
    if result == [[]]:
        return False
    return True

def send_funds_to_user(user_address, amount_in_ether):
    try:
        # Run the Hardhat sendFunds.js script
        subprocess.run(
            ["npx", "hardhat", "run", "scripts/sendFunds.js", "--network", "ropsten"],
            check=True
        )
        print(f"Funds of {amount_in_ether} Ether successfully sent to {user_address}")
    except subprocess.CalledProcessError as e:
        print(f"Error sending funds: {e}")

if __name__ == "__main__":
    # Accept image path as argument or use default
    image_path = sys.argv[1] if len(sys.argv) > 1 else "test.png"

    qr_data = decode_qr(image_path)

    if qr_data and "tokenId" in qr_data and "tokenURI" in qr_data:
        token_id = qr_data["tokenId"]
        token_uri = qr_data["tokenURI"]

        if validate_nft(token_id, token_uri):
            print(f"✅ NFT is VALID.\nToken ID: {token_id}\nURI: {token_uri}")

            # Ask user if they want to own it
            user_response = input("Do you want to own this NFT and receive some funds? (yes/no): ").strip().lower()

            if user_response == 'yes':
                # Ask the user for their wallet address
                user_address = input("Please enter your wallet address: ").strip()

                # Validate user address (basic check)
                if len(user_address) == 42 and user_address.startswith("0x"):
                    amount_in_ether = "0.00001"  # Amount to send in Ether
                    send_funds_to_user(user_address, amount_in_ether)
                else:
                    print("❌ Invalid wallet address format. Please enter a valid Ethereum address.")

            else:
                print("You chose not to own this NFT.")

        else:
            print(f"❌ NFT is INVALID.\nToken ID: {token_id}\nURI: {token_uri}")
    else:
        print("QR code missing required 'tokenId' or 'tokenURI'.")