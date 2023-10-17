const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total === 0 ? 0 : (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = total === 0 ? 0 : (good / total) * 100 + '%';

  return (
    <div>
      <h2>Statistics</h2>
      <div>Good: {good} </div>
      <div>Neutral: {neutral}</div>
      <div>Bad: {bad}</div>
      <div>All: {total}</div>
      <div>Average: {average}</div>
      <div>Positive: {positive}</div>
    </div>
  );
};

export default Statistics;