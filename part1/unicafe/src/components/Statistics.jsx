import StatisticLine from './StatisticLine';

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
          <table>
            <tbody>
              <StatisticLine text='Good' value={good} />
              <StatisticLine text='Neutral' value={neutral} />
              <StatisticLine text='Bad' value={bad} />
              <StatisticLine text='All' value={total} />
              <StatisticLine text='Average' value={average} />
              <StatisticLine text='Positive' value={positive} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Statistics;
