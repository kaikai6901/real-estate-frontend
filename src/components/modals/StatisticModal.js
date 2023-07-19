import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2'
const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e6, 2);
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e9, 2);
        return `${roundedPrice} tỷ`
    }
}

function StatisticModal (props) {
    const currentStatistic = props.currentStatistic
    const historyStatistic = props.historyStatistic

    const processToLineChart = () => {
        if (!historyStatistic) {
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
        const labels = historyStatistic.map((item) => item._id);
        const prices = historyStatistic.map((item) => item.averagePricePerM2);
        const counts = historyStatistic.map((item) => item.count);
        console.log(counts)
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
                    <h1> Thống kê </h1>
                </div>
                {currentStatistic && <div className='modal-summary'>
                    <div className='modal-total-price'>
                        <span className='modal title total-price-title'>
                            Khoảng giá bán
                        </span>
                        <div className='modal avg-total-price'>
                           Trung bình
                           <span >  {formatPrice(currentStatistic[0].averageTotalPrice)}</span>
                        </div>
                        <div className='modal range-total-price'>
                           Dao động từ
                           <span >   {formatPrice(currentStatistic[0].minTotalPrice)} - {formatPrice(currentStatistic[0].maxTotalPrice)}</span>
                        </div>
                    </div>

                    <div className='modal-price-per-m2'>
                        <span className='modal title total-price-per-m2-title'>
                            Đơn giá theo m2
                        </span>
                        <div className='modal avg-price-per-m2'>
                           Trung bình
                           <span >  {formatPrice(currentStatistic[0].averagePricePerM2)} / m2</span>
                        </div>
                        <div className='modal range-price-per-m2'>
                           Dao động từ
                           <span >  {formatPrice(currentStatistic[0].minPricePerM2)} - {formatPrice(currentStatistic[0].maxPricePerM2)} / m2</span>
                        </div>
                    </div>          
                </div>}
                <div className="modal-chart-area">
                    {historyStatistic ? (
                        <Line
                        data={processToLineChart()}
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

export default StatisticModal
