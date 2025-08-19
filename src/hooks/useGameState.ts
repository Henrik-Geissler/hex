import { useState, useEffect } from 'react';
import { GameState } from '../machines/GameState';

export const useGameState = () => {
  const [round, setRound] = useState<number>(1);
  const [discards, setDiscards] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const gameState = GameState.getInstance();

  useEffect(() => {
    // Set initial values
    setRound(gameState.getRound());
    setDiscards(gameState.getDiscards());
    setGold(gameState.getGold());

    // Create listener for state changes
    const listener = () => {
      setRound(gameState.getRound());
      setDiscards(gameState.getDiscards());
      setGold(gameState.getGold());
    };

    // Add listener to game state
    gameState.addListener(listener);

    // Cleanup: remove listener when component unmounts
    return () => {
      gameState.removeListener(listener);
    };
  }, [gameState]);

  return {
    round,
    discards,
    gold,
    gameState
  };
};
