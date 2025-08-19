import React, { useState, useEffect } from 'react';
import { Tile } from '../types/Tile';
import { Color } from '../types/Color';
import { Location } from '../types/Location';
import { TileFactory } from '../factories/TileFactory';
import './TileGame.css';

const TileGame: React.FC = () => {
  const [tileFactory] = useState(() => TileFactory.getInstance());
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location>('Deck');
  const [selectedColor, setSelectedColor] = useState<Color>('Off');

  // Initialize with some tiles
  useEffect(() => {
    const initialTiles = tileFactory.createStandardDeck();
    setTiles(initialTiles);
  }, [tileFactory]);

  const handleCreateTile = () => {
    const newTile = tileFactory.createTile(
      Math.floor(Math.random() * 10) + 1,
      tiles.length,
      selectedLocation,
      selectedColor
    );
    setTiles([...tiles, newTile]);
  };

  const handleMoveTiles = (fromLocation: Location, toLocation: Location) => {
    tileFactory.moveTiles(fromLocation, toLocation);
    setTiles([...tileFactory.getAllTiles()]);
  };

  const handleRemoveTile = (id: number) => {
    tileFactory.removeTile(id);
    setTiles([...tileFactory.getAllTiles()]);
  };

  const getTilesByLocation = (location: Location) => {
    return tiles.filter(tile => tile.location === location);
  };

  const getColorStyle = (color: Color) => {
    const colorMap: { [key in Color]: string } = {
      'Off': '#666666',
      'Free': '#ffffff',
      'Red': '#ff4444',
      'Orange': '#ff8844',
      'Yellow': '#ffcc44',
      'Lime': '#88ff44',
      'Green': '#44ff44',
      'Cyan': '#44ffcc',
      'Blue': '#4488ff',
      'Purple': '#8844ff'
    };
    return { backgroundColor: colorMap[color] };
  };

  return (
    <div className="tile-game">
      <h1>Tile Game</h1>
      
      <div className="controls">
        <h2>Create New Tile</h2>
        <div className="control-group">
          <label>
            Location:
            <select 
              value={selectedLocation} 
              onChange={(e) => setSelectedLocation(e.target.value as Location)}
            >
              <option value="Deck">Deck</option>
              <option value="Hand">Hand</option>
              <option value="Board">Board</option>
              <option value="Discard">Discard</option>
            </select>
          </label>
          
          <label>
            Color:
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value as Color)}
            >
              <option value="Off">Off</option>
              <option value="Free">Free</option>
              <option value="Red">Red</option>
              <option value="Orange">Orange</option>
              <option value="Yellow">Yellow</option>
              <option value="Lime">Lime</option>
              <option value="Green">Green</option>
              <option value="Cyan">Cyan</option>
              <option value="Blue">Blue</option>
              <option value="Purple">Purple</option>
            </select>
          </label>
          
          <button onClick={handleCreateTile}>Create Tile</button>
        </div>
      </div>

      <div className="game-board">
        <div className="location-section">
          <h3>Deck ({getTilesByLocation('Deck').length})</h3>
          <div className="tiles-container">
            {getTilesByLocation('Deck').map(tile => (
              <div 
                key={tile.id} 
                className="tile"
                style={getColorStyle(tile.color)}
              >
                <div className="tile-score">{tile.score}</div>
                <div className="tile-id">#{tile.id}</div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveTile(tile.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="location-section">
          <h3>Hand ({getTilesByLocation('Hand').length})</h3>
          <div className="tiles-container">
            {getTilesByLocation('Hand').map(tile => (
              <div 
                key={tile.id} 
                className="tile"
                style={getColorStyle(tile.color)}
              >
                <div className="tile-score">{tile.score}</div>
                <div className="tile-id">#{tile.id}</div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveTile(tile.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="location-section">
          <h3>Board ({getTilesByLocation('Board').length})</h3>
          <div className="tiles-container">
            {getTilesByLocation('Board').map(tile => (
              <div 
                key={tile.id} 
                className="tile"
                style={getColorStyle(tile.color)}
              >
                <div className="tile-score">{tile.score}</div>
                <div className="tile-id">#{tile.id}</div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveTile(tile.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="location-section">
          <h3>Discard ({getTilesByLocation('Discard').length})</h3>
          <div className="tiles-container">
            {getTilesByLocation('Discard').map(tile => (
              <div 
                key={tile.id} 
                className="tile"
                style={getColorStyle(tile.color)}
              >
                <div className="tile-score">{tile.score}</div>
                <div className="tile-id">#{tile.id}</div>
                <button 
                  className="remove-btn"
                  onClick={() => handleRemoveTile(tile.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button onClick={() => handleMoveTiles('Deck', 'Hand')}>
            Draw Cards (Deck → Hand)
          </button>
          <button onClick={() => handleMoveTiles('Hand', 'Board')}>
            Play Cards (Hand → Board)
          </button>
          <button onClick={() => handleMoveTiles('Board', 'Discard')}>
            Discard Board (Board → Discard)
          </button>
          <button onClick={() => handleMoveTiles('Discard', 'Deck')}>
            Shuffle Discard (Discard → Deck)
          </button>
        </div>
      </div>

      <div className="stats">
        <h2>Statistics</h2>
        <p>Total Tiles: {tiles.length}</p>
        <p>Deck: {getTilesByLocation('Deck').length}</p>
        <p>Hand: {getTilesByLocation('Hand').length}</p>
        <p>Board: {getTilesByLocation('Board').length}</p>
        <p>Discard: {getTilesByLocation('Discard').length}</p>
      </div>
    </div>
  );
};

export default TileGame;
