;; Define valid NFTs using (valid-nft <tokenId> <tokenURI>)
(valid-nft "0" "ipfs://QmZy7H9WuEyZy6xT4Xu3qB3eUJv1AojT7aZ8cUoU2ABCDX/metadata.json")
(valid-nft "1" "ipfs://QmExampleTokenURI2/metadata.json")
(valid-nft "2" "ipfs://QmExampleTokenURI3/metadata.json")
(valid-nft "1" "ipfs://bafkreiabdryxgqz6gaozb5d5y65wgn3tztsuwnfiw6ozc6fsxq3o6cvtxy/metadata.json")

;; Function to check if the tokenId and tokenURI match a valid NFT
(= (isvalid $x $y)
  (match &self ($z $x $y) $z))

;; Example usage:
!(isvalid "0" "ipfs://QmZy7H9WuEyZy6xT4Xu3qB3eUJv1AojT7aZ8cUoU2ABCDX/metadata.json") ;; Should return #f
(isvalid "1" "ipfs://WrongTokenURI/metadata.json") ;; Should return #f
(isvalid "2" "ipfs://QmExampleTokenURI3/metadata.json") ;; Should return #t
