import React, { useState, useEffect } from 'react';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';
import { StateMachine } from '../machines/StateMachine';
import { Hand as HandDirectory } from '../directories/Hand';
import { Board as BoardDirectory } from '../directories/Board';
import { DragEventManager } from '../managers/DragEventManager';
import { isValidDropTarget } from '../utils/dropZoneValidation';
import { BadgeManager, BadgeType } from '../utils/BadgeManager';
import ScoreBadge from './ScoreBadge';

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
  const [isValidDropTargetState, setIsValidDropTargetState] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isPlaceable, setIsPlaceable] = useState(true);
  
  // Score badge state
  const [currentBadge, setCurrentBadge] = useState<BadgeType | null>(null);
  const [showBadge, setShowBadge] = useState(false);
  
  const stateMachine = StateMachine.getInstance();
  const hand = HandDirectory.getInstance();
  const board = BoardDirectory.getInstance();
  const dragEventManager = DragEventManager.getInstance();
  const badgeManager = BadgeManager.getInstance();

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

  // Listen for drag events and evaluate drop zone validity
  useEffect(() => {
    const handleDragEvent = (draggedTile: Tile | null) => {
      if (tile.location === 'Board' && draggedTile) {
        // Check if this tile is a valid drop target
        const isValid = isValidDropTarget(draggedTile, tile);
        setIsValidDropTargetState(isValid);
        setIsHighlighted(isValid);
      } else {
        setIsValidDropTargetState(false);
        setIsHighlighted(false);
      }
    };

    // Add listener for drag events
    dragEventManager.addListener(handleDragEvent);

    // Cleanup: remove listener when component unmounts
    return () => {
      dragEventManager.removeListener(handleDragEvent);
    };
  }, [dragEventManager, tile]);

  // Check if hand tile is placeable anywhere on the board
  useEffect(() => {
    if (tile.location === 'Hand' && canDragDrop) {
      const checkPlaceability = () => {
        const allBoardTiles = board.getAllTiles();
        const hasValidDropZone = allBoardTiles.some(boardTile => 
          isValidDropTarget(tile, boardTile)
        );
        setIsPlaceable(hasValidDropZone);
      };
      
      checkPlaceability();
      
      // Re-check when drag events happen (board state changes)
      const handleDragEvent = () => {
        checkPlaceability();
      };
      
      dragEventManager.addListener(handleDragEvent);
      
      return () => {
        dragEventManager.removeListener(handleDragEvent);
      };
    }
  }, [tile, canDragDrop, board, dragEventManager]);

  // Listen for score badge requests
  useEffect(() => {
    const handleBadgeRequest = (tileId: number, type: BadgeType) => {
      if (tileId === tile.id) {
        setCurrentBadge(type);
        setShowBadge(true);
      }
    };

    // Add listener for score badges
    badgeManager.addListener(handleBadgeRequest);

    // Cleanup: remove listener when component unmounts
    return () => {
      badgeManager.removeListener(handleBadgeRequest);
    };
  }, [tile.id, badgeManager]);

  // Automatically determine if this hexagon should be draggable or a drop zone
  const isDraggable = canDragDrop && tile.location === 'Hand' && isPlaceable;
  const isDropZone = canDragDrop && tile.location === 'Board' && isValidDropTargetState;

  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    dragEventManager.notifyDragStart(tile);
    e.dataTransfer.setData('text/plain', tile.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    dragEventManager.notifyDragEnd();
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
    if (tile.location === 'Hand' && !isPlaceable) return 'not-allowed';
    if (isDraggable) return isDragging ? 'grabbing' : 'grab';
    if (isDropZone) return 'pointer';
    return 'default';
  };

  // Determine opacity based on drag state and placeability
  const getOpacity = () => {
    if (isDragging) return 0.5;
    if (tile.location === 'Hand' && !isPlaceable) return 0.6;
    return 1;
  };

  // Determine transform scale based on drag state and placement
  const getTransform = () => {
    if (tile.isBeeingPlaced) return `translateY(-10px) translateZ(100px) scale(1)`;
    if (isDragging) return `scale(1)`;
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
          filter: tile.location === 'Hand' && !isPlaceable 
            ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) grayscale(0.7)' 
            : tile.isBeeingPlaced
            ? 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5))'
            : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))', 
          display: `${tile.color==Color.Off?'none':'block' }`,
          pointerEvents: 'none',
          transform: 'rotate(30deg)'
        }}
      > 
       
       {/* Background hexagon with highlight */}
       <polygon
         points={points.join(' ')}
         fill={isHighlighted ? (color+"cc") : color}
         stroke={isHighlighted ? "rgba(0, 255, 0, 0.4)" : "rgba(255, 255, 255, 0.3)"}
         strokeWidth={isHighlighted ? "2" : "2"}
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
      
      {/* Score badge overlay */}
      {currentBadge && (
        <ScoreBadge
          key={`${tile.id}-${currentBadge}`}
          type={currentBadge}
          isVisible={showBadge}
          onComplete={() => {
            setShowBadge(false);
            setCurrentBadge(null);
            badgeManager.markBadgeComplete(tile.id);
          }}
        />
      )}
    </div>
  );
};

export default Hexagon;
