import NewProject from './components/NewProject';
import NoProjectSelected from './components/NoProjectSelected';
import Sidebar from './components/Sidebar';
import SelectedProject from './components/SelectedProject';
import { useProject } from './context/ProjectProvider';

function App() {
  const {
    projectState,
    handleAddProject,
    handleSaveProject,
    handleCancelProject,
    handleSelectProject,
    handleDeleteProject,
  } = useProject();

  let content;
  if (projectState.selectedProjectId === null) {
    content = (
      <NewProject onSave={handleSaveProject} onCancel={handleCancelProject} />
    );
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onAddProject={handleAddProject} />;
  } else if (projectState.selectedProjectId) {
    content = (
      <SelectedProject
        project={projectState.projects.find(
          (project) => project.id === projectState.selectedProjectId,
        )}
        onDeleteProject={handleDeleteProject}
      />
    );
  }

  return (
    <main className='h-screen flex gap-8 py-8'>
      <Sidebar
        onAddProject={handleAddProject}
        onSelectProject={handleSelectProject}
        projects={projectState.projects}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
