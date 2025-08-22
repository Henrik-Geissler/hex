import React from 'react';
import { Relict } from '../types/Relict';
import './RelictDisplay.css';

interface RelictDisplayProps {
  relict: Relict;
  showCost?: boolean;
  showSellValue?: boolean;
  compact?: boolean;
}

const RelictDisplay: React.FC<RelictDisplayProps> = ({ 
  relict, 
  showCost = false, 
  showSellValue = false,
  compact = false 
}) => {
  return (
    <div className={`relict-display ${compact ? 'compact' : ''}`}>
      <div className="relict-icon">{relict.icon}</div>
      <div className="relict-name">{relict.name}</div>
      {showCost && (
        <div className="relict-cost">{relict.sellValue * 2} Gold</div>
      )}
      {showSellValue && (
        <div className="relict-sell-value">Sell: {relict.sellValue} Gold</div>
      )}
      <div className="relict-description">{relict.description}</div>
    </div>
  );
};

export default RelictDisplay;
