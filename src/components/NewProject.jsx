import { useRef } from 'react';
import Input from './Input';
import Modal from './Modal';

export default function NewProject({ onSave, onCancel }) {
  const inputTitle = useRef();
  const inputDescription = useRef();
  const inputDueDate = useRef();
  const modal = useRef();

  function handleSave() {
    const isTitleValid = inputTitle.current.validate();
    const isDescriptionValid = inputDescription.current.validate();
    const isDueDateValid = inputDueDate.current.validate();

    if (isTitleValid && isDescriptionValid && isDueDateValid) {
      const project = {
        title: inputTitle.current.getValue(),
        description: inputDescription.current.getValue(),
        dueDate: inputDueDate.current.getValue(),
      };
      onSave(project);
    }
  }

  return (
    <>
      <Modal ref={modal} buttonCaption='Okay'>
        <h2 className='text-xl font-bold text-stone-600 my-4'>Title</h2>
        <p className='text-stone-400 mb-4'>Some text.</p>
        <p className='text-stone-400 mb-4'>Another text.</p>
      </Modal>
      <div className='w-[35rem] mt-16 px-4'>
        <h1 className='text-3xl font-bold text-stone-600 mb-2'>
          Add New Project
        </h1>
        <div>
          <Input label='Title' ref={inputTitle} type='text' required />
          <Input label='Description' textarea ref={inputDescription} required />
          <Input label='Due Date' ref={inputDueDate} type='date' required />
        </div>
        <menu className='flex items-center justify-end gap-4 my-4'>
          <li>
            <button
              className='text-stone-800 hover:text-stone-950'
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
      </div>
    </>
  );
}
