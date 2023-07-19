import React, {useEffect, useState} from 'react'
import '../ProjectModal.css'
import Item from '../../news/Item';
const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e6, 2);
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e9, 2);
        return `${roundedPrice} tỷ`
    }
}

function ProjectSummaryTab (props) {
    const [news, setNews] = useState(null)

    const project = props.project

    const fetchNews = async (project_id) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/project/${project_id}/get_news`);
          const data = await response.json();
          setNews(data);
  
        } catch (error) {
          console.error('Error fetching projects:', error)
        }
    }

    useEffect(() => {
        fetchNews(project.project_id)
    }, [])
    return (
        <div className='flex project-summary-container'>
            <div className='modal-summary'>
                <div className='flex-50 modal-total-price'>
                    <span className='modal title total-price-title'>
                        Khoảng giá bán
                    </span>
                    <div className='modal avg-total-price'>
                        Trung bình
                        <span >  {formatPrice(project.avg_total_price)}</span>
                    </div>
                    <div className='modal range-total-price'>
                        Dao động từ
                        <span >  {formatPrice(project.min_total_price)} - {formatPrice(project.max_total_price)}</span>
                    </div>
                </div>

                <div className='flex-50 modal-price-per-m2'>
                    <span className='modal title avg-price-per-m2'>
                            Đơn giá theo m2
                    </span>
                    <div className='modal avg-price-per-m2'>
                        Trung bình
                        <span >  {formatPrice(project.avg_price_per_m2)}</span>
                    </div>
                    <div className='modal range-total-price'>
                        Dao động từ
                        <span >  {formatPrice(project.min_price_per_m2)} - {formatPrice(project.max_price_per_m2)}</span>
                    </div>
                </div>
               
            </div>
            <div className='modal-summary'>   
                <div className='flex-50 modal-square'>
                    <span className='modal title square-title'>
                        Diện tích
                    </span>
                    <div className='modal range-square'>
                        Dao động từ
                        <span >  {project.min_square} - {project.max_square}</span>
                    </div>
                </div>

                <div className='flex-50 modal-number-news'>
                    <span className='modal title number-news-title'>
                        Số lượng bài viết
                    </span>
                    <div className='modal number-news'>
                        <span >
                            {project.n_news}
                            <i> bài đăng (trong 1 tháng)</i>
                        </span>
                    </div>
                </div>
            </div>
            <div className='list-news-pane'>
                <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '210px'}}>
                    {news && 
                            news.map(item => 
                                (
                                    <div className='item-wrapper' style={{ display: 'inline-block', width: '400px', border: '1px solid gray', borderRadius: '5px'}} >
                                        <Item item={item} />
                                    </div>
                                )
                                
                                )
                        }

                </div>
            </div>
        </div>
    )
}

export default ProjectSummaryTab