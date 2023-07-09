
import PriceBoard from './boards/PriceBoard';
import DistrictPieChart from './chart/DistrictPieChart';
import DistrictBarChart from './chart/DistrictBarChart';
import ProjectList from './pane/ProjectList';
import NewsList from './pane/NewsList'
import PriceHistChart from './chart/PriceHistChart';

import './Summary.css'
function Summary() {

    return (
        <div className='summary-container'>

            <div className='statistic-pane'>
                <div className='statistic-label label'>
                    <h2 className='text'>Thống kê chung</h2>
                </div>

                <div className='price-pane'>
                    <div className='price-board price'>
                        <PriceBoard />
                    </div>
                    <div className='price-chart price'>
                        <PriceHistChart />
                    </div>
                </div>
          
    
                <div className='summary-district-label label'>
                    <h2 className='text'>Thống kê theo từng quận</h2>
                </div>

                    <div className='pie-chart'>
                        <DistrictPieChart />
                    </div>
                    <div className='bar-chart'>
                        <DistrictBarChart />
                    </div>
            </div>

            <div className='list-project-pane '>
                <div className='list-project-label label'>
                    <h2 className='text'>
                        Những dự án có nhiều bài đăng
                    </h2>
                </div>
                <ProjectList />
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