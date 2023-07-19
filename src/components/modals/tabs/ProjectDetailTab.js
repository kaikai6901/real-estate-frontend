import React, { useEffect, useState } from 'react';

import { Line, Bar } from 'react-chartjs-2';

const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e6, 2);
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e9, 2);
        return `${roundedPrice} tỷ`
    }
}

function ProjectDetailTab (props) {
    const [data, setData] = useState(null)
    const project = props.project

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/modal/get_detail_project?project_id=${project.project_id}`)
        .then(res => res.json())
        .then(data => setData(data))
        console.log(data)
    }, [])

    const processToLineChartData = () => {
        if (!data) {
            return {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                    }
                ]
            };
        }

        const labels = data.history.map((item) => item._id);
        const prices = data.history.map((item) => item.averagePricePerM2);
        const counts = data.history.map((item) => item.count);
        
        return  {
            labels: labels,
            datasets: [
              {
                label: 'Giá trung bình / m2',
                data: prices,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-price'
              },
              {
                label: 'Số lượng bài viết',
                data: counts,
                backgroundColor: 'rgba(192, 75, 192, 0.2)',
                borderColor: 'rgba(192, 75, 192, 1)',
                borderWidth: 1,
                yAxisID: 'y-axis-count'
              }
            ]
        }; 
    }

    const processToBarChartData = () => {
        if (!data) {
            return {
                labels: [],
                datasets: [
                    {
                        data: [],
                        backgroundColor: [],
                    }
                ]
            };
        }

        const bins = data.distribute.filter(obj => obj.range.length > 0);
        const labels = bins.map((bin, index) => {
            if (index % 3 === 0) {
                return `${bin.range[0]}`
            } else {
                return '';
            }
        })

        const barChartData = {
            labels: labels,
            datasets: [
            {
                label: 'Số lượng bài viết',
                data: bins.map((bin) => bin.count),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                // indexAxis: 'triệu / m2'
            },
            ],
        };
        return barChartData
    }

    const lineChartOption = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Thang'
                }
            }
        }
    }
    const barChartOption = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Đơn giá theo m2 (triệu / m2)'
                }
            }
        }
    }
    return (
        <div className='project-detail-container' style={{ display: 'flex', orientation: 'landscape', flexDirection : 'column'}}>

            <div className='distributed-chart'>
                <span className='chart-title'>Phân bố giá</span>
                <Bar data={processToBarChartData()} options={barChartOption}/>
            </div>
            <div className='history-chart'>
                <span className='chart-title'>Dữ liệu lich sử</span>
                <Line data={processToLineChartData()} options={lineChartOption}/>
            </div>
            <span className='title'>Thống kê xung quanh 1km</span>
            {data && <div className='flex arount-property'>
                <div className='around-summary'>
                    <div className='flex-50 modal-total-price'>
                        <span className='modal title total-price-title'>
                            Khoảng giá bán
                        </span>
                        <div className='modal avg-total-price'>
                            Trung bình
                            <span >  {formatPrice(data.around_property[0].averageTotalPrice)}</span>
                        </div>
                        <div className='modal range-total-price'>
                            Dao động từ
                            <span >  {formatPrice(data.around_property[0].minTotalPrice)} - {formatPrice(data.around_property[0].maxTotalPrice)}</span>
                        </div>
                    </div>

                    <div className='flex-50 modal-price-per-m2'>
                        <span className='modal title avg-price-per-m2'>
                                Đơn giá theo m2
                        </span>
                        <div className='modal avg-price-per-m2'>
                            Trung bình
                            <span >  {formatPrice(data.around_property[0].averagePricePerM2)}</span>
                        </div>
                        <div className='modal range-total-price'>
                            Dao động từ
                            <span >  {formatPrice(data.around_property[0].minPricePerM2)} - {formatPrice(data.around_property[0].maxPricePerM2)}</span>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )

}

export default ProjectDetailTab