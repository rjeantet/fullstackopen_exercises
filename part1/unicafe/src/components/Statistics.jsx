const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / total) * 100 + '%';

  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        'No feedback given'
      ) : (
        <>
          <div>Good: {good} </div>
          <div>Neutral: {neutral}</div>
          <div>Bad: {bad}</div>
          <div>All: {total}</div>
          <div>Average: {average}</div>
          <div>Positive: {positive}</div>
        </>
      )}
    </div>
  );
};

export default Statistics;
