import React, { useState, useEffect } from 'react';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';
import { StateMachine } from '../machines/StateMachine';
import { Hand as HandDirectory } from '../directories/Hand';
import { Board as BoardDirectory } from '../directories/Board';

interface HexagonProps {
  width: number;
  height: number;
  tile: Tile; 
}

const Hexagon: React.FC<HexagonProps> = ({ 
  width, 
  height, 
  tile
}) => {
  // Calculate hexagon points for a proper hexagon
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2;
  
  // Create hexagon points (6 points)
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }

  // Get color and score from tile
  const color = ColorMap[tile.color];
  const score = (tile.color == Color.Free  ||tile.color == Color.Off )? "" : tile.score;

  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [canDragDrop, setCanDragDrop] = useState(false);
  const stateMachine = StateMachine.getInstance();
  const hand = HandDirectory.getInstance();
  const board = BoardDirectory.getInstance();

  // Listen for phase changes to update drag/drop state
  useEffect(() => {
    const updateDragDropState = () => {
      setCanDragDrop(stateMachine.getPhase() === 'WaitForInputPhase');
    };

    // Set initial state
    updateDragDropState();

    // Add listener for phase changes
    stateMachine.addListener(updateDragDropState);

    // Cleanup: remove listener when component unmounts
    return () => {
      stateMachine.removeListener(updateDragDropState);
    };
  }, [stateMachine]);

  // Automatically determine if this hexagon should be draggable or a drop zone
  const isDraggable = canDragDrop && tile.location === 'Hand';
  const isDropZone = canDragDrop && tile.location === 'Board';

  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', tile.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent) => {
    if (!isDropZone) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Handle drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDropZone)  
      return;
     
    const tileId = parseInt(e.dataTransfer.getData('text/plain'));
    const handTiles = hand.getAllTiles();
    const draggedTile = handTiles.find(t => t.id === tileId);
    
    if (draggedTile) {
      
      // Move to PlayPhase with the dragged tile and dropped on tile as parameters
      await stateMachine.setPhase('PlayPhase', {
        draggedTile: draggedTile,
        droppedOnTile: tile
      });
    }
    
    setIsDragOver(false);
  };

  // Determine cursor style based on drag/drop state
  const getCursorStyle = () => {
    if (!canDragDrop) return 'default';
    if (isDraggable) return isDragging ? 'grabbing' : 'grab';
    if (isDropZone) return 'pointer';
    return 'default';
  };

  // Determine opacity based on drag state
  const getOpacity = () => {
    if (isDragging) return 0.5;
    return 1;
  };

  // Determine transform scale based on drag state
  const getTransform = () => {
    if (isDragging) return `scale(1.1)`;
    if (isDragOver) return `scale(1.1)`;
    return '';
  };

  return (
    <div
      style={{
        cursor: getCursorStyle(),
        opacity: getOpacity(),
        transform: getTransform(),
        transition: 'all 0.3s ease',
        display: 'inline-block'
      }}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <svg 
        width={width} 
        height={height}  
        style={{ 
          filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))', 
          display: `${tile.color==Color.Off?'none':'block' }`,
          pointerEvents: 'none',
          transform: 'rotate(30deg)'
        }}
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
        transform={`rotate(-30 ${centerX} ${centerY})`}
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
          filter: 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7))'
        }}
              >
        {score}
      </text>
      </svg>
    </div>
  );
};

export default Hexagon;
