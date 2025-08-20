import React, { useState } from 'react';
import { Relict as RelictType } from '../types/Relict';
import { Empty } from '../relicts/Empty';
import { StateMachine } from '../machines/StateMachine';
import { RelictManager } from '../managers/RelictManager';

interface RelictProps {
  relict: RelictType;
  index: number;
  className?: string;
  onDragStart: (e: React.DragEvent, index: number) => void;
  onDragOver?: (e: React.DragEvent) => void;
}

const Relict: React.FC<RelictProps> = ({ 
  relict, 
  index, 
  className = '', 
  onDragStart, 
  onDragOver
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const relictManager = RelictManager.getInstance();
  
  // Check if this is an Empty relict
  const isEmptyRelict = relict instanceof Empty;
  
  // Check if we're in a phase where relicts can be dragged
  const stateMachine = StateMachine.getInstance();
  const currentPhase = stateMachine.getPhase();
  const canDrag = currentPhase === 'ShopPhase' || currentPhase === 'WaitForInputPhase';

  const handleDragStart = (e: React.DragEvent) => {
    let canDrag = currentPhase === 'ShopPhase' || currentPhase === 'WaitForInputPhase';
    if (isEmptyRelict || !canDrag) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', index.toString());
    onDragStart(e, index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    // Relicts don't handle drag over - only drop zones do
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleSell = async () => {
    await relictManager.sellRelict(index);
  };

  const slotClassName = `relict-slot ${isDragging ? 'dragging' : ''} ${isEmptyRelict ? 'empty' : ''} ${!canDrag && !isEmptyRelict ? 'locked' : ''}`;

  return (
    <div 
      className={`relict-item ${slotClassName}`}
      draggable={!isEmptyRelict && canDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseEnter={() => !isEmptyRelict && setShowTooltip(true)}
      onMouseLeave={() => !isEmptyRelict && setShowTooltip(false)}
    >
      <div className="relict-icon">
        {relict.icon}
      </div>
      
      {showTooltip && !isEmptyRelict && (
        <div className="relict-tooltip">
          <div className="tooltip-header">
            <span className="tooltip-icon">{relict.icon}</span>
            <span className="tooltip-name">{relict.name}</span>
          </div>
          <div className="tooltip-description">
            {relict.description}
          </div>
          {relict.counter !== undefined && (
            <div className="tooltip-counter">
              Counter: {relict.counter}
            </div>
          )}
          <div className="tooltip-sell-value">
            Sell Value: {relict.sellValue} Gold
          </div>
          <button 
            className="sell-button"
            onClick={handleSell}
            disabled={relict.sellValue <= 0}
          >
            Sell for {relict.sellValue} Gold
          </button>
        </div>
      )}
    </div>
  );
};

export default Relict;
