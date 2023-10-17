import { useState } from 'react';
import Button from './components/Button';
import Statistics from './components/Statistics';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h2>Give Feedback</h2>
      <p>
        <Button handleClick={handleGoodClick} status={'good'} />
        <Button handleClick={handleNeutralClick} status={'neutral'} />
        <Button handleClick={handleBadClick} status={'bad'} />
      </p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
