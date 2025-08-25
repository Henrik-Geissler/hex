import React, { useState, useEffect } from 'react';
import './ScoreBadge.css';
import { BadgeType } from '../types/BadgeType';

interface ScoreBadgeProps {
  type: BadgeType;
  isVisible: boolean;
  onComplete: () => void;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ 
  type, 
  isVisible, 
  onComplete 
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
      
      // Hide the badge after 500ms
      const timer = setTimeout(() => {
        setShouldShow(false);
        // Call onComplete after fade out animation
        setTimeout(onComplete, 200);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  const getBadgeContent = () => {
    switch (type) {
      case 'increment':
        return '➕';
      case 'double':
        return '⚡';
      case 'upgrade':
        return '⬆️';
      case 'color':
        return '🎨';
      case 'mirror':
        return '🪞';
      case 'consume':
        return '🍽️';
      case 'disappear':
        return '👻';
      case 'coin':
        return '🪙';
      case 'move':
        return '👟';
      default:
        return '';
    }
  };

  const getBadgeClass = () => {
    return `score-badge score-badge-${type} ${shouldShow ? 'visible' : 'hidden'}`;
  };

  return (
    <div className={getBadgeClass()}>
      {getBadgeContent()}
    </div>
  );
};

export default ScoreBadge;
