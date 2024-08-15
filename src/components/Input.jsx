import { forwardRef, useState, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Input({ label, textarea, ...props }, ref) {
  const [inputError, setInputError] = useState(null);
  const localRef = useRef();

  let classes =
    'w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600';

  if (inputError) {
    classes += ' border-red-500';
  }

  function validate() {
    if (localRef.current) {
      if (props.required && !localRef.current.value.trim()) {
        setInputError('This field is required.');
        return false;
      } else {
        setInputError(null);
        return true;
      }
    }
    return false;
  }

  useImperativeHandle(ref, () => ({
    validate,
    getValue: () => (localRef.current ? localRef.current.value : ''),
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
          {inputError}
        </small>
      )}
    </p>
  );
});
