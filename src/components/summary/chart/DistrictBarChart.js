import React, { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js'
import 'chart.js/auto';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)
function DistrictBarChart(props) {

    const [chartData, setChartData] = useState(null)

    const chartRef = useRef();
    const handleClick = (event) => {
        if(getElementsAtEvent(chartRef.current, event).length > 0) {
            const datasetIndexNum = getElementsAtEvent(chartRef.current, event)[0].datasetIndex
            const dataPoint = getElementsAtEvent(chartRef.current, event)[0].index
            console.log(chartData.labels[dataPoint])
            props.modalHandle(chartData.labels[dataPoint])
        }
    }
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/price_by_district`)
        .then(res => res.json())
        .then(districts => processChartData(districts))
        .then(data => setChartData(data))
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

        const sortedData = districts.sort((a, b) => b.average_price_per_m2 - a.average_price_per_m2);
        
        const top10Districts = sortedData.slice(0, 10);

        const topFilteredDistricts = top10Districts.filter(item => item.count > 50)
        const districtNames = topFilteredDistricts.map((district) => district._id);
        const averagePrices = topFilteredDistricts.map(
          (district) => district.average_price_per_m2
        );
        
        const data = {
            labels: districtNames,
            datasets: [
                {
                    label: 'Giá trung bình / m2',
                    data: averagePrices,
                    backgroundColor: 'rgba(75,192,192,0.6)',
                },
            ],
        };

        return data
        
    }

    const options = {
        legend: {
            display: true,
            position: 'bottom',
        },
    };

    return (
        <div className='bar-district-chart new-chart'>
             <h3 className='bar-district-label label'>Giá trung bình</h3>
            {
                chartData ? (
                    <Bar data={chartData} options={options} ref={chartRef} onClick={handleClick}/>
                ) : (
                <p>Loading chart...</p>
            )}
        </div>
    )
};

export default DistrictBarChart;