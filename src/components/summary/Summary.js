
import PriceBoard from './boards/PriceBoard';
import DistrictPieChart from './chart/DistrictPieChart';
import DistrictBarChart from './chart/DistrictBarChart';
import ProjectList from './pane/ProjectList';
import NewsList from './pane/NewsList'
import PriceHistChart from './chart/PriceHistChart';
import DistrictModal from '../modals/DistrictModal';
import ProjectModal from '../modals/ProjectModal';
import './Summary.css'
import { useState } from 'react';
function Summary() {
    const [openDistrictModal, setOpenDistrictModal] = useState(null)
    const [openProjectModal, setOpenProjectModal] = useState(null)
    
    return (
        
        <div className='summary-container'>
            {openDistrictModal && <DistrictModal district={openDistrictModal} handleClose={setOpenDistrictModal} />}
            {openProjectModal && <ProjectModal project_id={openProjectModal} handleClose={setOpenProjectModal} />}
            <div className='statistic-pane'>
                <div className='statistic-label label'>
                    <h2 className='text'>Thống kê chung</h2>
                </div>

                <div className='price-pane infor-pane'>
                    <div className='chart-area'>
                        <div className='price-board price first-chart'>
                            <PriceBoard />
                        </div>
                        <div className='price-chart price second-chart'>
                            <PriceHistChart />
                        </div>
                    </div>
                </div>

                <div className='summary-district-label label'>
                    <h2 className='text'>Thống kê theo từng quận</h2>
                </div>
          
                <div className='district-pane infor-pane'>
                    <div className='chart-area'>
                        <div className='pie-chart first-chart'>
                            <DistrictPieChart modalHandle={setOpenDistrictModal} />
                        </div>
                        <div className='bar-chart second-chart'>
                            <DistrictBarChart modalHandle={setOpenDistrictModal}/>
                        </div>
                    </div>
                </div>

            </div>
            <div className='list-project-pane '>
                <div className='list-project-label label'>
                    <h2 className='text'>
                        Những dự án có nhiều bài đăng
                    </h2>
                </div>
                <ProjectList modalHandle={setOpenProjectModal}/>
            </div>

            <div className='list-news-pane'>
                <div className='list-news-label label'>
                    <h2 className='text'>
                        Những bài viết đáng chú ý
                    </h2>
                </div>
                <NewsList />
            </div>
        </div>
    )

}

export default Summary;