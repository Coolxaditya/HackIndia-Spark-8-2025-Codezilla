# NFT QR Validator Backend (Flask + MeTTa)

This Flask-based backend service processes uploaded images containing QR codes, decodes them, and validates associated NFT metadata using the MeTTa knowledge system.

## 🚀 Features

- Uploads and processes QR code images
- Decodes QR content (expects JSON with `tokenId` and `tokenURI`)
- Validates NFT authenticity using MeTTa logic engine
- Returns success/failure response with NFT data

---

## 🧾 Requirements

- Python 3.8+
- OpenCV (`cv2`)
- pyhyperon
- pyzbar
- Flask
- [Hyperon Python bindings for MeTTa](https://github.com/trueagi-ai/hyperon-experimental)

---

## 📁 Folder Structure

