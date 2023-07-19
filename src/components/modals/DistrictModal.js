import './DistrctModal.css'
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e6, 2);
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e9, 2);
        return `${roundedPrice} tỷ`
    }
}
function DistrictModal (props) {
    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/modal/get_summary_district?district=${props.district}`)
        .then(res => res.json())
        .then(data => setChartData(data))
    }, [])

    const processToChartData = () => {
        if (!chartData) {
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
        const labels = chartData.history.map((item) => item._id);
        const prices = chartData.history.map((item) => item.averagePricePerM2);
        const counts = chartData.history.map((item) => item.count);
        
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

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <button onClick={e => props.handleClose(null)}> X </button>

                <div className="modal-title">
                    <h1> {props.district}</h1>
                </div>
                {chartData && <div className='modal-summary'>
                    <div className='modal-total-price'>
                        <span className='modal title total-price-title'>
                            Khoảng giá bán
                        </span>
                        <div className='modal avg-total-price'>
                           Trung bình
                           <span >  {formatPrice(chartData.summary[0].averageTotalPrice)}</span>
                        </div>
                        <div className='modal range-total-price'>
                           Dao động từ
                           <span >   {formatPrice(chartData.summary[0].minTotalPrice)} - {formatPrice(chartData.summary[0].maxTotalPrice)}</span>
                        </div>
                    </div>

                    <div className='modal-price-per-m2'>
                        <span className='modal title total-price-per-m2-title'>
                            Đơn giá theo m2
                        </span>
                        <div className='modal avg-price-per-m2'>
                           Trung bình
                           <span >  {formatPrice(chartData.summary[0].averagePricePerM2)} / m2</span>
                        </div>
                        <div className='modal range-price-per-m2'>
                           Dao động từ
                           <span >  {formatPrice(chartData.summary[0].minPricePerM2)} - {formatPrice(chartData.summary[0].maxPricePerM2)} / m2</span>
                        </div>
                    </div>          
                </div>}
                <div className="modal-chart-area">
                    {chartData ? (
                        <Line
                        data={processToChartData()}
                        options={{
                            scales: {
                            yAxes: [
                                {
                                id: 'y-axis-price',
                                type: 'linear',
                                position: 'left',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Average Price per m2'
                                }
                                },
                                {
                                id: 'y-axis-count',
                                type: 'linear',
                                position: 'right',
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Document Count'
                                }
                                }
                            ]
                            }
                        }}
                        />
                    ) : (
                        <div>Loading chart data...</div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DistrictModal