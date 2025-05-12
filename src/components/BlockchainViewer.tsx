import React from 'react';
import { Block, Blockchain } from '../types/blockchain';
import BlockCard from './BlockCard';

interface BlockchainViewerProps {
  blockchain: Blockchain;
}

const BlockchainViewer: React.FC<BlockchainViewerProps> = ({ blockchain }) => {
  // Reverse the chain to show most recent blocks first
  const reversedChain = [...blockchain.chain].reverse();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        Blockchain ({blockchain.chain.length} blocks)
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reversedChain.map((block, index) => (
          <BlockCard 
            key={block.hash} 
            block={block} 
            isLatest={index === 0} 
          />
        ))}
      </div>
      
      {/* Empty state */}
      {blockchain.chain.length === 0 && (
        <div className="bg-gray-800/50 rounded-lg p-8 text-center">
          <p className="text-gray-400">No blocks in the chain. Add the first block to get started.</p>
        </div>
      )}
    </div>
  );
};

export default BlockchainViewer;