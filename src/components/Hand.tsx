import React, { useState, useEffect } from 'react';
import { Hand as HandDirectory } from '../directories/Hand';
import { Tile } from '../types/Tile';
import Hexagon from './Hexagon';

const Hand: React.FC = () => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const hand = HandDirectory.getInstance();

  useEffect(() => {
    // Update initial tiles
    updateHandTiles();

    // Create listener for hand changes
    const listener = () => {
      updateHandTiles();
    };

    // Add listener to hand
    hand.addListener(listener);

    // Cleanup: remove listener when component unmounts
    return () => {
      hand.removeListener(listener);
    };
  }, [hand]);

  const updateHandTiles = () => {
    setTiles(hand.getAllTiles());
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

  return (
    <div className="hand-component">
      <div className="hand-container">
        {tiles.map((tile, index) => (
          <div
            key={tile.id}
            className="hand-tile"
            style={getTileStyle(tile, index, tiles.length)}
          >
            <Hexagon
              width={60}
              height={70}
              tile={tile}
              className="tile-hexagon"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hand;
