import React, { useEffect, useState } from 'react';

interface MiningAnimationProps {
  nonce: number;
  hash: string;
  found: boolean;
  targetPrefix: string;
}

const MiningAnimation: React.FC<MiningAnimationProps> = ({ nonce, hash, found, targetPrefix }) => {
  const [visible, setVisible] = useState(true);
  
  // Auto-hide the component when mining is complete
  useEffect(() => {
    if (found) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [found]);
  
  if (!visible) return null;
  
  // Highlight matching prefix in the hash
  const renderHash = () => {
    const prefix = hash.substring(0, targetPrefix.length);
    const rest = hash.substring(targetPrefix.length);
    
    const prefixClass = prefix === targetPrefix 
      ? 'text-green-400' 
      : 'text-red-400';
    
    return (
      <>
        <span className={prefixClass}>{prefix}</span>
        <span className="text-gray-400">{rest}</span>
      </>
    );
  };
  
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${found ? 'opacity-90' : 'opacity-95'}`}>
      <div className="max-w-md w-full bg-slate-900 border border-gray-700 rounded-lg p-6 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
          <span className={`mr-2 ${found ? 'text-green-400' : 'text-blue-400'}`}>
            {found ? '✓ Block Mined!' : '⛏️ Mining in Progress'}
          </span>
          {!found && (
            <span className="ml-2 inline-block w-5 h-5">
              <span className="animate-ping absolute h-5 w-5 rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
          )}
        </h2>
        
        <div className="space-y-4">
          <div className="bg-slate-800 rounded p-4 space-y-2 font-mono">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Target:</span>
              <span className="text-green-400">{targetPrefix}...</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Nonce:</span>
              <span className="text-white">{nonce.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Current Hash:</span>
              <span className="font-mono text-xs break-all">{renderHash()}</span>
            </div>
          </div>
          
          {/* Mining animation */}
          <div className="flex flex-col items-center justify-center py-2">
            {found ? (
              <div className="text-center">
                <div className="inline-block rounded-full p-2 bg-green-500/20 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-green-400 font-medium">Valid hash found!</p>
                <p className="text-gray-400 text-sm mt-2">Block will be added to the chain.</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-2"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-blue-500 text-xs font-mono">{(nonce % 100).toString().padStart(2, '0')}</span>
                  </div>
                </div>
                <p className="text-blue-400 font-medium">Computing proof of work...</p>
                <p className="text-gray-400 text-sm mt-2">Looking for hash starting with: {targetPrefix}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningAnimation;