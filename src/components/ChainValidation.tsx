import React from 'react';
import { Blockchain } from '../types/blockchain';

interface ChainValidationProps {
  blockchain: Blockchain;
}

const ChainValidation: React.FC<ChainValidationProps> = ({ blockchain }) => {
  return (
    <div className={`flex items-center justify-center p-3 rounded-lg 
      ${blockchain.isValid 
        ? 'bg-green-900/20 border border-green-700' 
        : 'bg-red-900/20 border border-red-700'}`}
    >
      <div className={`w-3 h-3 rounded-full mr-2 
        ${blockchain.isValid ? 'bg-green-500' : 'bg-red-500'}`}>
      </div>
      <span className={`text-sm font-medium 
        ${blockchain.isValid ? 'text-green-400' : 'text-red-400'}`}>
        {blockchain.isValid 
          ? 'Blockchain Valid: All blocks verified and chain integrity confirmed' 
          : 'Blockchain Invalid: Chain integrity compromised'}
      </span>
    </div>
  );
};

export default ChainValidation;