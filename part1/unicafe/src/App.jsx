import { useState } from 'react';
import Button from './components/Button';

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
      <h2>Statistics</h2>
      <div>Good: {good} </div>
      <div> Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {good + neutral + bad}</div>
      <div>
        Average:{' '}
        {good + neutral + bad == 0
          ? 0
          : (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
      </div>
      <div>
        Positive:{' '}
        {good + neutral + bad == 0
          ? 0
          : (good / (good + neutral + bad)) * 100 + '%'}
      </div>
    </>
  );
};

export default App;
