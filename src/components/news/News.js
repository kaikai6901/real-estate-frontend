
import Result from './Result';
import React, { useState } from 'react';
import ReactMapGL  from '@goongmaps/goong-map-react';
import './News.css'
const GOONG_MAPTILES_KEY = '0GjPXb6QcBApKDRqit0zOBwor2cFe12T07fJ2Asg';

const radiusRange = {
    '1 km': 1,
    '3 km': 3,
    '5 km': 5
}

const priceRange = {
    'Nhỏ hơn 500 triệu': [0, 5e8],
    'Từ 500 triệu đến 1 tỷ': [5e8, 1e9],
    'Từ 1 tỷ đến 1 tỷ 500 triệu': [1e9, 15e8],
    'Từ 1 tỷ 500 triệu đến 2 tỷ': [15e8, 2e9],
    'Trên 2 tỷ': [2e9, 1e11]
}

const squareRange = {
    'Nhỏ hơn 50 m2': [0, 50],
    'Từ 50 đến 75 m2': [50, 75],
    'Từ 75 đến 100 m2': [75, 100],
    'Từ 100 đến 150 m2': [100, 150],
    'Trên 150 m2': [150, 1e6]
}

const objectiveList = {
    'Sắp xếp theo giá từ cao đến thấp': {total_price: -1},
    'Sắp xếp theo giá từ thấp đến cao': {total_price: 1},
    'Sắp xếp theo khoảng cách từ gần đến xa': {distance: 1},
    'Sắp xếp theo khoảng cách từ xa đến gần': {distance: -1},
    'Sắp xếp theo diện tích từ bé đến lớn': {square: 1},
    'Sắp xếp theo diện tích từ lớn đến bé': {square: -1},
}
function News() {
    var selectedRadius = 3;
    var selectedPrice = [];
    var selectedSquare = [];

    const [radius, setRadius] = useState('')
    const [price, setPrice] = useState([])
    const [square, setSquare] = useState([])
    const [ojective, setOjective] = useState({})

    const [viewport, setViewport] = React.useState({
        longitude: 105.8549172,
        latitude: 21.0234631,
        zoom: 10
      });

    const [lngLat, setLngLat] = React.useState([105.8549172, 21.0234631])

    const handleMapClick = (event) => {
        const { lngLat } = event;
        console.log('Clicked at:', lngLat);
        setLngLat(lngLat)
    };

    return (
        <div style={{display: 'flex', flexDirection:'column'}}>
            <div style={{display: 'flex'}} className='top-pane'>
                <div className='select-pane' style={{flex: '75%', display:'flex'}}>
                    <select value={radius} onChange={e => setRadius(e.target.value)} >
                        <option value=''>
                            Bán kính
                        </option>
                        {
                            Object.entries(radiusRange).map(
                                ([key, value]) => (
                                    <option key={value} value={value}>{key}</option>
                                )
                            )
                        }
                    </select>
                    <select value={price} onChange={e => setPrice(e.target.value)} >
                        <option value=''>
                            Giá
                        </option>
                        {
                            Object.entries(priceRange).map(
                                ([key, value]) => (
                                    <option key={value} value={value}>{key}</option>
                                )
                            )
                        }
                    </select>
                    <select value={square} onChange={e => setSquare(e.target.value)} >
                        <option value=''>
                            Diện tích
                        </option>
                        {
                            Object.entries(squareRange).map(
                                ([key, value]) => (
                                    <option key={value} value={value}>{key}</option>
                                )
                            )
                        }
                    </select>
                    {/* <button>Tìm kiếm</button> */}
                </div>
                <div className='infor-pane' style={{flex: '25%'}}>
                <select value={ojective} style={{height: '100%', width: '100%'}} onChange={e => setOjective(e.target.value)} >
                        {
                            Object.entries(objectiveList).map(
                                ([key, value]) => (
                                    <option key={value} value={value}>{key}</option>
                                )
                            )
                        }
                    </select>
                </div>
            </div>
            <div style={{display: 'flex'}} className='mid-pane'>
                <div style={{ flex: '75%'}}>
                    <ReactMapGL {...viewport} 
                    width="75vw" 
                    height="100vh" 
                    onViewportChange={setViewport} 
                    goongApiAccessToken={GOONG_MAPTILES_KEY}
                    onClick={handleMapClick}
                    />
                </div>

                <div style={{ flex: '25%' }}>
                    {lngLat && <Result lngLat={lngLat} 
                    // width="25vw" 
                    // height="100vh" 
                    />}
                    
                </div>
            </div>

            <div className='bottom-pane'>
                <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap'}}>
                    {lngLat && <Result lngLat={lngLat}
                    />}
                    
                </div>
            </div>
       

        </div>
      );
}

export default News;