
import Result from './Result';
import React, { useState } from 'react';
import ReactMapGL  from '@goongmaps/goong-map-react';
const GOONG_MAPTILES_KEY = '0GjPXb6QcBApKDRqit0zOBwor2cFe12T07fJ2Asg';
function News() {
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
        <div style={{display: 'flex'}}>
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
                 width="25vw" 
                 height="100vh" 
                />}
            </div>

        </div>
       
      );
}

export default News;