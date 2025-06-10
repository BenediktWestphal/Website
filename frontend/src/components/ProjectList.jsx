import React, { useState, useEffect } from 'react';

// Get the API base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError(err.message);
        // Fallback to mock data if API fails for now
        setProjects([
          { id: 101, name: 'Mock Project A (API Error)', description: 'This is a mock project because the API call failed.' },
          { id: 102, name: 'Mock Project B (API Error)', description: 'Ensure the backend server is running and accessible.' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading projects...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error fetching projects: {error}</p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Displaying mock projects instead:</p>
        {projects.map(project => (
          <div key={project.id} className="mt-2 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <h3 className="text-xl font-semibold text-yellow-800">{project.name}</h3>
            <p className="text-sm text-yellow-700">{project.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return <p className="text-center text-gray-500">No projects found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(project => (
        <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{project.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProjectList;
