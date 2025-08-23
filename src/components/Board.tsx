import React, { useState, useEffect } from 'react';
import { Board as BoardDirectory } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory';
import Hexagon from './Hexagon';
import { indexToPixel } from '../directories/utils/boardSpace';

const Board: React.FC = () => {
  const [boardTiles, setBoardTiles] = useState<{ [position: number]: any }>({});
  const board = BoardDirectory.getInstance();
  const tileFactory = TileFactory.getInstance();

  useEffect(() => {

    // Listen for changes to the board
    const updateBoardTiles = () => {
      const tiles = board.getAllTiles();
      const tileMap: { [position: number]: any } = {};
      tiles.forEach(tile => {
        tileMap[tile.pos] = tile;
      });
      setBoardTiles(tileMap);
    };

    board.addListener(updateBoardTiles);
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
      <div className="board-container">
        {Object.keys(boardTiles).map(position => 
          renderBoardTile(parseInt(position))
        )}
      </div>
    </div>
  );
};

export default Board;
