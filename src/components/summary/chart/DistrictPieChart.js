import React, { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import 'chart.js/auto';
import { Pie, getElementsAtEvent} from 'react-chartjs-2';
import './NewChart.css'
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)


function DistrictPieChart(props) {
    const [data, setData] = useState(null)

    const chartRef = useRef();

    const handleClick = (event) => {
        if(getElementsAtEvent(chartRef.current, event).length > 0) {
            const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index
            console.log(data.labels[dataPoint])
            props.modalHandle(data.labels[dataPoint])
        }
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/get_news_district`)
        .then(res => res.json())
        .then(districts => processChartData(districts))
        .then(data => setData(data))
    }, [])

    const processChartData = (districts) => {
        if (!districts) {
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
    

        const sortedData = districts.sort((a, b) => b.count - a.count);
        console.log(sortedData)

        const topDistricts = sortedData.slice(0, 9);

        console.log(topDistricts)

        const otherCount = sortedData.slice(9).reduce((acc, cur) => acc + cur.count, 0);
        console.log(otherCount)

        const labels = topDistricts.map(district => district._id);
        console.log(labels)

        labels.push('Another District');
        const counts = topDistricts.map(district => district.count);
        console.log(counts)
        counts.push(otherCount);

        return {
            labels,
            datasets: 
            [
                {
                    data: counts,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40',
                        '#C9CBCF',
                        '#888888',
                        '#79ccb3',
                        '#d6d727'
                    ],
                    weight: 1
                }
            ]
        };
    };

    const options = {
        // responsive: true,
        legend: {
            display: true,
        },
    };
    return (
        <div className='pie-district-chart new-chart'>
            <h3 className='pie-district-label label'>Số lượng bài viết</h3>
        {data ? (
            <Pie data={data} options={options} ref={chartRef} onClick={handleClick}/>
        ) : (
            <p>Loading chart...</p>
        )}
        </div>
    )
}

export default DistrictPieChart