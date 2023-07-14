import { ChangeEvent, ReactElement, createContext, useCallback, useContext, useReducer } from "react";

type StateType = {
  count: number,
  text: string
}
export const initState: StateType = { count: 0, text: '' };

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE,
  payload?: string,
}

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? '' }; // nullish coalescing operator
    default:
      throw new Error();
  }
}

// Hook for a context
const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }), []);
  const decrement = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }), []);

  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value
    }), []);

  return { state, increment, decrement, handleTextInput };
}

// Context
type UseCounterContext = ReturnType<typeof useCounterContext>;

const initContextState: UseCounterContext = {
  state: initState,
  increment: () => { },
  decrement: () => { },
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => { },
}

export const CounterContext = createContext<UseCounterContext>(initContextState);

type ChildrenType = {
  children?: ReactElement,
}

// Provider
export const CounterProvider = ({
  children,
  ...initState
}: ChildrenType & StateType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  )
}

// Use hooks
type UseCounterProviderHookType = {
  count: number,
  increment: () => void,
  decrement: () => void,
}

export const useCounter = (): UseCounterProviderHookType => {
  const { state: { count }, increment, decrement } = useContext(CounterContext);

  return { count, increment, decrement };
}

type UseCounterTextHookType = {
  text: string,
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const useCounterText = (): UseCounterTextHookType => {
  const { state: { text }, handleTextInput } = useContext(CounterContext);

  return { text, handleTextInput };
}