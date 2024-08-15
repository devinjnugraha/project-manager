import { createContext, useContext, useState } from 'react';

const ProjectContext = createContext({
  projectState: undefined,
  handleAddProject: undefined,
  handleSaveProject: undefined,
  handleCancelProject: undefined,
  handleSelectProject: undefined,
  handleDeleteProject: undefined,
  handleAddTask: undefined,
  handleDeleteTask: undefined,
});

export const useProject = () => {
  const context = useContext(ProjectContext);

  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }

  return context;
};

export default function ProjectProvider({ children }) {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
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
      const newProject = {
        ...project,
        id: projectId,
      };
      return {
        ...projectState,
        selectedProjectId: projectId,
        projects: [...projectState.projects, newProject],
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

  function handleSelectProject(projectId) {
    setProjectState((projectState) => {
      return {
        ...projectState,
        selectedProjectId: projectId,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((projectState) => {
      return {
        ...projectState,
        selectedProjectId: undefined,
        projects: projectState.projects.filter(
          (project) => project.id !== projectState.selectedProjectId,
        ),
      };
    });
  }

  function handleAddTask(newTask) {
    setProjectState((projectState) => {
      const task = {
        id: Math.random(),
        text: newTask,
        projectId: projectState.selectedProjectId,
      };
      return {
        ...projectState,
        tasks: [...projectState.tasks, task],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectState((projectState) => {
      return {
        ...projectState,
        tasks: [...projectState.tasks.filter((task) => task.id !== taskId)],
      };
    });
  }

  return (
    <ProjectContext.Provider
      value={{
        projectState,
        handleAddProject,
        handleSaveProject,
        handleCancelProject,
        handleSelectProject,
        handleDeleteProject,
        handleAddTask,
        handleDeleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}
