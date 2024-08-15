import { useProject } from '../context/ProjectProvider';
import NewTask from './NewTask';

export default function Tasks() {
  const { projectState, handleDeleteTask } = useProject();

  const filteredTasks = projectState.tasks.filter(
    (task) => task.projectId === projectState.selectedProjectId,
  );

  return (
    <section className='pb-8'>
      <h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
      <NewTask />
      {filteredTasks.length > 0 ? (
        <ul className='my-4'>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className='flex justify-between px-2 py-2 rounded-md hover:border-b-2 hover:text-lg'
            >
              <span>{task.text}</span>
              <button
                className='font-bold px-4 rounded-md hover:bg-red-100'
                onClick={() => handleDeleteTask(task.id)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-stone-800 my-4'>
          There is currently no tasks for this project.
        </p>
      )}
    </section>
  );
}
