

import React, { useState, useEffect } from 'react';

function Project() {
    console.log('project')
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [tagContent, setTagContent] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/project/get_projects`);
          const data = await response.json();
          setProjects(data);
        } catch (error) {
          console.error('Error fetching projects:', error);
        }
    };

    const handleSearch = async () => {
        // Validate data before sending the request
        if (selectedProject === '' || isNaN(inputContent)) {
          console.log('Please select a project and enter a valid number.');
          return;
        }
    
        try {
            const projectId = parseInt(selectedProject);
            const square = parseInt(inputContent);
            const response = await fetch('http://13.212.248.136:5001/predict', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin':  'http://127.0.0.1:3000',
              'Access-Control-Allow-Methods': 'POST',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
            body: JSON.stringify({
              project_id: projectId,
              square: square
            })
          });
          console.log(response)
          console.log(response.body)
          const data = await response.json();
          console.log(data)
          setTagContent(data['predictions']);
        } catch (error) {
          console.error('Error searching:', error);
        }
    };

    return (
        <div>
            {console.log('project')}
          <select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}>
            <option value="">Select a project</option>
            {projects.map(project => (
              <option key={project.project_id} value={project.project_id}>{project.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
            placeholder="Nhập vào diện tích"
          />
          <button onClick={handleSearch}>Search</button>
          <div>{tagContent}</div>
        </div>
    );
}

export default Project;