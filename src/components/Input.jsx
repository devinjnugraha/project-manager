import { forwardRef, useState, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Input({ label, textarea, ...props }, ref) {
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const localRef = useRef();

  let classes =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

  if (inputError) {
    classes += ' border-red-500';
  }

  // Validate function
  function validate() {
    if (localRef.current) {
      if (props.required && !localRef.current.value) {
        setInputError(true);
        setErrorMessage('This field is required.');
        return false;
      } else {
        setInputError(false);
        setErrorMessage('');
        return true;
      }
    }
  }

  useImperativeHandle(ref, () => ({
    validate,
    value: localRef.current ? localRef.current.value : '',
  }));

  function handleBlur() {
    validate();
  }

  return (
    <p className='flex flex-col gap-1 my-4'>
      <label htmlFor='' className='text-sm font-bold uppercase text-stone-500'>
        {label}
      </label>
      {textarea ? (
        <textarea
          ref={localRef}
          className={classes}
          {...props}
          onBlur={handleBlur}
        ></textarea>
      ) : (
        <input
          ref={localRef}
          className={classes}
          {...props}
          onBlur={handleBlur}
        />
      )}
      {inputError && (
        <small muted className='text-red-500 font-semibold'>
          {errorMessage}
        </small>
      )}
    </p>
  );
});
