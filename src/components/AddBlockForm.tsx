import React, { useState } from 'react';

interface AddBlockFormProps {
  onAddBlock: (data: string) => void;
  isMining: boolean;
}

const AddBlockForm: React.FC<AddBlockFormProps> = ({ onAddBlock, isMining }) => {
  const [blockData, setBlockData] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (blockData.trim() && !isMining) {
      onAddBlock(blockData.trim());
      setBlockData('');
    }
  };
  
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Add New Block</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="blockData" className="block text-sm font-medium text-gray-300 mb-1">
            Block Data
          </label>
          <textarea
            id="blockData"
            rows={3}
            placeholder="Enter data for the new block..."
            className="w-full px-3 py-2 bg-gray-900 text-white placeholder-gray-500 border border-gray-700 
              rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={blockData}
            onChange={(e) => setBlockData(e.target.value)}
            disabled={isMining}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isMining || !blockData.trim()}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-white 
            font-medium transition-all duration-300 ${
              isMining || !blockData.trim()
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-purple-500/20'
            }`}
        >
          {isMining ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mining in progress...
            </>
          ) : (
            'Mine Block'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlockForm;