import React, { useState, useEffect } from 'react';
import { Deck as DeckDirectory } from '../directories/Deck';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';
import Hexagon from './Hexagon';

interface DeckSummary {
  colorCount: { [key in Color]?: number };
  scoreCount: { [key: number]: number };
}

interface GroupedTile {
  tile: Tile;
  count: number;
}

const Deck: React.FC = () => {
  const [tileCount, setTileCount] = useState<number>(0);
  const [deckSummary, setDeckSummary] = useState<DeckSummary>({ colorCount: {}, scoreCount: {} });
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showFullList, setShowFullList] = useState<boolean>(false);
  const [groupedTiles, setGroupedTiles] = useState<GroupedTile[]>([]);
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
    
    // Group tiles by color and score, then sort
    const grouped = groupAndSortTiles(tiles);
    setGroupedTiles(grouped);
  };

  const groupAndSortTiles = (tiles: Tile[]): GroupedTile[] => {
    const tileMap = new Map<string, GroupedTile>();
    
    tiles.forEach(tile => {
      const key = `${tile.color}-${tile.score}`;
      if (tileMap.has(key)) {
        tileMap.get(key)!.count++;
      } else {
        tileMap.set(key, { tile, count: 1 });
      }
    });

    // Convert to array and sort by color, then by score
    return Array.from(tileMap.values()).sort((a, b) => {
      // First sort by color (alphabetical)
      if (a.tile.color !== b.tile.color) {
        return a.tile.color.localeCompare(b.tile.color);
      }
      // Then sort by score (numerical)
      return a.tile.score - b.tile.score;
    });
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

  const handleDeckClick = () => {
    setShowFullList(!showFullList);
  };

  const closeFullList = () => {
    setShowFullList(false);
  };

  return (
    <div className="deck-component">
      <div 
        className="deck-display"
        onClick={handleDeckClick}
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

      {/* Full Deck List Modal */}
      {showFullList && (
        <div className="deck-full-list-overlay" onClick={closeFullList}>
          <div className="deck-full-list-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Deck Contents ({tileCount} tiles)</h3>
              <button className="close-button" onClick={closeFullList}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="deck-summary-section">
                <div className="summary-item">
                  <span className="summary-label">Colors:</span>
                  <div className="color-list">
                    {Object.entries(deckSummary.colorCount).map(([color, count]) => (
                      <span key={color} style={getColorStyle(color as Color)}>
                        {color}: {count}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="summary-item">
                  <span className="summary-label">Scores:</span>
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

              <div className="tiles-grid">
                <h4>All Tiles (Ordered by Color, then Score)</h4>
                <div className="tiles-container">
                  {groupedTiles.map((groupedTile, index) => (
                    <div key={`${groupedTile.tile.id}-${index}`} className="tile-preview">
                      <div className="tile-hexagon-wrapper">
                        <Hexagon
                          width={40}
                          height={40}
                          tile={groupedTile.tile}
                        />
                        {groupedTile.count > 1 && (
                          <div className="tile-count-badge">
                            ×{groupedTile.count}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deck;
