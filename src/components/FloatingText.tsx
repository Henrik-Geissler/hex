import React, { useState, useEffect } from 'react';
import { TextEmitter } from '../utils/TextEmitter';
import { EmitterEffect } from '../types/EmitterEffect';
import './FloatingText.css';

interface FloatingTextData {
  x: number;
  y: number;
  text: string;
  effect: EmitterEffect;
  id: string;
}

const FloatingText: React.FC = () => {
  const [texts, setTexts] = useState<FloatingTextData[]>([]);

  useEffect(() => {
    const textEmitter = TextEmitter.getInstance();
    
    // Poll for updates every 100ms
    const interval = setInterval(() => {
      const activeEmissions = textEmitter.getActiveEmissions();
      setTexts(activeEmissions);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const calculateScreenPosition = (x: number, y: number) => {
    // Find the board container to get its center position
    const boardContainer = document.querySelector('.board-container');
    
    if (boardContainer) {
      const rect = boardContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      return {
        left: centerX + x,
        top: centerY + y,
      };
    }
    
    // Fallback to viewport center if board container not found
    return {
      left: window.innerWidth * 0.7, // Roughly right panel center
      top: window.innerHeight * 0.4, // Roughly board area center
    };
  };

  return (
    <div className="floating-text-container">
      {texts.map((textData) => {
        const position = calculateScreenPosition(textData.x, textData.y);
        return (
          <div
            key={textData.id}
            className={`floating-text floating-text-${textData.effect.toLowerCase()}`}
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
            }}
          >
            {textData.text}
          </div>
        );
      })}
    </div>
  );
};

export default FloatingText;
