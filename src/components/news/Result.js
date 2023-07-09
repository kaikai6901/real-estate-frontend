import React, { useEffect, useState } from 'react';
import './News.css'



const formatPrice = (price) => {
    const roundedPrice = Math.round(price / 1000000); // Round to nearest million
    return `${roundedPrice} million/m2`;
  };
  
  const formatSquare = (square) => {
    const roundedSquare = Math.round(square);
    return `${roundedSquare} m2`;
  };
function Result(lngLat) {

    const [news, setNews] = useState([])
    console.log(lngLat)
    // const longitude = lngLat[0]
    // const latitude = lngLat[1]
    const [longitude, latitude] = lngLat.lngLat;
    // const fetchNews = async (geocode) => {
    //     const [longitude, latitude] = geocode;
    //     console.log(geocode)
    //     try {
    //         const params = new URLSearchParams({longitude, latitude})
    //         const response = await fetch('http://127.0.0.1:5555/news/get_news?${param}' );
    //         const data = await response.json()
    //         setNews(data);
    //     } catch (error) {
    //         console.error('Error : ', error);
    //     }
    // };


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const params = new URLSearchParams({longitude, latitude})
                const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/news/get_news?` + params );
                const data = await response.json()
                console.log(data)
                setNews(data);
            } catch (error) {
                console.error('Error : ', error);
            }
        };

        if (longitude && latitude) {
            fetchNews();
        }

    }, [longitude, latitude])

    return (
        <div className="news-container">
          <div className="scroll-pane">
            {console.log(news)}
            {news.map((article) => (
              <div className="news-item" draggable={true} key={article._id}>
                <h3>{article.title}</h3>
                <h2>{formatPrice(article.price_per_m2)}</h2>
                <p>{article.news_url}</p>
                {/* Display other properties as needed */}
              </div>
            ))}
          </div>
        </div>
      );
}

export default Result