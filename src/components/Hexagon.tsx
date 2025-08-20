import React from 'react';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';

interface HexagonProps {
  width: number;
  height: number;
  tile: Tile;
  className?: string;
  rotation?: number; // Rotation in degrees
}

const Hexagon: React.FC<HexagonProps> = ({ 
  width, 
  height, 
  tile, 
  className = '',
  rotation = 0 
}) => {
  // Calculate hexagon points for a proper hexagon
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  
  // Create hexagon points (6 points)
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 + (rotation * Math.PI) / 180; // Add rotation
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  // Get color and score from tile
  const color = ColorMap[tile.color];
  const score = (tile.color == Color.Free  ||tile.color == Color.Off )? "" : tile.score;

  return (
    <svg 
      width={width} 
      height={height} 
      className={className}
      style={{ filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))', display: `${tile.color==Color.Off?'none':'block' }`}}
    >
      {/* Background hexagon with highlight */}
      <polygon
        points={points.join(' ')}
        fill={color}
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="2"
      />
      
      {/* Inner highlight */}
      <polygon
        points={points.join(' ')}
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1"
        transform={`translate(2, 2)`}
      />
      
      {/* Score text - larger and better centered */}
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={Math.max(26, radius * 0.6)}
        fontWeight="bold"
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7))'
        }}
      >
        {score}
      </text>
    </svg>
  );
};

export default Hexagon;
