import Button from './Button';

export default function Sidebar({
  onAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className='w-1/3 bg-stone-900 px-8 py-16 text-stone-50 md:w-72 rounded-r-xl flex flex-col'>
      <h2 className='mb-4 font-bold uppercase md:text-xl text-stone-200'>
        Your Projects
      </h2>
      <div className='flex-grow flex flex-col'>
        <ul className='overflow-y-auto flex-grow'>
          {projects.map((project) => {
            let style =
              'w-full text-left px-2 py-2 my-1 rounded-md hover:text-stone-200 hover:bg-stone-800';

            if (project.id === selectedProjectId) {
              style += ' text-stone-200 bg-stone-800';
            } else {
              style += ' text-stone-400';
            }
            return (
              <li key={project.id}>
                <button
                  onClick={() => onSelectProject(project.id)}
                  className={style}
                >
                  {project.title}
                </button>
              </li>
            );
          })}
        </ul>
        <div className='mt-4'>
          <Button onClick={onAddProject} className='w-full'>
            + Add Project
          </Button>
        </div>
      </div>
    </aside>
  );
}
