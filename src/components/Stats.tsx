import React from 'react';
import { usePhase } from '../hooks/usePhase';
import { useGameState } from '../hooks/useGameState';

const Stats: React.FC = () => {
  const { currentPhase } = usePhase();
  const { round, turn, discards, gold, targetScore, score } = useGameState();

  return (
    <div className="stats-component">
      
      <div className="phase-display">
        <p className="current-phase">{currentPhase}</p>
      </div>

      <div className="game-stats">
        <div className="stat-row">
          <div className="stat-item">
            <h4>Round:</h4>
            <span className="stat-value round-value">{round}</span>
          </div>
          
          <div className="stat-item">
            <h4>Turn:</h4>
            <span className="stat-value turn-value">{turn}</span>
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-item">
            <h4>Discards:</h4>
            <span className="stat-value discard-value">{discards}</span>
          </div>
          
          <div className="stat-item">
            <h4>Gold:</h4>
            <span className="stat-value gold-value">{gold}</span>
          </div>
        </div>

        <div className="stat-item">
          <h4>Target Score:</h4>
          <span className="stat-value target-score-value">{targetScore}</span>
        </div>
        
        <div className="stat-item">
          <h4>Score:</h4>
          <span className="stat-value score-value">{score}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
