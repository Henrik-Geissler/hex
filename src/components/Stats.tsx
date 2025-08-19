import React from 'react';
import { usePhase } from '../hooks/usePhase';
import { useGameState } from '../hooks/useGameState';

const Stats: React.FC = () => {
  const { currentPhase } = usePhase();
  const { round, discards, gold } = useGameState();

  return (
    <div className="stats-component"> 
      
      <div className="phase-display"> 
        <p className="current-phase">{currentPhase}</p>
      </div>

      <div className="game-stats">
        <div className="stat-item">
          <h4>Round:</h4>
          <span className="stat-value round-value">{round}</span>
        </div>
        
        <div className="stat-item">
          <h4>Discards:</h4>
          <span className="stat-value discard-value">{discards}</span>
        </div>
        
        <div className="stat-item">
          <h4>Gold:</h4>
          <span className="stat-value gold-value">{gold}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
