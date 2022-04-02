import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  } else if (action.type === 'INPUT_BLUR') {
    // state is guaranteed to have the last value entered for email
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // for useState
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // Merge email value and validity into one state via useReducer
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: false,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  });

  /*
  Assign alias - pull out isValid property and store it in emailIsValid
  Need to do this st. setFormIsValid() will only run if these changes
  */
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  /*
  After every component execution, React reruns this function only if
  either enteredEmail or enteredPassword changed.
  One code in one place instead of (before) in multiple places.
  useEffect should be executed in response to something (eg., side effect)
  */

  useEffect(() => {
    /*
    console.log('Checking for validity on every keystroke!');

    Debounce - Don't keep doing something on every keystroke, but only
    when the user made a pause (eg., every 500ms)
    */
    const identifier = setTimeout(() => {
      console.log('Checking for validity after 500ms!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    /*
    Before the useEffect fcn runs (except 1st time) this cleanup fcn
    will run. Everytime this runs, we clear the previous timer, so we
    always end up with the latest timer which will only run once. A
    typical use case is sending HTTP requests only once per timeout.
    */
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // for useState
    // setEnteredEmail(event.target.value);

    // for useReducer
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // for useState
    // setEnteredPassword(event.target.value);

    // for useReducer
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    // setFormIsValid(emailState.isValid && passwordState.isValid);
  };

  const validateEmailHandler = () => {
    // for useReducer
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    // for useState
    // setPasswordIsValid(enteredPassword.trim().length > 6);

    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // for useState
    // props.onLogin(enteredEmail, enteredPassword);

    // for useReducer
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
