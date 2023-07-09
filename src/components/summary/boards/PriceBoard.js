import React, { useEffect, useState } from 'react';

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
        fetch('http://127.0.0.1:5555/summary/price_of_month')
        .then(res => res.json())
        .then(price => {
            setPrice(price)
        })
    }, [])

    return (
        <div className='current-price'>
            <h2>Gía Trung Bình</h2>
            <p>{price.current}</p>
        </div>
    )
};

export default PriceBoard
