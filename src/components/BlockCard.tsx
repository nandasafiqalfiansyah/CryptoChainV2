import React from 'react';
import { Block } from '../types/blockchain';

interface BlockCardProps {
  block: Block;
  isLatest: boolean;
}

const BlockCard: React.FC<BlockCardProps> = ({ block, isLatest }) => {
  // Format the timestamp to local date and time
  const formattedTime = new Date(block.timestamp).toLocaleString();
  
  // Format the hash for display (first 6 and last 6 characters)
  const formatHash = (hash: string) => {
    if (hash.length <= 12) return hash;
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 6)}`;
  };
  
  // Toggle for showing full hash on click
  const [showFullHash, setShowFullHash] = React.useState(false);
  const [showFullPrevHash, setShowFullPrevHash] = React.useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden rounded-lg shadow-md 
        ${isLatest ? 'bg-gradient-to-br from-indigo-900 to-purple-900 border-2 border-purple-500' : 
          'bg-gradient-to-br from-gray-900 to-slate-800 border border-gray-700'}
        transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group`}
    >
      {/* Hexagon background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSI0OSIgdmlld0JveD0iMCAwIDI4IDQ5Ij48ZyBmaWxsPSIjZmZmIj48ZyBvcGFjaXR5PSIwLjgiPjxwYXRoIGQ9Ik0xMy45OTMgNDIuNDE2QzYuNjI2IDQyLjQxNiAwLjYzMSAzNi40MiAwLjYzMSAyOS4wNTNjMC03LjM2NiA1Ljk5NS0xMy4zNjIgMTMuMzYyLTEzLjM2MnMxMy4zNjIgNS45OTUgMTMuMzYyIDEzLjM2MmMwIDcuMzY2LTUuOTk0IDEzLjM2My0xMy4zNjIgMTMuMzYzeiIvPjwvZz48ZyBvcGFjaXR5PSIwLjgiPjxwYXRoIGQ9Ik0xMy45OTMgMTkuNDA3QzYuNjI2IDE5LjQwNyAwLjYzMSAxMy40MTEgMC42MzEgNi4wNDRjMC03LjM2NiA1Ljk5NS0xMy4zNjIgMTMuMzYyLTEzLjM2MnMxMy4zNjIgNS45OTUgMTMuMzYyIDEzLjM2MmMwIDcuMzY2LTUuOTk0IDEzLjM2My0xMy4zNjIgMTMuMzYzeiIvPjwvZz48L2c+PC9zdmc+')] rotate-45"></div>
      
      <div className="p-5 relative z-10">
        {/* Block Index and Timing */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <span className={`text-xs font-mono px-2 py-1 rounded-full 
              ${block.index === 0 ? 'bg-blue-900 text-blue-100' : 'bg-purple-900 text-purple-100'}`}>
              Block #{block.index}
            </span>
          </div>
          <div className="text-xs text-gray-400">
            {block.miningTime !== undefined && block.index > 0 && (
              <span className="ml-2 text-green-400">
                ⛏️ {block.miningTime.toFixed(2)}s
              </span>
            )}
          </div>
        </div>

        {/* Block Data */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1">
            {block.index === 0 ? 'Genesis Block' : 'Block Data'}
          </h3>
          <p className="text-gray-300 bg-black/30 p-2 rounded min-h-16 font-mono text-sm break-words">
            {block.data}
          </p>
        </div>

        {/* Technical Details */}
        <div className="space-y-2 font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-gray-400">TIMESTAMP</span>
            <span className="text-gray-200">{formattedTime}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-gray-400">NONCE</span>
            <span className="text-blue-300">{block.nonce}</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">HASH</span>
              <button 
                onClick={() => setShowFullHash(!showFullHash)}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                {showFullHash ? 'Hide' : 'Show Full'}
              </button>
            </div>
            <span className="text-green-300 break-all">
              {showFullHash ? block.hash : formatHash(block.hash)}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">PREV HASH</span>
              <button 
                onClick={() => setShowFullPrevHash(!showFullPrevHash)}
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                {showFullPrevHash ? 'Hide' : 'Show Full'}
              </button>
            </div>
            <span className="text-yellow-300 break-all">
              {showFullPrevHash ? block.previousHash : formatHash(block.previousHash)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Glow effect for latest block */}
      {isLatest && (
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-50"></div>
      )}
    </div>
  );
};

export default BlockCard;