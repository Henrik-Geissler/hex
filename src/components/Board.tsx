import React, { useState, useEffect } from 'react';
import { Board as BoardDirectory } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory';
import Hexagon from './Hexagon';
import { indexToPixel } from '../directories/utils/boardSpace';
import { BoardHoverManager } from '../managers/BoardHoverManager';

const Board: React.FC = () => {
  const [boardTiles, setBoardTiles] = useState<{ [position: number]: any }>({});
  const [boardScale, setBoardScale] = useState(1);
  const [boardOffset, setBoardOffset] = useState({ x: 0, y: 0 });
  const board = BoardDirectory.getInstance();
  const tileFactory = TileFactory.getInstance();
  const boardHoverManager = BoardHoverManager.getInstance();

  // Calculate optimal board scaling and positioning
  const calculateBoardViewport = (tiles: any[]) => {
    if (tiles.length === 0) {
      setBoardScale(1);
      setBoardOffset({ x: 0, y: 0 });
      return;
    }

    // Get all tile positions and convert to pixel coordinates
    const tilePositions = tiles.filter(tile => !tile.isOff()).map(tile => {
      const { x, y } = indexToPixel(tile.pos);
      return { x, y };
    });

    // Calculate bounds
    const minX = Math.min(...tilePositions.map(p => p.x));
    const maxX = Math.max(...tilePositions.map(p => p.x));
    const minY = Math.min(...tilePositions.map(p => p.y));
    const maxY = Math.max(...tilePositions.map(p => p.y));

    // Calculate board dimensions
    const boardWidth = maxX - minX;
    const boardHeight = maxY - minY;

    // Get container dimensions (board-component size)
    const containerWidth = 800; // Approximate width of board-component
    const containerHeight = 600; // Approximate height of board-component

    // Calculate optimal scale to fit all tiles
    const scaleX = containerWidth / (boardWidth + 160); // Add padding
    const scaleY = containerHeight / (boardHeight + 160); // Add padding
    const optimalScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1

    // Calculate center offset to center the board
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;

    setBoardScale(optimalScale);
    setBoardOffset({ x: -centerX, y: -centerY });
  };

  useEffect(() => {
    // Listen for changes to the board
    const updateBoardTiles = () => {
      const tiles = board.getAllTiles();
      const tileMap: { [position: number]: any } = {};
      tiles.forEach(tile => {
        tileMap[tile.pos] = tile;
      });
      setBoardTiles(tileMap);
      
      // Recalculate viewport after updating tiles
      calculateBoardViewport(tiles);
    };

    board.addListener(updateBoardTiles);
    
    // Initial calculation
    const initialTiles = board.getAllTiles();
    const initialTileMap: { [position: number]: any } = {};
    initialTiles.forEach(tile => {
      initialTileMap[tile.pos] = tile;
    });
    setBoardTiles(initialTileMap);
    calculateBoardViewport(initialTiles);
    
    return () => board.removeListener(updateBoardTiles);
  }, [board, tileFactory]);

  const renderBoardTile = (position: number) => {
    const tile = boardTiles[position];
    if (!tile) return null;

    const {x, y} = indexToPixel(position);
    
    // Calculate z-index based on y-coordinate
    // Higher y-coordinates (lower on page) get higher z-index values
    // We'll use a base z-index and add the y-coordinate
    const baseZIndex = 1000;
    const zIndex = baseZIndex + Math.round(y);
    
    return (
      <div
        key={position}
        className="board-tile"
        style={{
          position: 'absolute',
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
          zIndex: zIndex,
        }}
        onMouseEnter={() => boardHoverManager.setHoveredTile(tile)}
        onMouseLeave={() => boardHoverManager.setHoveredTile(null)}
      >
        <Hexagon
          width={100}
          height={100}
          tile={tile} 
        />
      </div>
    );
  };

  return (
    <div className="board-component">
      <div 
        className="board-container"
        style={{
          transform: `scale(${boardScale}) translate(${boardOffset.x}px, ${boardOffset.y}px)`,
          transformOrigin: 'center center',
          transition: 'transform 0.3s ease',
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
        onMouseLeave={() => boardHoverManager.setHoveredTile(null)}
      >
        {Object.keys(boardTiles).map(position => 
          renderBoardTile(parseInt(position))
        )}
      </div>
    </div>
  );
};

export default Board;
