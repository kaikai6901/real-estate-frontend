import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function DistrictBarChart() {

    const [chartData, setChartData] = useState(null)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/price_by_district`)
        .then(res => res.json())
        .then(district => {
            setChartData(district)
        })
    }, [])

    const processChartData = () => {
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

        const sortedData = chartData.sort((a, b) => b.average_price_per_m2 - a.average_price_per_m2);
        
        const top10Districts = sortedData.slice(0, 10);

        const districtNames = top10Districts.map((district) => district._id);
        const averagePrices = top10Districts.map(
          (district) => district.average_price_per_m2
        );
        
        const data = {
            labels: districtNames,
            datasets: [
                {
                    label: 'Average Price per m2',
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
        <div className='bar-district-chart'>
            {
                chartData ? (
                    <Bar data={processChartData()} options={options} />
                ) : (
                <p>Loading chart...</p>
            )}
        </div>
    )
};

export default DistrictBarChart;