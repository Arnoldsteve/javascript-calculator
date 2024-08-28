import React, { useState } from 'react';
import '../App.css'; // Make sure to create this CSS file

const Calculator = () => {
  const [currentDisplay, setCurrentDisplay] = useState('0');
  const [previousDisplay, setPreviousDisplay] = useState('');
  const operations = ['+', '-', '*', '/'];

  const handleClick = (value) => {
    setCurrentDisplay((prev) => {
      if (operations.includes(value)) {
        if (operations.includes(prev.slice(-1))) {
          return prev.slice(0, -1) + value;
        }
        return prev + value;
      }
      if (prev === '0') {
        return value;
      }
      return prev + value;
    });
  };

  const handleClear = () => {
    setCurrentDisplay('0');
    setPreviousDisplay('');
  };

  const handleCalculate = () => {
    try {
      const result = eval(currentDisplay).toString();
      setPreviousDisplay(currentDisplay + ' =');
      setCurrentDisplay(result);
    } catch (error) {
      setCurrentDisplay('Error');
    }
  };

  return (
    <div className="calculator-container">
      <div className="calculator">
        <div className="display">
          <div className="previous-display">{previousDisplay}</div>
          <div className="current-display">{currentDisplay}</div>
        </div>
        <div className="buttons">
          <button className="clear" onClick={handleClear}>AC</button>
          <button onClick={() => handleClick('/')}>/</button>
          <button onClick={() => handleClick('*')}>x</button>
          <button onClick={() => handleClick('7')}>7</button>
          <button onClick={() => handleClick('8')}>8</button>
          <button onClick={() => handleClick('9')}>9</button>
          <button onClick={() => handleClick('-')}>-</button>
          <button onClick={() => handleClick('4')}>4</button>
          <button onClick={() => handleClick('5')}>5</button>
          <button onClick={() => handleClick('6')}>6</button>
          <button onClick={() => handleClick('+')}>+</button>
          <button onClick={() => handleClick('1')}>1</button>
          <button onClick={() => handleClick('2')}>2</button>
          <button onClick={() => handleClick('3')}>3</button>
          <button className="equal" onClick={handleCalculate}>=</button>
          <button className="zero" onClick={() => handleClick('0')}>0</button>
          <button onClick={() => handleClick('.')}>.</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;