import React, { useState, useEffect } from 'react';
import { Deck as DeckDirectory } from '../directories/Deck';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';

interface DeckSummary {
  colorCount: { [key in Color]?: number };
  scoreCount: { [key: number]: number };
}

const Deck: React.FC = () => {
  const [tileCount, setTileCount] = useState<number>(0);
  const [deckSummary, setDeckSummary] = useState<DeckSummary>({ colorCount: {}, scoreCount: {} });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
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
    setDeckSummary(generateDeckSummary(tiles));
  };

  const generateDeckSummary = (tiles: Tile[]): DeckSummary => {
    const colorCount: { [key in Color]?: number } = {};
    const scoreCount: { [key: number]: number } = {};

    tiles.forEach(tile => {
      // Count by color
      colorCount[tile.color] = (colorCount[tile.color] || 0) + 1;
      
      // Count by score
      scoreCount[tile.score] = (scoreCount[tile.score] || 0) + 1;
    });

    return { colorCount, scoreCount };
  };

  const getColorStyle = (color: Color): React.CSSProperties => {
    return {
      backgroundColor: ColorMap[color],
      color: '#fff',
      padding: '2px 6px',
      borderRadius: '4px',
      margin: '0 2px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      textShadow:'1px 1px 1px rgba(0,0,0,0.5)'
    };
  };

  return (
    <div className="deck-component">
      <div 
        className="deck-display"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {showTooltip && (
          <div className="deck-tooltip">
            <div className="tooltip-header">Deck Contents</div>
            
            <div className="tooltip-section">
              <div className="section-title">Colors:</div>
              <div className="color-list">
                {Object.entries(deckSummary.colorCount).map(([color, count]) => (
                  <span key={color} style={getColorStyle(color as Color)}>
                    {color}: {count}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="tooltip-section">
              <div className="section-title">Scores:</div>
              <div className="score-list">
                {Object.entries(deckSummary.scoreCount)
                  .sort(([a], [b]) => parseInt(a) - parseInt(b))
                  .map(([score, count]) => (
                    <span key={score} className="score-item">
                      {score}: {count}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="deck-count">{tileCount}</div>
        <div className="deck-label">Tiles</div>
      </div>
    </div>
  );
};

export default Deck;
