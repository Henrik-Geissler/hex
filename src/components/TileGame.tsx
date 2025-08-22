import React from 'react';
import Stats from './Stats';
import RelictBar from './RelictBar';
import Deck from './Deck';
import Board from './Board';
import Hand from './Hand';
import Shop from './Shop';
import FloatingText from './FloatingText';
import { usePhase } from '../hooks/usePhase';
import './TileGame.css';

const TileGame: React.FC = () => {
  const { currentPhase } = usePhase();
  
  // Determine which component to show in the main area
  const renderMainArea = () => {
    if (currentPhase === 'ShopPhase') {
      return <Shop />;
    } else {
      return <Board />;
    }
  };

  return (
    <div className="tile-game-layout">
      <div className="left-panel">
        <Stats />
        <RelictBar />
        <Deck />
      </div>
      <div className="right-panel">
        {renderMainArea()}
        <Hand />
      </div>
      <FloatingText />
    </div>
  );
};

export default TileGame;
