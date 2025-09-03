import React, { useState, useEffect } from 'react';
import { Tile } from '../types/Tile';
import { Color, ColorMap } from '../types/Color';
import { FreeTileType } from '../types/FreeTileType';
import { StateMachine } from '../machines/StateMachine';
import { Hand as HandDirectory } from '../directories/Hand';
import { Board as BoardDirectory } from '../directories/Board';
import { DragEventManager } from '../managers/DragEventManager';
import { BoardHoverManager } from '../managers/BoardHoverManager';
import { isValidDropTarget } from '../utils/dropZoneValidation';
import { BadgeManager } from '../utils/BadgeManager';
import { BadgeType } from '../types/BadgeType';
import ScoreBadge from './ScoreBadge';

interface HexagonProps {
  width: number;
  height: number;
  tile: Tile; 
  isPlayableAtHoveredLocation?: boolean;
}

const Hexagon: React.FC<HexagonProps> = ({ 
  width, 
  height, 
  tile,
  isPlayableAtHoveredLocation
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
  
  // Determine what to display in the center
  let displayText = "";
  if (tile.isFree()) {
    // Show emojis for special FreeTileTypes
    switch (tile.freeTileType) {
      case FreeTileType.Upgrade:
        displayText = "⬆️";
        break;
      case FreeTileType.Double:
        displayText = "⚡";
        break;
      case FreeTileType.Coin:
        displayText = "🪙";
        break;
      default:
        displayText = ""; // Regular Free tiles show nothing
    }
  } else if (tile.color !== Color.Off) {
    // Show score for non-Free, non-Off tiles
    displayText = tile.score.toString();
  }

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
  const boardHoverManager = BoardHoverManager.getInstance();

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
              if (tile.isBoard() && draggedTile) {
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

  // Listen for board hover and drag state changes
  useEffect(() => {
    const updateHighlightState = () => {
              if (tile.isBoard()) {
        setIsHighlighted(boardHoverManager.shouldHighlightBoardTile(tile));
      }
    };

    // Set initial state
    updateHighlightState();

    // Add listeners for hover and drag state changes
    boardHoverManager.addListener(updateHighlightState);
    boardHoverManager.addDragListener(updateHighlightState);
    boardHoverManager.addHandHoverListener(updateHighlightState);

    // Cleanup: remove listeners when component unmounts
    return () => {
      boardHoverManager.removeListener(updateHighlightState);
      boardHoverManager.removeDragListener(updateHighlightState);
      boardHoverManager.removeHandHoverListener(updateHighlightState);
    };
  }, [tile, boardHoverManager]);

  // Check if hand tile is placeable anywhere on the board
  useEffect(() => {
            if (tile.isHand() && canDragDrop) {
      const checkPlaceability = () => {
        // If we have a specific hover location, use that
        if (isPlayableAtHoveredLocation !== undefined) {
          setIsPlaceable(isPlayableAtHoveredLocation);
        } else {
          // Otherwise check if it's placeable anywhere
          const allBoardTiles = board.getAllTiles();
          const hasValidDropZone = allBoardTiles.some(boardTile => 
            isValidDropTarget(tile, boardTile)
          );
          setIsPlaceable(hasValidDropZone);
        }
      };
      
      checkPlaceability();
    }
  }, [tile, canDragDrop, board, isPlayableAtHoveredLocation]);

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
        const isDraggable = canDragDrop && tile.isHand() && isPlaceable;
        const isDropZone = canDragDrop && tile.isBoard() && isValidDropTargetState;

  // Handle drag start
  const handleDragStart = (e: React.DragEvent) => {
    if (!isDraggable) {
      e.preventDefault();
      return;
    }
    setIsDragging(true);
    dragEventManager.notifyDragStart(tile);
    boardHoverManager.setDraggedTile(tile);
    e.dataTransfer.setData('text/plain', tile.id.toString());
    e.dataTransfer.effectAllowed = 'move';
  };

  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
    dragEventManager.notifyDragEnd();
    boardHoverManager.setDraggedTile(null);
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
            if (tile.isHand() && !isPlaceable) return 'not-allowed';
    if (isDraggable) return isDragging ? 'grabbing' : 'grab';
    if (isDropZone) return 'pointer';
    return 'default';
  };

  // Determine opacity based on drag state and placeability
  const getOpacity = () => {
    if (isDragging) return 0.5;
    if (tile.isHand() && !isPlaceable) return 0.6;
    if (tile.isGhost) return 0.7; // Ghost tiles are more transparent
    return 1;
  };

  // Determine transform scale based on drag state and placement
  const getTransform = () => {
    if (tile.isBeeingPlaced) return `translateY(-10px) scale(1)`;
    if (isDragging) return `scale(1)`;
    if (isDragOver) return `scale(1.1)`;
    return '';
  };

  // Determine transition timing based on placement state
  const getTransition = () => {
    if (tile.isBeeingPlaced) return 'none'; // No transition when entering placement state
    return 'all 0.3s ease'; // Smooth transition when leaving placement state
  };

  // Get ghostly filter effects for ghost tiles
  const getGhostFilter = () => {
    if (tile.isGhost) {
      return 'drop-shadow(0 0 10px rgba(128, 128, 255, 0.6)) drop-shadow(0 0 20px rgba(128, 128, 255, 0.4)) blur(0.5px)';
    }
    return '';
  };

  // Get ghostly glow effect for ghost tiles
  const getGhostGlow = () => {
    if (tile.isGhost) {
      return 'drop-shadow(0 0 8px rgba(128, 128, 255, 0.8)) drop-shadow(0 0 16px rgba(128, 128, 255, 0.6))';
    }
    return '';
  };

  return (
    <div
              style={{
          cursor: getCursorStyle(),
          opacity: getOpacity(),
          transform: getTransform(),
          transition: getTransition(),
          display: 'inline-block',
          animation: tile.isGhost ? 'ghostFloat 3s ease-in-out infinite' : 'none'
        }}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
              onDrop={handleDrop}
      >
        <style>
          {`
            @keyframes ghostFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
          `}
        </style>
        <svg 
        width={width} 
        height={height}  
        style={{ 
          filter: tile.isHand() && !isPlaceable 
            ? 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3)) grayscale(0.7)' 
            : tile.isBeeingPlaced
            ? 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.5))'
            : tile.isGhost
            ? getGhostFilter()
            : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))', 
          display: `${tile.color==Color.Off?'none':'block' }`,
          pointerEvents: 'none',
          transform: 'rotate(30deg)'
        }}
      > 
       
       {/* Background hexagon with highlight */}
       <polygon
         points={points.join(' ')}
         fill={isHighlighted ?  color:(color+"cc") }
         stroke={isHighlighted ? "rgba(0, 255, 0, 0.4)" : tile.isGhost ? "rgba(128, 128, 255, 0.6)" : "rgba(255, 255, 255, 0.3)"}
         strokeWidth={isHighlighted ? "2" : tile.isGhost ? "3" : "2"}
         style={{
           filter: tile.isGhost ? getGhostGlow() : 'none'
         }}
       />
      
      
      {/* Score text - larger and better centered */}
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={tile.isGhost ? "rgba(255, 255, 255, 0.9)" : "white"}
        fontSize={Math.max(26, radius * 0.6)}
        fontWeight="bold"
        transform={`rotate(-30 ${centerX} ${centerY})`}
        style={{
          textShadow: tile.isGhost 
            ? '0 0 8px rgba(128, 128, 255, 0.8), 2px 2px 4px rgba(0, 0, 0, 0.8)' 
            : '2px 2px 4px rgba(0, 0, 0, 0.8)',
          filter: tile.isGhost 
            ? 'drop-shadow(0 0 6px rgba(128, 128, 255, 0.6)) drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7))'
            : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.7))'
        }}
              >
        {displayText}
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
