import React from 'react';
import { StateMachine } from '../machines/StateMachine';

const Shop: React.FC = () => {
  const handleEndShopping = () => {
    // Transition back to WaitForInputPhase
    StateMachine.getInstance().setPhase('InitRoundPhase');
  };

  return (
    <div className="shop-component">
    </div>
  );
};

export default Shop;
