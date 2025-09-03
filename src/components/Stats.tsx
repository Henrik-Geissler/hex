import React from 'react';
import { usePhase } from '../hooks/usePhase';
import { useGameState } from '../hooks/useGameState';
import AnimatedNumber from './AnimatedNumber';
import { GameState } from '../machines/GameState';
import { getNextTargetScore } from '../utils/targetScores';
import { Phase } from '../types/Phase';

const Stats: React.FC = () => {
  const { currentPhase } = usePhase();
  const { round, turn, discards, gold, targetScore, score } = useGameState();
  
  // Show next target score in ShopPhase, current target score otherwise
  const displayTargetScore = currentPhase === Phase.ShopPhase 
    ? getNextTargetScore(round) 
    : targetScore;

  return (
    <div className="stats-component">
      
      <div className="phase-display">
        <p className="current-phase">{currentPhase}</p>
      </div>

      <div className="game-stats">
        <div className="stat-row">
          <div className="stat-item">
            <h4>Round:</h4>
            <AnimatedNumber 
              value={round} 
              className="stat-value round-value" 
              duration={1400}
            />
          </div>
          
          <div className="stat-item">
            <h4>Turn:</h4>
            <AnimatedNumber 
              value={turn} 
              className="stat-value turn-value" 
              duration={1400}
            />
          </div>
        </div>

        <div className="stat-row">
          <div className="stat-item">
            <h4>Discards:</h4>
            <AnimatedNumber 
              value={discards} 
              className="stat-value discard-value" 
              duration={1400}
            />
          </div>
          
          <div 
            className="stat-item"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              const gameState = GameState.getInstance();
              gameState.addGold(10);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffd700';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '';
            }}
          >
            <h4>Gold:</h4>
            <AnimatedNumber 
              value={gold} 
              className="stat-value gold-value" 
              duration={1400}
            />
          </div>
        </div>

        <div className="stat-item">
          <h4>Target Score:</h4>
          <AnimatedNumber 
            value={displayTargetScore} 
            className="stat-value target-score-value" 
            duration={1400}
          />
        </div>
        
        <div 
          className="stat-item"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            const gameState = GameState.getInstance();
            const scoreToAdd = Math.floor(displayTargetScore / 10);
            gameState.addScore(scoreToAdd);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#ffd700';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '';
          }}
        >
          <h4>Score:</h4>
          <AnimatedNumber 
            value={score} 
            className="stat-value score-value" 
            duration={1400}
          />
        </div>
      </div>
    </div>
  );
};

export default Stats;
