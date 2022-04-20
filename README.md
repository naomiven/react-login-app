# react-login-app

Small app to practice more React hooks: `useEffect`, `useReducer`, `useContext`

## useEffect

- Executes a function in response to something (eg., side effect).
- After every component execution, this function will rerun only if dependencies change (prevents infinite loop).
- Use this as an alternative to `useState`.

## useReducer

- Merges related states and actions together. Eg., `emailState` which has a state value, and `dispatchEmail` which handles its validity.

## useContext

- Manages state across components or across entire app.
- No need to pass in data through the parent/child tree via `props`. Eg.
  `isLoggedIn` state and `onLogout` handler.
- **NOT** optimized for high frequency changes

_Note that `props` should be used for configuring components, but `useContext` should be used for state management and is also a good replacement for long `prop chains`._
