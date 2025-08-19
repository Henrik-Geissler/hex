import React, { useState } from 'react';
import { Relict as RelictType } from '../types/Relict';

interface RelictProps {
  relict: RelictType;
  className?: string;
}

const Relict: React.FC<RelictProps> = ({ relict, className = '' }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className={`relict-item ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="relict-icon">
        {relict.icon}
      </div>
      
      {showTooltip && (
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
        </div>
      )}
    </div>
  );
};

export default Relict;
