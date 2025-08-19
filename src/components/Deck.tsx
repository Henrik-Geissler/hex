import React, { useState, useEffect } from 'react';
import { Deck as DeckDirectory } from '../directories/Deck';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';

const Deck: React.FC = () => {
  const [tileCount, setTileCount] = useState<number>(0);
  const [deckContent, setDeckContent] = useState<string>('');
  const deck = DeckDirectory.getInstance();

  useEffect(() => {
    // Update initial values
    updateDeckInfo();

    // Create listener for deck changes
    const listener = () => {
      updateDeckInfo();
    };

    // Add listener to deck
    deck.addListener(listener);

    // Cleanup: remove listener when component unmounts
    return () => {
      deck.removeListener(listener);
    };
  }, [deck]);

  const updateDeckInfo = () => {
    const tiles = deck.getAllTiles();
    setTileCount(tiles.length);
    setDeckContent(generateDeckSummary(tiles));
  };

  const generateDeckSummary = (tiles: Tile[]): string => {
    const colorCount: { [key in Color]?: number } = {};
    const scoreCount: { [key: number]: number } = {};

    tiles.forEach(tile => {
      // Count by color
      colorCount[tile.color] = (colorCount[tile.color] || 0) + 1;
      
      // Count by score
      scoreCount[tile.score] = (scoreCount[tile.score] || 0) + 1;
    });

    // Generate color summary
    const colorSummary = Object.entries(colorCount)
      .map(([color, count]) => `${color}:${count}`)
      .join(' ');

    // Generate score summary
    const scoreSummary = Object.entries(scoreCount)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .map(([score, count]) => `${score}:${count}`)
      .join(' ');

    return `${colorSummary} | ${scoreSummary}`;
  };

  return (
    <div className="deck-component">
      <div 
        className="deck-display"
        title={deckContent}
      >
        <div className="deck-count">{tileCount}</div>
        <div className="deck-label">Tiles</div>
      </div>
    </div>
  );
};

export default Deck;
