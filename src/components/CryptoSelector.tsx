import React from 'react';

interface CryptoSelectorProps {
  selectedSymbol: string;
  onChange: (symbol: string) => void;
}

const CryptoSelector: React.FC<CryptoSelectorProps> = ({ selectedSymbol, onChange }) => {
  return (
    <div>
      <select
        value={selectedSymbol}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 bg-gray-700 text-white border border-gray-500 rounded focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="ethusdt">ETH/USDT</option>
        <option value="bnbusdt">BNB/USDT</option>
        <option value="dotusdt">DOT/USDT</option>
      </select>
    </div>
  );
};

export default CryptoSelector;
