import React, { useState, useEffect } from 'react';
import { RelictManager } from '../managers/RelictManager';
import Relict from './Relict';

const RelictBar: React.FC = () => {
  const [relicts, setRelicts] = useState<Array<any>>([]);
  const relictManager = RelictManager.getInstance();

  useEffect(() => {
    // Get initial relicts
    const updateRelicts = () => {
      setRelicts(relictManager.getRelicts());
    };

    updateRelicts();
    
    // Note: RelictManager doesn't have listeners yet, so we'll need to add them later
    // For now, this will work for initial display
  }, [relictManager]);

  return (
    <div className="relict-bar-component">
      <div className="relicts-container">
        {relicts.map((relict, index) => (
          <Relict 
            key={index} 
            relict={relict} 
            className="relict-slot"
          />
        ))}
      </div>
    </div>
  );
};

export default RelictBar;
