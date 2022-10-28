import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const LoginState = {
  loggedIn: false,
  user: {},
};

const LoginActionType = {
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
};

export const LoginContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case LoginActionType.LOG_IN:
      return {
        ...state,
        loggedIn: true,
        user: action.payload,
      };
    case LoginActionType.LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

export const LoginProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, LoginState);

  return (
    <LoginContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
