import React, { useState, useEffect } from 'react';
import { RelictManager } from '../managers/RelictManager';
import { RelictDeck } from '../directories/RelictDeck';
import { Relict as RelictType } from '../types/Relict';
import { Empty } from '../relicts/Empty';
import RelictComponent from './Relict';

const RelictSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [availableRelicts, setAvailableRelicts] = useState<RelictType[]>([]);
  const [hasEmptySlots, setHasEmptySlots] = useState(true);
  const [dropdownPosition, setDropdownPosition] = useState<'below' | 'above'>('below');
  const relictManager = RelictManager.getInstance();
  const relictDeck = RelictDeck.getInstance();

  useEffect(() => {
    // Get all available relicts from the deck
    const updateAvailableRelicts = () => {
      const allRelicts = relictDeck.getAllRelicts();
      // Sort alphabetically by name
      const sortedRelicts = [...allRelicts].sort((a, b) => a.name.localeCompare(b.name));
      setAvailableRelicts(sortedRelicts);
    };

    // Check for empty slots
    const updateEmptySlots = () => {
      const relicts = relictManager.getRelicts();
      const hasEmpty = relicts.some(relict => relict instanceof Empty);
      setHasEmptySlots(hasEmpty);
    };

    updateAvailableRelicts();
    updateEmptySlots();
    
    // Add listener for relict changes
    relictManager.addListener(updateEmptySlots);
    
    // Cleanup: remove listener when component unmounts
    return () => {
      relictManager.removeListener(updateEmptySlots);
    };
  }, [relictDeck, relictManager]);

  const handleRelictClick = (relict: RelictType) => {
    // Find the rightmost empty slot
    const relicts = relictManager.getRelicts();
    let rightmostEmptyIndex = -1;
    
    // Find the rightmost empty slot
    for (let i = relicts.length - 1; i >= 0; i--) {
      if (relicts[i] instanceof Empty) {
        rightmostEmptyIndex = i;
        break;
      }
    }
    
    // Check if we found an empty slot
    if (rightmostEmptyIndex !== -1) {
      // Add the relict to the rightmost empty slot
      relictManager.setRelict(rightmostEmptyIndex, relict);
      
      // Remove the relict from the deck
      relictDeck.removeRelict(relict);
      
      // Close the dropdown
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => {
    if (!isOpen) {
      // Calculate best position for dropdown
      const buttonRect = document.querySelector('.relict-selector-button')?.getBoundingClientRect();
      if (buttonRect) {
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        
        // For full-height dropdown, prefer below unless there's very little space
        // Only show above if there's significantly more space above and very little below
        if (spaceAbove > spaceBelow * 2 && spaceBelow < 200) {
          setDropdownPosition('above');
        } else {
          setDropdownPosition('below');
        }
      }
    }
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="relict-selector">
      <button 
        className="relict-selector-button"
        onClick={toggleDropdown}
        onBlur={() => setTimeout(closeDropdown, 150)} // Small delay to allow clicking on items
        disabled={!hasEmptySlots}
      >
        {hasEmptySlots ? 'Add Relict' : 'No Empty Slots'}
      </button>
      
             {isOpen && (
         <div className={`relict-dropdown ${dropdownPosition === 'above' ? 'dropdown-above' : 'dropdown-below'}`}>
           <div className="dropdown-header">
             <h4>Select a Relict</h4>
             <button className="close-button" onClick={closeDropdown}>×</button>
           </div>
           <div className="relict-list">
             {availableRelicts.map((relict, index) => (
               <div 
                 key={`${relict.name}-${index}`}
                 className="relict-item"
                 onClick={() => handleRelictClick(relict)}
               >
                 <div className="relict-preview">
                   <RelictComponent 
                     relict={relict} 
                     index={0}
                     className="relict-slot-small"
                     onDragStart={() => {}} // No-op for selector
                   />
                 </div>
                 <div className="relict-info">
                   <div className="relict-name">{relict.name}</div>
                 </div>
               </div>
             ))}
           </div>
         </div>
       )}
    </div>
  );
};

export default RelictSelector;
