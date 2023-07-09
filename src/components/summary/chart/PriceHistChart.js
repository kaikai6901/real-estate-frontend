import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './NewChart.css'



const PriceHistChart = () => {
    const [bins, setBins] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/get_list_prices`)
        .then(res => res.json())
        .then(bins => {
            setBins(bins)
        })
    }, []);

    // const labels = bins.map((bin) => `${bin.range[0].toFixed(2)} - ${bin.range[1].toFixed(2)}`);
    const labels = bins.map((bin, index) => {
        if (index % 3 === 0) {
            return `${bin.range[0]}`
        } else {
            return '';
        }
    })
    const data = {
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
    console.log(data)

    return (
        <div className='bar-price-chart new-chart'>
             <h3 className='hist-price-label label'>Phân bố giá </h3>
        {
            data ? (
                <Bar data={data} height={100} />
            ) : (
            <p>Loading chart...</p>
        )}
    </div>
    )
}

export default PriceHistChart