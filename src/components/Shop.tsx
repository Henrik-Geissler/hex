import React from 'react';
import { StateMachine } from '../machines/StateMachine';

const Shop: React.FC = () => {
  const handleEndShopping = () => {
    // Transition back to WaitForInputPhase
    StateMachine.getInstance().setPhase('InitRoundPhase');
  };

  return (
    <div className="shop-component">
      <div className="shop-top-area">
        {/* Top area content */}
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
