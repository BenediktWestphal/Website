import React from 'react';
import ProjectList from '../components/ProjectList'; // Will be created later

function ProjectsPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ProjectsPage</h1>
      <ProjectList />
    </div>
  );
}

export default ProjectsPage;
