import React, { useState, useEffect } from 'react';
import './ScoreBadge.css';

export type BadgeType = 'increment' | 'double' | 'upgrade';

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
        return '+1';
      case 'double':
        return '×2';
      case 'upgrade':
        return '↑';
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
