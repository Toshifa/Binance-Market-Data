import React from 'react';

interface IntervalSelectorProps {
  selectedInterval: string;
  onChange: (interval: string) => void;
}

const IntervalSelector: React.FC<IntervalSelectorProps> = ({ selectedInterval, onChange }) => {
  return (
    <div>
      <select
        value={selectedInterval}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 bg-gray-700 text-white border border-gray-500 rounded focus:outline-none focus:ring focus:border-blue-500"
      >
        <option value="1m">1 Minute</option>
        <option value="3m">3 Minutes</option>
        <option value="5m">5 Minutes</option>
      </select>
    </div>
  );
};

export default IntervalSelector;
