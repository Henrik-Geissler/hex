import React, { useState } from 'react';
import { Relict as RelictType } from '../types/Relict';
import { Empty } from '../relicts/Empty';

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
  
  // Check if this is an Empty relict
  const isEmptyRelict = relict instanceof Empty;

  const handleDragStart = (e: React.DragEvent) => {
    if (isEmptyRelict) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    onDragStart(e, index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    // Relicts don't handle drag over - only drop zones do
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const slotClassName = `relict-slot ${isDragging ? 'dragging' : ''} ${isEmptyRelict ? 'empty' : ''}`;

  return (
    <div 
      className={`relict-item ${slotClassName}`}
      draggable={!isEmptyRelict}
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
        </div>
      )}
    </div>
  );
};

export default Relict;
