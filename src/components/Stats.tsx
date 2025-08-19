import React from 'react';
import { usePhase } from '../hooks/usePhase';

const Stats: React.FC = () => {
  const { currentPhase } = usePhase();

  return (
    <div className="stats-component">
      <h2>Statistics</h2>
      <div className="phase-display">
        <h3>Current Phase:</h3>
        <p className="current-phase">{currentPhase}</p>
      </div>
    </div>
  );
};

export default Stats;
