import React from 'react';
import Stats from './Stats';
import RelictBar from './RelictBar';
import Deck from './Deck';
import Board from './Board';
import Hand from './Hand';
import './TileGame.css';

const TileGame: React.FC = () => {
  return (
    <div className="tile-game-layout">
      {/* Left Side - 1/Golden Ratio width */}
      <div className="left-panel">
        <Stats />
        <RelictBar />
        <Deck />
      </div>

      {/* Right Side - Golden Ratio width */}
      <div className="right-panel">
        <Board />
        <Hand />
      </div>
    </div>
  );
};

export default TileGame;
