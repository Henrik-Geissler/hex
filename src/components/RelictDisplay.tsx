import React from 'react';
import { Relict } from '../types/Relict';
import './RelictDisplay.css';

interface RelictDisplayProps {
  relict: Relict;
  showCost?: boolean;
  showSellValue?: boolean;
  compact?: boolean;
  showBuyButton?: boolean;
  onBuy?: () => void;
  canAfford?: boolean;
  hasEmptySlot?: boolean;
}

const RelictDisplay: React.FC<RelictDisplayProps> = ({ 
  relict, 
  showCost = false, 
  showSellValue = false,
  compact = false,
  showBuyButton = false,
  onBuy,
  canAfford = true,
  hasEmptySlot = true
}) => {
  const cost = relict.sellValue * 2;
  const canBuy = canAfford && hasEmptySlot;

  return (
    <div className={`relict-display ${compact ? 'compact' : ''}`}>
      <div className="relict-icon">{relict.icon}</div>
      <div className="relict-name">{relict.name}</div>
      {showCost && (
        <div className="relict-cost">{cost} Gold</div>
      )}
      {showSellValue && (
        <div className="relict-sell-value">Sell: {relict.sellValue} Gold</div>
      )}
      <div className="relict-description">{relict.description}</div>
      {showBuyButton && (
        <button 
          className={`buy-button ${!canBuy ? 'disabled' : ''}`}
          onClick={onBuy}
          disabled={!canBuy}
        >
          {!canAfford ? `Need ${cost} Gold` : 
           !hasEmptySlot ? 'No Empty Slots' : 
           `Buy for ${cost} Gold`}
        </button>
      )}
    </div>
  );
};

export default RelictDisplay;
