import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {
  store,
  useAppDispatch,
  useAppSelector,
  type AppState,
  type CounterId,
  type CounterState,
  type DecrementAction,
  type IncrementAction,
} from './store';
import { useDispatch } from 'react-redux';

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

const selectorCounter = (
  state: AppState,
  counterId: CounterId,
): CounterState | undefined => {
  return state.counters[counterId];
};

function Counter({ counterId }: { counterId: CounterId }) {
  const dispatch = useAppDispatch();

  const counterState = useAppSelector((state) =>
    selectorCounter(state, counterId),
  );

  return (
    <>
      <button
        onClick={() =>
          dispatch({
            type: 'decrement',
            payload: { counterId },
          } as DecrementAction)
        }
      >
        -
      </button>
      {counterState?.counter ?? 0}
      <button
        onClick={() =>
          dispatch({
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
