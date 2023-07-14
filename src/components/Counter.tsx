import { useCounter, useCounterText } from "../context/CounterProvider"

const Counter = () => {
  const { count, increment, decrement } = useCounter();
  const { text, handleTextInput } = useCounterText();

  return (
    <>
      <h1>Count is {count}</h1>
      {/* <button onClick={() => setCount(prev => prev + 1)}>+</button> */}
      <button onClick={increment}>+</button>
      {/* <button onClick={() => setCount(prev => prev - 1)}>-</button> */}
      <button onClick={decrement}>-</button>
      <input type="text" onChange={handleTextInput} />
      <h2>{text}</h2>
    </>
  )
}

export default Counter