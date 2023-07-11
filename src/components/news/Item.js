import React, { useEffect, useState } from 'react';
import './Item.css'

const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e6, 2);
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e7) / 100;
        return `${roundedPrice} tỷ`
    }
}

const getPlacce = (news) => {
    
}
function Item(props) {
    const hanleButtonClick = () => {
        props.onSave(props.item)
    }
    var news = props.item
    console.log(props)
    return (
        <div className='item clearfix' data-item-id={news.news_id} {...props}>
            {console.log({...props})}

            <div title={news.title}>
                <div className='item meta meta-infor'>
                <a href={news.news_url} className='item title'>
                    {news.title}
                </a>
                {props.is_save && (
                    <button className='item' onClick={hanleButtonClick}>
                        {props.label_button}
                    </button>
                )}
                </div>
                <div className='item meta meta-infor'>
                    <span className='total-price'>
                        {formatPrice(news.total_price)}
                    </span>
                  
                    <span className='square'>
                        {news.square}
                        <i> m2</i>
                    </span>
                </div>

                <div className='item meta meta-info'>
                    <span className='price-per-m2'>
                        {formatPrice(news.price_per_m2)}
                        <i> /m2</i>
                    </span>
                </div>

            </div>
        </div>
    )
}

export default Item
