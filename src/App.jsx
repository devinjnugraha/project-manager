import { useState } from 'react';
import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import Sidebar from './components/Sidebar';

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
  });

  function handleAddProject() {
    setProjectState((projectState) => {
      return {
        ...projectState,
        selectedProjectId: null,
      };
    });
  }

  function handleSaveProject(project) {
    setProjectState((projectState) => {
      const projectId = Math.random();
      return {
        selectedProjectId: undefined,
        projects: [...projectState.projects, { ...project, id: projectId }],
      };
    });
  }

  function handleCancelProject() {
    setProjectState((projectState) => {
      return {
        ...projectState,
        selectedProjectId: undefined,
      };
    });
  }

  let content;
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onSave={handleSaveProject} onCancel={handleCancelProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  }

  return (
    <main className='h-screen my-8 flex gap-8 '>
      <Sidebar
        onAddProject={handleAddProject}
        projects={projectState.projects}
      />
      {content}
    </main>
  );
}

export default App;
