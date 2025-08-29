import React from 'react';
import { Tile } from '../types/Tile';
import { Hand as HandDirectory } from '../directories/Hand';
import { isValidDropTarget } from '../utils/dropZoneValidation';
import { usePhase } from '../hooks/usePhase';
import { StateMachine } from '../machines/StateMachine';
import Hexagon from './Hexagon';

interface PlayableHexagonsInlineOverlayProps {
  centerTile: Tile;
  onClose: () => void;
}

const PlayableHexagonsInlineOverlay: React.FC<PlayableHexagonsInlineOverlayProps> = ({
  centerTile,
  onClose
}) => {
  const { currentPhase } = usePhase();
  const hand = HandDirectory.getInstance();
  
  // Get all hand tiles that can be played at this position
  const playableHandTiles = hand.getAllTiles().filter(handTile => 
    isValidDropTarget(handTile, centerTile)
  );

  // Limit to 20 tiles maximum
  const tilesToShow = playableHandTiles.slice(0, 20);
  
  // Calculate positions for tiles in a circle
  const getTilePosition = (index: number, total: number) => {
    if (total === 1) {
      return { x: 0, y: -80 }; // Above the center tile
    }
    
    const radius = 80; // Distance from center
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;
    
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  };

  const handleTileClick = async (handTile: Tile) => {
    // Close the overlay immediately when a tile is clicked
    onClose();
    
    if (currentPhase === 'WaitForInputPhase') {
      // Trigger the same logic as dropping a tile
      await StateMachine.getInstance().setPhase('PlayPhase', {
        draggedTile: handTile,
        droppedOnTile: centerTile
      });
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close overlay when clicking on the background
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (tilesToShow.length === 0) {
    return null;
  }

  return (
    <div 
      className="playable-hexagons-inline-overlay"
      onClick={handleOverlayClick}
    >
      {tilesToShow.map((handTile, index) => {
        const position = getTilePosition(index, tilesToShow.length);
        return (
          <div
            key={handTile.id}
            className="playable-hexagon-wrapper"
            style={{
              position: 'absolute',
              left: position.x - 25, // Center the hexagon (50px width / 2)
              top: position.y - 25,  // Center the hexagon (50px height / 2)
              zIndex: 99999,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleTileClick(handTile);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Hexagon
              width={50}
              height={50}
              tile={handTile}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PlayableHexagonsInlineOverlay;
