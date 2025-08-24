import React, { useState, useEffect } from 'react';
import { Hand as HandDirectory } from '../directories/Hand';
import { Tile } from '../types/Tile';
import { usePhase } from '../hooks/usePhase';
import { useGameState } from '../hooks/useGameState';
import { StateMachine } from '../machines/StateMachine';
import Hexagon from './Hexagon';
import { BoardHoverManager } from '../managers/BoardHoverManager';

const Hand: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<Set<number>>(new Set());
  const { currentPhase } = usePhase();
  const { discards } = useGameState();
  const hand = HandDirectory.getInstance();
  const boardHoverManager = BoardHoverManager.getInstance();

  useEffect(() => {
    // Update initial tiles
    updateHandTiles();

    // Create listener for hand changes
    const listener = () => {
      updateHandTiles();
    };

    // Add listener to hand
    hand.addListener(listener);

    // Add listener for board hover changes
    const hoverListener = () => {
      updateHandTiles();
    };
    boardHoverManager.addListener(hoverListener);

    // Cleanup: remove listeners when component unmounts
    return () => {
      hand.removeListener(listener);
      boardHoverManager.removeListener(hoverListener);
    };
  }, [hand, boardHoverManager]);

  const updateHandTiles = () => {
    setTiles(hand.getAllTiles());
  };

  const handleTileClick = (tileId: number) => {
    if (currentPhase !== 'WaitForInputPhase') return;
    
    setSelectedTiles(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(tileId)) {
        newSelected.delete(tileId);
      } else {
        newSelected.add(tileId);
      }
      return newSelected;
    });
  };

  const handleDiscard = () => {
    if (currentPhase !== 'WaitForInputPhase' || discards <= 0) return;
    
    // Transition to DiscardPhase with selected cards
    const selectedCardIds = Array.from(selectedTiles);
    StateMachine.getInstance().setPhase('DiscardPhase', { selectedCardIds });
    
    // Clear selection after triggering discard
    setSelectedTiles(new Set());
  };

  const getTileStyle = (tile: Tile, index: number, totalTiles: number): React.CSSProperties => {
    // Spread tiles across full width of the hand component
    const containerWidth = 80; // Percentage of container width
    const spacing = totalTiles > 1 ? containerWidth / (totalTiles - 1) : 0;
    const xPosition = (index * spacing) - (containerWidth / 2); // Center the spread
    
    // Move tiles up a bit (reduce bottom padding)
    const yOffset = 50; // Move up by 20px
    
    // Calculate rotation for the tile (lighter rotation)
    const rotation = (index - (totalTiles - 1) / 2) * 5; // Rotate based on position
    
    // Calculate z-index for layering (center tiles on top)
    const zIndex = totalTiles - Math.abs(index - (totalTiles - 1) / 2);

    return {
      position: 'absolute',
      left: `calc(50% + ${xPosition}%)`,
      bottom: `${yOffset-Math.abs(rotation)}px`,
      transform: `translateX(-50%) rotate(${rotation}deg)`,
      zIndex: Math.round(zIndex),
      transition: 'all 0.3s ease',
    };
  };

  const isDiscardButtonEnabled = currentPhase === 'WaitForInputPhase' && discards > 0;
  const hasSelectedTiles = selectedTiles.size > 0;

  return (
    <div className="hand-component">
      <div className="hand-container">
        {tiles.map((tile, index) => (
          <div
            key={tile.id}
            className={`hand-tile ${selectedTiles.has(tile.id) ? 'selected' : ''}`}
            style={getTileStyle(tile, index, tiles.length)}
            onClick={() => handleTileClick(tile.id)}
          >
            <Hexagon
              width={60}
              height={70}
              tile={tile} 
              isPlayableAtHoveredLocation={boardHoverManager.isHandTilePlayableAtHoveredLocation(tile)}
            />
          </div>
        ))}
      </div>
      
      {/* Discard Button */}
      <div className="discard-button-container">
        <button
          className={`discard-button ${isDiscardButtonEnabled ? 'enabled' : 'disabled'}`}
          onClick={handleDiscard}
          disabled={!isDiscardButtonEnabled}
        >
          {hasSelectedTiles 
            ? `Discard ${selectedTiles.size} Card${selectedTiles.size !== 1 ? 's' : ''}`
            : 'Discard All Cards'
          }
          <span className="discard-count">({discards} left)</span>
        </button>
      </div>
    </div>
  );
};

export default Hand;
