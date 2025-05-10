import cv2
from hyperon import MeTTa
from pyzbar.pyzbar import decode
import json

def decode_qr(image_path):
    # Read the image containing the QR code
    image = cv2.imread(image_path)

    # Decode the QR code(s) in the image
    decoded_objects = decode(image)

    # Loop through each decoded object (QR code found in the image)
    for obj in decoded_objects:
        try:
            # Decode the data from the QR code to a UTF-8 string
            data = obj.data.decode('utf-8')

            # Try parsing the data as JSON
            try:
                parsed = json.loads(data)
                return parsed
            except json.JSONDecodeError:
                print("QR data is not in JSON format.")
                return data
        except Exception as e:
            print(f"Error decoding QR code: {e}")
            return None

    print("No QR code found in the image.")
    return None

# Example usage
if __name__ == "__main__":
    path = "test.png"  # Replace with your actual image path
    qr_data = decode_qr(path)
    metta = MeTTa()

    if qr_data and "tokenId" in qr_data and "tokenURI" in qr_data:
        # Load your meTTa definitions
        with open("metta_db.metta") as file:
            metta.run(file.read())

        # Build the actual expression using f-string to inject the values
        token_id = qr_data["tokenId"]
        token_uri = qr_data["tokenURI"]
        query = f'!(isvalid "{token_id}" "{token_uri}")'

        # Run the query
        result = metta.run(query)
        print(f"Validation result: {result}")
    else:
        print("No valid QR data found or missing keys.")
