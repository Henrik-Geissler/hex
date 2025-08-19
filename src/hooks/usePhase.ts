import { useState, useEffect } from 'react';
import { StateMachine } from '../machines/StateMachine';
import { Phase } from '../types/Phase';

export const usePhase = () => {
  const [currentPhase, setCurrentPhase] = useState<string>('InitPhase');
  const stateMachine = StateMachine.getInstance();

  useEffect(() => {
    // Set initial phase
    setCurrentPhase(stateMachine.getPhase());

    // Create listener for phase changes
    const listener = (phase: Phase) => {
      setCurrentPhase(phase);
    };

    // Add listener to state machine
    stateMachine.addListener(listener);

    // Cleanup: remove listener when component unmounts
    return () => {
      stateMachine.removeListener(listener);
    };
  }, [stateMachine]);
 

  return {
    currentPhase 
  };
};
