# react-login-app

Small app to practice more React hooks: `useEffect`, `useReducer`, `useContext`

Built with:

```sh
npm -v
8.1.2
node -v
v16.13.1
```

## useEffect

- Executes a function in response to something (eg., side effect).
- After every component render cycle, the function passed will rerun only if dependencies change (prevents infinite loop). If no dependency, eg., `[]`, the function will run after the first render cycle.
- Use this as an alternative to `useState`.

## useReducer

- Merges related states and actions together. Eg., `emailState` which has a state value, and `dispatchEmail` which handles its validity.

## useContext

- Manages state across components or across entire app.
- No need to pass in data through the parent/child tree via `props`. Eg.
  `isLoggedIn` state and `onLogout` handler.
- **NOT** optimized for high frequency changes

## useImperativeHandle

- When used in conjuction with `forwardRef`, functionalities are exposed from a React component to its parent component through refs in order to trigger these functionalities from the parent.

## When to use props vs Context

`props` should be used for configuring reusable components. Eg., components like `Button` and `Input` should be configurable with different values.

`useContext` should be used for state management. It is a good replacement for long `prop chains`. All components that have this will be bound to the context and will contain the same values. Therefore it is less reusable.
