import React, { useState, useEffect } from 'react';
import { StateMachine } from '../machines/StateMachine';
import { RelictManager } from '../managers/RelictManager';
import { Relict } from '../types/Relict';
import { useGameState } from '../hooks/useGameState';
import RelictDisplay from './RelictDisplay';

const Shop: React.FC = () => {
  const [shopRelicts, setShopRelicts] = useState<Relict[]>([]);
  const { gold } = useGameState();
  
  const relictManager = RelictManager.getInstance();

  useEffect(() => {
    // Listen for changes in shop relicts
    const updateShopRelicts = () => {
      const relicts = relictManager.getShopRelicts();
      console.log('Shop: Received shop relicts update:', relicts);
      setShopRelicts(relicts);
    };

    relictManager.addShopListener(updateShopRelicts);

    // Initial load
    updateShopRelicts();

    return () => {
      relictManager.removeShopListener(updateShopRelicts);
    };
  }, [relictManager]);

  const handleEndShopping = () => {
    StateMachine.getInstance().setPhase('InitRoundPhase');
  };

  const handleReroll = () => {
    relictManager.rerollShop()
  };

  return (
    <div className="shop-component">
      <div className="shop-top-area">
        <div className="shop-relicts">
          {shopRelicts.map((relict, index) => (
            <RelictDisplay 
              key={index} 
              relict={relict} 
              showCost={true}
            />
          ))}
        </div>
        <button 
          className="reroll-button" 
          onClick={handleReroll}
          disabled={gold < relictManager.getRerollCost()}
        >
          Reroll Shop ({relictManager.getRerollCost()} Gold)
        </button>
      </div>
      
      <div className="shop-middle-area">
        <div className="shop-middle-content">
          {/* Middle area content */}
        </div>
        <button className="leave-shop-button" onClick={handleEndShopping}>
          Leave Shop
        </button>
      </div>
      
      <div className="shop-bottom-area">
        {/* Bottom area content */}
      </div>
    </div>
  );
};

export default Shop;
