import React, { useEffect, useState } from 'react';
import './Pane.css'
import Item from '../../news/Item';
const formatPrice = (price) => {
    const roundedPrice = Math.round(price / 10000) / 100; // Round to nearest million
    return `${roundedPrice} triệu`;
  };
  
  const formatSquare = (square) => {
    const roundedSquare = Math.round(square);
    return `${roundedSquare} m2`;
  };

function NewsList() {
    const [listNews, setListNews] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/summary/get_list_news`)
        .then(res => res.json())
        .then(news => {
            setListNews(news)
        })
    }, [])

    // const formatListNews = () => {
    //     console.log(news)
    //     const formattedNews = news.map((item) => ({
    //         ...item,
    //         price_per_m2: formatPrice(item.price_per_m2),
    //         square: formatSquare(item.square),
    //       }));
    //       return formattedNews
    // }

    return (
        <div style={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>
          {listNews.map((news) => (
            // <a href={news.news_url} key={news.news_id} style={{ display: 'inline-block', margin: '10px', width: '400px', border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
            //   <h3 className='long-word'>{news.title}</h3>
            //   <p>Price: {news.price_per_m2}</p>
            //   <p>Square: {news.square}</p>
            //   {/* <a href= {news.url}>News URL: {news.news_url}</a> */}
            //   <p className='long-word'>Address: {news.address}</p>
            // </a>
            <div className='item-wrapper' key={news.news_id} style={{ display: 'inline-block', margin: '10px', width: '450px', border: '1px solid gray', borderRadius: '5px', padding: '10px' }}>
            <Item item={news} />
            </div>
          ))}
        </div>
      );
}

export default NewsList