import React, { useEffect, useState } from 'react';

const formatPrice = (price) => {
    const roundedPrice = Math.round(price / 1000000); // Round to nearest million
    return `${roundedPrice} triệu`;
  };
  
  const formatSquare = (square) => {
    const roundedSquare = Math.round(square);
    return `${roundedSquare} m2`;
  };

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/get_list_project`)
        .then(res => res.json())
        .then(projects => {
            setProjects(projects)
        })
    }, [])

    const formatListProject = () => {
        const formattedProjects = projects.map((project) => ({
            ...project,
            avg_price: formatPrice(project.avg_price),
            avg_square: formatSquare(project.avg_square),
          }));
          return formattedProjects
    }

    return (
        <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
          {formatListProject().map((project) => (
            <div key={project.project_id} style={{ display: 'inline-block', margin: '10px', width: '200px', border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
              <h3>{project.name}</h3>
              <p>Giá trung bình: {project.avg_price}</p>
              <p>Diện tích trung bình: {project.avg_square}</p>
              <p>Số lượng bài: {project.n_news}</p>
            </div>
          ))}
        </div>
      );
}

export default ProjectList