import React, { useState, useEffect } from 'react';
import { RelictManager } from '../managers/RelictManager';
import Relict from './Relict';

const RelictBar: React.FC = () => {
  const [relicts, setRelicts] = useState<Array<any>>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const relictManager = RelictManager.getInstance();

  useEffect(() => {
    // Get initial relicts
    const updateRelicts = () => {
      setRelicts(relictManager.getRelicts());
    };

    updateRelicts();
    
    // Add listener for relict changes
    relictManager.addListener(updateRelicts);
    
    // Cleanup: remove listener when component unmounts
    return () => {
      relictManager.removeListener(updateRelicts);
    };
  }, [relictManager]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropZoneIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex !== null) {
      // Each drop zone represents the exact position where the relict should end up
      // Drop zone 0 = position 0, Drop zone 1 = position 1, etc.
      relictManager.insertRelict(draggedIndex, dropZoneIndex);
      
      // The listener will handle updating the state
    }
    
    setDraggedIndex(null);
  };

  const renderDropZone = (index: number) => (
    <div
      key={`drop-${index}`}
      className="drop-zone"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)}
    />
  );

  return (
    <div className="relict-bar-component">
      <div className="relicts-container">
        {/* Left edge drop zone */}
        {renderDropZone(0)}
        
        {/* Relicts with drop zones between them */}
        {relicts.map((relict, index) => (
          <React.Fragment key={`relict-${index}`}>
            <Relict 
              relict={relict} 
              index={index}
              className="relict-slot"
              onDragStart={handleDragStart}
            />
            {/* Drop zone after each relict (except the last one) */}
            {index < relicts.length - 1 && renderDropZone(index + 1)}
          </React.Fragment>
        ))}
        
        {/* Right edge drop zone */}
        {renderDropZone(relicts.length)}
      </div>
    </div>
  );
};

export default RelictBar;
