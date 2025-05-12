import { Block, Blockchain } from '../types/blockchain';

// Calculate SHA-256 hash
export const calculateHash = async (
  index: number,
  timestamp: number,
  data: string,
  nonce: number,
  previousHash: string
): Promise<string> => {
  const message = index + timestamp + data + nonce + previousHash;
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

// Create genesis block
export const createGenesisBlock = async (): Promise<Block> => {
  const timestamp = Date.now();
  const hash = await calculateHash(0, timestamp, 'Genesis Block', 0, '0');
  
  return {
    index: 0,
    timestamp,
    data: 'Genesis Block',
    nonce: 0,
    previousHash: '0',
    hash,
    miningTime: 0
  };
};

// Initialize blockchain
export const initBlockchain = async (): Promise<Blockchain> => {
  const genesisBlock = await createGenesisBlock();
  return {
    chain: [genesisBlock],
    difficulty: 4,
    isValid: true
  };
};

// Mine a block (Proof of Work)
export const mineBlock = async (
  blockchain: Blockchain,
  data: string,
  onProgress?: (progress: { nonce: number; hash: string; found: boolean }) => void
): Promise<{ newBlock: Block; miningTime: number }> => {
  const previousBlock = blockchain.chain[blockchain.chain.length - 1];
  const index = previousBlock.index + 1;
  const timestamp = Date.now();
  const previousHash = previousBlock.hash;
  const difficulty = blockchain.difficulty;
  
  let nonce = 0;
  let hash = '';
  const target = '0'.repeat(difficulty);
  const startTime = performance.now();
  
  // Mining loop (Proof of Work)
  while (true) {
    hash = await calculateHash(index, timestamp, data, nonce, previousHash);
    
    // Call progress callback if provided
    if (onProgress) {
      onProgress({ nonce, hash, found: hash.startsWith(target) });
    }
    
    // Check if hash meets difficulty requirement
    if (hash.startsWith(target)) {
      break;
    }
    
    nonce++;
  }
  
  const endTime = performance.now();
  const miningTime = (endTime - startTime) / 1000; // Convert to seconds
  
  const newBlock: Block = {
    index,
    timestamp,
    data,
    nonce,
    previousHash,
    hash,
    miningTime
  };
  
  return { newBlock, miningTime };
};

// Add block to blockchain
export const addBlock = (blockchain: Blockchain, block: Block): Blockchain => {
  return {
    ...blockchain,
    chain: [...blockchain.chain, block],
    isValid: validateChain({ ...blockchain, chain: [...blockchain.chain, block] })
  };
};

// Validate a single block
export const validateBlock = async (block: Block, previousBlock: Block): Promise<boolean> => {
  // Check if index is correct
  if (block.index !== previousBlock.index + 1) {
    return false;
  }
  
  // Check if previous hash is correct
  if (block.previousHash !== previousBlock.hash) {
    return false;
  }
  
  // Verify the hash
  const calculatedHash = await calculateHash(
    block.index,
    block.timestamp,
    block.data,
    block.nonce,
    block.previousHash
  );
  
  if (calculatedHash !== block.hash) {
    return false;
  }
  
  // Verify proof of work
  const target = '0'.repeat(4); // Assuming difficulty of 4
  if (!block.hash.startsWith(target)) {
    return false;
  }
  
  return true;
};

// Validate entire blockchain
export const validateChain = (blockchain: Blockchain): boolean => {
  // Only one block (genesis) - always valid
  if (blockchain.chain.length === 1) {
    return true;
  }
  
  // Check each block with its previous block
  for (let i = 1; i < blockchain.chain.length; i++) {
    const currentBlock = blockchain.chain[i];
    const previousBlock = blockchain.chain[i - 1];
    
    // Validate previous hash
    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
    
    // Validate hash starts with required zeros (proof of work)
    const target = '0'.repeat(blockchain.difficulty);
    if (!currentBlock.hash.startsWith(target)) {
      return false;
    }
  }
  
  return true;
};

// Load blockchain from storage
export const loadBlockchain = (): Blockchain | null => {
  const storedChain = localStorage.getItem('blockchain');
  return storedChain ? JSON.parse(storedChain) : null;
};

// Save blockchain to storage
export const saveBlockchain = (blockchain: Blockchain): void => {
  localStorage.setItem('blockchain', JSON.stringify(blockchain));
};