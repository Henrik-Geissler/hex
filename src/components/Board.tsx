import React, { useState, useEffect } from 'react';
import { Board as BoardDirectory } from '../directories/Board';
import { TileFactory } from '../factories/TileFactory';
import Hexagon from './Hexagon';

const Board: React.FC = () => {
  const [boardTiles, setBoardTiles] = useState<{ [position: number]: any }>({});
  const board = BoardDirectory.getInstance();
  const tileFactory = TileFactory.getInstance();

  useEffect(() => {
    // Initialize the first 30 positions with OffTiles
    const initialTiles: { [position: number]: any } = {};
    
    for (let position = 0; position < 38; position++) {
      const offTile = tileFactory.createOffTile(position);
      offTile.location = 'Board';
      offTile.score = position;
      initialTiles[position] = offTile;
    }
    
    setBoardTiles(initialTiles);
  }, [tileFactory]);

  const renderBoardTile = (position: number) => {
    const tile = boardTiles[position];
    if (!tile) return null;

    const [x, y] = board.positionToCoordinates(position);
    
    return (
      <div
        key={position}
        className="board-tile"
        style={{
          position: 'absolute',
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Hexagon
          width={100}
          height={100}
          color="#666666" // Off tile color
          score={tile.score}
          className="board-hexagon"
          rotation={30} // Rotate 30 degrees for proper honeycomb alignment
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
