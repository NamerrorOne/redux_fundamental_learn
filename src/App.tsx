import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  store,
  type CounterId,
  type DecrementAction,
  type IncrementAction,
} from './store';
import { useEffect, useReducer } from 'react';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter counterId="counter1" />
        <Counter counterId="counter2" />
        <Counter counterId="counter3" />
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

function Counter({ counterId }: { counterId: CounterId }) {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      console.log('State changed:', store.getState());
      forceUpdate();
    });
    return unsub;
  }, []);
  return (
    <>
      <button
        onClick={() =>
          store.dispatch({
            type: 'decrement',
            payload: { counterId },
          } as DecrementAction)
        }
      >
        -
      </button>
      {store.getState().counters[counterId]?.counter ?? 0}
      <button
        onClick={() =>
          store.dispatch({
            type: 'increment',
            payload: { counterId },
          } as IncrementAction)
        }
      >
        +
      </button>
    </>
  );
}

export default App;
