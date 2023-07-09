import React, { useEffect, useState } from 'react';
import './Board.css'
const formatPrice = (price) => {
    const roundedPrice = Math.round(price / 1000000); // Round to nearest million
    return `${roundedPrice} triệu/m2`;
  }
function PriceBoard(){
    const [price, setPrice] = useState({});

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try{
    //             const response = await fetch('http://127.0.0.1:5555/summary/price_of_month');
    //             const jsonData = await response.json()
    //             setPrice(jsonData)
    //         } catch(error) {
    //             console.error(error)
    //         }
    //     }
        
    //     fetchData();
    // }, [price]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/price_of_month`)
        .then(res => res.json())
        .then(price => {
            setPrice(price)
        })
    }, [])

    return (
        <div className='current-price'>
            <h2 className='avg-price-label'>Giá trung bình (1 tháng) </h2>
            <p className='avg-price'>{formatPrice(price.current)}</p>
        </div>
    )
};

export default PriceBoard
