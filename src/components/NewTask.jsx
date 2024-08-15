import { useState } from 'react';
import { useProject } from '../context/ProjectProvider';

export default function NewTask() {
  const { handleAddTask } = useProject();

  const [inputTask, setInputTask] = useState('');

  function handleChange(event) {
    setInputTask(event.target.value);
  }

  function handleClick() {
    handleAddTask(inputTask);
    setInputTask('');
  }

  return (
    <div className='flex items-center gap-4'>
      <input
        type='text'
        className='w-64 px-2 py-1 rounded-md bg-stone-200'
        onChange={handleChange}
        value={inputTask}
      />
      <button
        className='text-stone-700 hover:text-stone-950'
        onClick={handleClick}
      >
        Add Task
      </button>
    </div>
  );
}
