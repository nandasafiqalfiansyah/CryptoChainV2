import React, { useState, useEffect } from 'react';
import { Blockchain } from './types/blockchain';
import { 
  initBlockchain, 
  mineBlock, 
  addBlock, 
  validateChain 
} from './lib/blockchain';
import { saveBlockchain, loadBlockchain } from './utils/storage';
import Header from './components/Header';
import AddBlockForm from './components/AddBlockForm';
import BlockchainViewer from './components/BlockchainViewer';
import MiningAnimation from './components/MiningAnimation';
import ChainValidation from './components/ChainValidation';

function App() {
  const [blockchain, setBlockchain] = useState<Blockchain | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [miningStats, setMiningStats] = useState({
    nonce: 0,
    hash: '',
    found: false,
  });
  
  // Initialize blockchain on first load
  useEffect(() => {
    const loadChain = async () => {
      // Try to load from localStorage first
      const storedChain = loadBlockchain();
      
      if (storedChain) {
        // Validate the stored chain
        const isValid = validateChain(storedChain);
        setBlockchain({
          ...storedChain,
          isValid
        });
      } else {
        // Initialize a new blockchain with genesis block
        const newChain = await initBlockchain();
        setBlockchain(newChain);
        saveBlockchain(newChain);
      }
    };
    
    loadChain();
  }, []);
  
  // Handle adding a new block
  const handleAddBlock = async (data: string) => {
    if (!blockchain || isMining) return;
    
    setIsMining(true);
    setMiningStats({ nonce: 0, hash: '', found: false });
    
    try {
      // Mine the block with progress updates
      const { newBlock, miningTime } = await mineBlock(
        blockchain,
        data,
        (progress) => {
          setMiningStats(progress);
        }
      );
      
      // Add the block to the chain
      const updatedChain = addBlock(blockchain, newBlock);
      
      // Update state and storage
      setBlockchain(updatedChain);
      saveBlockchain(updatedChain);
      
      // Show success for a moment
      setTimeout(() => {
        setIsMining(false);
      }, 3000);
    } catch (error) {
      console.error('Error mining block:', error);
      setIsMining(false);
    }
  };
  
  // Handle chain reset
  const handleResetChain = async () => {
    if (isMining) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to reset the blockchain? This will delete all blocks except the genesis block.'
    );
    
    if (confirmed) {
      const newChain = await initBlockchain();
      setBlockchain(newChain);
      saveBlockchain(newChain);
    }
  };
  
  if (!blockchain) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-gray-900 text-white overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMzhoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0eiIvPjwvZz48L2c+PC9zdmc+')]"></div>
      
      {/* Mining animation */}
      {isMining && (
        <MiningAnimation 
          nonce={miningStats.nonce} 
          hash={miningStats.hash} 
          found={miningStats.found}
          targetPrefix={'0'.repeat(blockchain.difficulty)} 
        />
      )}
      
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <main className="px-4 py-6">
          <div className="mb-8">
            <ChainValidation blockchain={blockchain} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <AddBlockForm 
                onAddBlock={handleAddBlock} 
                isMining={isMining} 
              />
              
              {/* Chain controls */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4">
                <h3 className="text-lg font-medium text-white mb-4">Chain Controls</h3>
                <div className="space-y-2">
                  <button
                    onClick={handleResetChain}
                    disabled={isMining || blockchain.chain.length <= 1}
                    className={`w-full px-4 py-2 rounded-md text-white font-medium transition-all
                      ${isMining || blockchain.chain.length <= 1
                        ? 'bg-gray-700 cursor-not-allowed opacity-50'
                        : 'bg-red-600 hover:bg-red-700'
                      }`}
                  >
                    Reset Blockchain
                  </button>
                </div>
                
                {/* Blockchain stats */}
                <div className="mt-6 border-t border-gray-700 pt-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Chain Statistics</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Chain Length:</span>
                      <span className="text-white font-mono">{blockchain.chain.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Difficulty:</span>
                      <span className="text-white font-mono">{blockchain.difficulty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Target:</span>
                      <span className="text-green-400 font-mono">{'0'.repeat(blockchain.difficulty)}...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <BlockchainViewer blockchain={blockchain} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;