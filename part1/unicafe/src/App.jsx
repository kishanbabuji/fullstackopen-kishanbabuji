import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr> 
)

const Statistics = ({good, neutral, bad}) => {
  console.log({good,neutral,bad})
  
  const computeSum = (good,neutral,bad) => {
    return good+neutral+bad
  }
  const computeAverage = (good, neutral, bad) => {
    return (good*1 + bad*-1)/computeSum(good, neutral, bad)
  }

  const computePositive = (good, neutral, bad) => {
    return (good / computeSum(good, neutral, bad)) * 100 + ' %'
  }
  if(computeSum(good, neutral, bad) == 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={good+neutral+bad} />
          <StatisticLine text='average' value={computeAverage(good,neutral,bad)} />
          <StatisticLine text="positive" value={computePositive(good,neutral,bad)} />
        </tbody>
      </table>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App