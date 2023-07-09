import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { ArcElement } from "chart.js";
import { Pie } from 'react-chartjs-2';
import './NewChart.css'
function DistrictPieChart() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://127.0.0.1:5555/summary/get_news_district')
        .then(res => res.json())
        .then(district => {
            console.log(district)
            setData(district)
        })
    }, [])

    const processChartData = () => {
        console.log(data)
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
    

        const sortedData = data.sort((a, b) => b.count - a.count);
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
                    ]
                }
            ]
        };
    };

    const options = {
        legend: {
            display: true,
            position: 'bottom',
        },
    };

    return (
        <div className='pie-district-chart'>
        {data ? (
            <Pie data={processChartData()} options={options} />
        ) : (
            <p>Loading chart...</p>
        )}
        </div>
    )
}

export default DistrictPieChart