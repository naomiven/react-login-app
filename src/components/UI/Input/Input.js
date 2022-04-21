import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// Export by wrapping with forwardRef
// This component is now capable of being bound to a ref
// It is controllable/usable with refs
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  // Focus on component after it is rendered
  const activate = () => {
    inputRef.current.focus();
  };

  // Translational object between external (focus) and internal (activate)
  // Exposing `focus` function that points to `activate` function
  useImperativeHandle(ref, () => {
    return {
      focus: activate,
    };
  });

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
