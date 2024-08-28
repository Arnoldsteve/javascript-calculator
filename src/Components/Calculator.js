import React, { useState } from 'react';
import '../App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevAnswer, setPrevAnswer] = useState('');

  const handleNumber = (number) => {
    setDisplay(prev => {
      if (prev === '0' || prevAnswer) {
        setPrevAnswer('');
        return number;
      }
      return prev + number;
    });
    setEquation(prev => prev + number);
  };

  const handleOperator = (operator) => {
    if (prevAnswer) {
      setEquation(prevAnswer + operator);
      setPrevAnswer('');
    } else {
      setEquation(prev => {
        // Regular expression to match one or two operators at the end of the string
        const operatorRegex = /[+\-*/]{1,2}$/;
        const match = prev.match(operatorRegex);

        if (match) {
          const lastOperators = match[0];
          
          // If the new operator is '-' and the last operator isn't '-', append it
          if (operator === '-' && lastOperators.slice(-1) !== '-') {
            return prev + operator;
          }
          
          // If we have two operators and the last one is '-', replace both
          if (lastOperators.length === 2 && lastOperators.slice(-1) === '-') {
            return prev.slice(0, -2) + operator;
          }
          
          // Otherwise, replace the last operator
          return prev.slice(0, -1) + operator;
        }
        
        // If there's no operator at the end, simply append the new one
        return prev + operator;
      });
    }
    setDisplay(operator);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
      setEquation(prev => prev + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setPrevAnswer('');
  };

  const handleCalculate = () => {
    try {
      // Remove any trailing operators before evaluation
      let cleanEquation = equation.replace(/[+\-*/]+$/, '');
      const answer = eval(cleanEquation).toString();
      setDisplay(answer);
      setEquation(cleanEquation + '=' + answer);
      setPrevAnswer(answer);
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div id="display" className="display">{display}</div>
      <div className="buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleOperator('/')}>/</button>
        <button id="multiply" onClick={() => handleOperator('*')}>x</button>
        <button id="seven" onClick={() => handleNumber('7')}>7</button>
        <button id="eight" onClick={() => handleNumber('8')}>8</button>
        <button id="nine" onClick={() => handleNumber('9')}>9</button>
        <button id="subtract" onClick={() => handleOperator('-')}>-</button>
        <button id="four" onClick={() => handleNumber('4')}>4</button>
        <button id="five" onClick={() => handleNumber('5')}>5</button>
        <button id="six" onClick={() => handleNumber('6')}>6</button>
        <button id="add" onClick={() => handleOperator('+')}>+</button>
        <button id="one" onClick={() => handleNumber('1')}>1</button>
        <button id="two" onClick={() => handleNumber('2')}>2</button>
        <button id="three" onClick={() => handleNumber('3')}>3</button>
        <button id="equals" onClick={handleCalculate}>=</button>
        <button id="zero" onClick={() => handleNumber('0')}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
};

export default Calculator;