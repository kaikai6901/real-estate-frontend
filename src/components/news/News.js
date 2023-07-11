
import Result from './Result';
import React, { useState } from 'react';
import ReactMapGL  from '@goongmaps/goong-map-react';
import Item from './Item';
import './News.css'
const GOONG_MAPTILES_KEY = '0GjPXb6QcBApKDRqit0zOBwor2cFe12T07fJ2Asg';

const radiusRange = {
    '2 km': 2e3,
    '3 km': 3e3,
    '5 km': 5e3,
    '10 km': 10e3
}

const priceRange = {
    'Nhỏ hơn 500 triệu': ',500000000',
    'Từ 500 triệu đến 1 tỷ': '500000000,1000000000',
    'Từ 1 tỷ đến 1 tỷ 500 triệu': '1000000000,1500000000',
    'Từ 1 tỷ 500 triệu đến 2 tỷ': '1500000000,2000000000',
    'Trên 2 tỷ': '2000000000,'
}

const squareRange = {
    'Nhỏ hơn 50 m2': ',50',
    'Từ 50 đến 75 m2': '50,75',
    'Từ 75 đến 100 m2': '75,100',
    'Từ 100 đến 150 m2': '100,150',
    'Trên 150 m2': '150,'
}

const objectiveList = {
    'Sắp xếp theo giá từ thấp đến cao': 'total_price,1',
    'Sắp xếp theo giá từ cao đến thấp': 'total_price,-1',
    'Sắp xếp theo khoảng cách từ gần đến xa': 'distance,1',
    'Sắp xếp theo khoảng cách từ xa đến gần': 'distance,-1',
    'Sắp xếp theo diện tích từ bé đến lớn': 'square,1',
    'Sắp xếp theo diện tích từ lớn đến bé': 'square,-1'
}

function News() {

    const [radius, setRadius] = useState('')
    const [price, setPrice] = useState('')
    const [square, setSquare] = useState('')
    const [objective, setObjective] = useState('')
    const [news, setNews] = useState([])
    const [savedNews, setSavedNews] = useState([])


    const handleSave = (item) => {
        setNews((prevList) => prevList.filter((i) => i !== item));
        setSavedNews((prevList) => [...prevList, item]);
    }

    const handleUnSave = (item) => {
        setSavedNews((prevList) => prevList.filter((i) => i !== item));
        setNews((prevList) => [...prevList, item]);
    }

    const [viewport, setViewport] = React.useState({
        longitude: 105.8549172,
        latitude: 21.0234631,
        zoom: 13
      });

    // const [lngLat, setLngLat] = React.useState([105.8549172, 21.0234631])

    const fetchNews = async (longitude, latitude) => {
        try {
            const params = new URLSearchParams({longitude, latitude})
            
            if (radius !== '') {
                params.append('radius', radius)
            } else {
                params.append('radis', 1000)
            }

            if (square !== '') {
                var bound_square = square.split(',')
                if (bound_square[0] !== '')
                    params.append('min_square', bound_square[0])
                if (bound_square[1] !== '')
                    params.append('max_square', bound_square[1])
            }
            
            if (price !== '') {
                var bound_price = price.split(',')
                if (bound_price[0] !== '')
                    params.append('min_price', bound_price[0])
                if (bound_price[1] !== '')
                    params.append('max_price', bound_price[1])
            }

            if (objective !== '') {
                var [objective_key, order] = objective.split(',')
                params.append(objective_key, order)

            }
            console.log(params.toString())
            const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/news/get_news?` + params );
            const data = await response.json()
            console.log(data)
            setNews(data);
        } catch (error) {
            console.error('Error : ', error);
        }
    };

    const handleMapClick = (event) => {
        const {lngLat} = event;
        console.log('Clicked at:', lngLat);
        fetchNews(lngLat[0], lngLat[1])
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
                <select value={objective} style={{height: '100%', width: '100%'}} onChange={e => setObjective(e.target.value)} >
                        <option value=''>
                            Mặc định
                        </option>
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

                <div className='result-container' style={{ flex: '25%' }}>
                    <div className='scroll-pane'>
                        {news && 
                            news.map(item => 
                                (
                                    <div className='item-wrapper' >
                                        <Item item={item} is_draggable='true' is_save='true' label_button='Lưu' onSave={handleSave}/>
                                    </div>
                                )
                                
                                )
                        }
                    </div>
                    {/* {lngLat && <Result lngLat={lngLat} 
                    // width="25vw" 
                    // height="100vh" 
                    />}
                     */}
                </div>
            </div>

            <div className='bottom-pane'>
                <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap', height: '200px'}}>
                    {/* {lngLat && <Result lngLat={lngLat} */}
                    {/* />} */}
                    {savedNews && 
                            savedNews.map(item => 
                                (
                                    <div className='item-wrapper' >
                                        <Item item={item} is_draggable='true' is_save='true' label_button='Hủy lưu' onSave={handleUnSave} />
                                    </div>
                                )
                                
                                )
                        }

                </div>
            </div>
       

        </div>
      );
}

export default News;