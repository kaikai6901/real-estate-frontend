import './ProjectModal.css'
import React, {useEffect, useState} from 'react'
import ProjectSummaryTab from './tabs/ProjectSummarTab';
import ProjectDetailTab from './tabs/ProjectDetailTab';

function ProjectModal (props) {
    const [activeTab, setActiveTab] = useState('Summary');
    const [project, setProject] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/modal/get_project_info?project_id=${props.project_id}`)
        .then(res => res.json())
        .then(data => setProject(data[0]))
    }, [])
    
    console.log(project)
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };
    let content;
    if (activeTab === 'Summary') {
        content = <ProjectSummaryTab project={project} />;
      } else if (activeTab === 'News') {
        content = <ProjectDetailTab project={project} />;
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={e => props.handleClose(null)}> X </button>

                {project && <div className="modal-title">
                    <h1> {project.name}</h1>
                </div>}
                <div className='project-header'>
                    <div className='flex project-nav-pane'>
                        <button className='project_button' onClick={() => handleTabClick('Summary')}>Tổng quan</button>
                        <button className='project_button' onClick={() => handleTabClick('News')}>Phân tích chi tiết</button>
                    </div>
                </div>
                {project && <div className='main-content'>
                    {content}
                </div>}
            </div>
        </div>
    );
}

export default ProjectModal
