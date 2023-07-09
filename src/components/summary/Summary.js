
import PriceBoard from './boards/PriceBoard';
import DistrictPieChart from './chart/DistrictPieChart';
import DistrictBarChart from './chart/DistrictBarChart';
import ProjectList from './pane/ProjectList';
import NewsList from './pane/NewsList'
function Summary() {

    return (
        <div className='summary-container'>
            <h2>Thống kê chung</h2>
            <div className='price-board'>
                <PriceBoard />
            </div>
            <h2>Thống kê theo từng quận</h2>
            <h3>Số lượng bài</h3>
            <div className='pie-chart'>
                <DistrictPieChart />
            </div>
            <h3>Giá trung bình</h3>
            <div className='bar-chart'>
                <DistrictBarChart />
            </div>

            <div className='list-project-pane'>
                <h2>
                    Những dự án có nhiều bài đăng
                </h2>
                <ProjectList />
            </div>

            <div className='list-news-pane'>
                <h2>
                    Những bài viết đáng chú ý
                </h2>
                <NewsList />
            </div>
        </div>
    )

}

export default Summary;