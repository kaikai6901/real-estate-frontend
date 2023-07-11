import React, { useState, useEffect } from 'react';
import ReactMapGL  from '@goongmaps/goong-map-react';
import './Project.css';
import Item from '../news/Item';
const GOONG_MAPTILES_KEY = '0GjPXb6QcBApKDRqit0zOBwor2cFe12T07fJ2Asg';

function Project() {
    console.log('project')
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState('');
    const [inputContent, setInputContent] = useState('');
    const [tagContent, setTagContent] = useState('');
    const [news, setNews] = useState([])

    const [viewport, setViewport] = React.useState({
      longitude: 105.8549172,
      latitude: 21.0234631,
      zoom: 10
    });

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

    const handleChangeProject = (event) => {
      const selectedIndex = event.target.selectedIndex;
      const selectedValue = event.target.options[selectedIndex].value;

      console.log(selectedIndex, selectedValue)
      console.log(projects[selectedIndex - 1])
    }
    return (
      <div style={{display: 'flex'}}>
        <div style={{ flex: '75%'}}>
                    <ReactMapGL {...viewport} 
                    width="75vw" 
                    height="100vh" 
                    onViewportChange={setViewport} 
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                    // onClick={handleMapClick}
                    />
        </div>

        <div className='evaluate-pane'>
          <div className='select-pane' >
            <h3 className='project'>
              Chọn dự án
            </h3>
            <select className='project' value={selectedProject} onChange={handleChangeProject}>
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.project_id} value={project.project_id}>{project.name}</option>
                  ))}
            </select>
          </div>

          <div className='input-pane'>
            <h3 className='project'>
             Nhập diện tích
            </h3>
            <input 
              className='project'
              type="text"
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
              placeholder="Nhập vào diện tích"
            />
          </div>
          <div className='search-pane'>
            <button  className='project' onClick={handleSearch}>Search</button>
          </div>

            <h3 className='project'>
             Kết quả trả về
            </h3>
          <div className='predict-result'>{tagContent} / m2</div>

          <div className='list-news-container'>
                    <div className='scroll-pane'>
                        {news && 
                            news.map(item => 
                                (
                                    <div className='item-wrapper' >
                                        <Item item={item}/>
                                    </div>
                                )
                                
                                )
                        }
                    </div>
                    {/* {lngLat && <Result lngLat={lngLat} 
                    // width="25vw" 
                    // height="100vh" 
                    />}
                     */}
                </div>
        </div>
      </div>
    );
}

export default Project;