import React from 'react';
import { Circle as CircleStack } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <CircleStack className="h-8 w-8 text-purple-500 mr-2" />
            <div>
              <h1 className="text-2xl font-bold text-white">BlockchainLab</h1>
              <p className="text-sm text-gray-400">Interactive Blockchain Generator</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-gray-400 flex items-center text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              <span>Web Client</span>
            </div>
            <div className="text-purple-400 flex items-center text-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse"></span>
              <span>Proof of Work</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;