const { NFTStorage, File } = require('nft.storage')
const mime = require('mime')
const fs = require('fs')
const path = require('path')

// Your API key from nft.storage
const API_KEY = 2bfbaf3d.46c5617f6cdd42429b4ee3840a394b96

async function main() {
  const client = new NFTStorage({ token: API_KEY })

  // Set your file path and metadata
  const imagePath = './sneakers.png' // replace with your image file
  const imageFile = await fileFromPath(imagePath)

  const metadata = await client.store({
    name: 'Phigital Sneakers',
    description: 'Limited edition sneakers with NFT-backed proof of authenticity.',
    image: imageFile,
    attributes: [
      { trait_type: 'Size', value: '10' },
      { trait_type: 'Color', value: 'Black & White' },
      { trait_type: 'Serial Number', value: 'SNK-2048-AZ' }
    ]
  })

  console.log('✅ Metadata URI:', metadata.url) // e.g., ipfs://Qm...
}

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath)
  const type = mime.getType(filePath)
  return new File([content], path.basename(filePath), { type })
}

main().catch(console.error)
