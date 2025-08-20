import { useState, useEffect } from 'react';
import { GameState } from '../machines/GameState';

export const useGameState = () => {
  const [round, setRound] = useState<number>(1);
  const [turn, setTurn] = useState<number>(0);
  const [discards, setDiscards] = useState<number>(0);
  const [gold, setGold] = useState<number>(0);
  const [targetScore, setTargetScore] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const gameState = GameState.getInstance();

  useEffect(() => {
    // Set initial values
    setRound(gameState.getRound());
    setTurn(gameState.getTurn());
    setDiscards(gameState.getDiscards());
    setGold(gameState.getGold());
    setTargetScore(gameState.getTargetScore());
    setScore(gameState.getScore());

    // Create listener for state changes
    const listener = () => {
      setRound(gameState.getRound());
      setTurn(gameState.getTurn());
      setDiscards(gameState.getDiscards());
      setGold(gameState.getGold());
      setTargetScore(gameState.getTargetScore());
      setScore(gameState.getScore());
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
    turn,
    discards,
    gold,
    targetScore,
    score,
    gameState
  };
};
