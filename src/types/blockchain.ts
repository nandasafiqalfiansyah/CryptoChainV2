export interface Block {
  index: number;
  timestamp: number;
  data: string;
  nonce: number;
  previousHash: string;
  hash: string;
  miningTime?: number;
}

export interface Blockchain {
  chain: Block[];
  difficulty: number;
  isValid: boolean;
}