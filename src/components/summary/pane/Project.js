import React, { useEffect, useState } from 'react';
import './Pane.css'


const formatPrice = (price) => {
    if (price < 1e9) {
        const roundedPrice = Math.round(price / 1e4) / 100;
        return `${roundedPrice} triệu`
    } else {
        const roundedPrice = Math.round(price / 1e7) / 100;
        return `${roundedPrice} tỷ`
    }
}

function Project(props) {
    var project = props.project

    const hanleButtonClick = () => {
        props.onSave(props.project)
    }
    console.log(props)
    return (
        <div className='project clearfix' data-project-id={project.project_id} {...props}>
            
            <div className='second-wrapper'>
                <div className='meta meta-infor'>
                    <span className='project title' onClick={e => props.modalHandle(project.project_id)}>
                        {project.name}
                    </span>
                    {props.is_save && (
                    <button className='item' onClick={hanleButtonClick}>
                        {props.label_button}
                    </button>
                    )}
                </div>

                <div className='meta meta-infor'>
                    <span className='average-price'>
                        {formatPrice(project.avg_price_per_m2)}
                        <i> /m2</i>
                    </span>
                    <span className='average-square'>
                        {Math.floor(project.avg_square)}
                        <i> m2</i>
                    </span>
                </div>

                <div className='meta meta-infor'>
                    <span className='n_news'>
                        {project.n_news}
                        <i> bài viết (trong 1 tháng)</i>
                    </span>
                </div>

                <div className='meta meta-infor'>
                    <span className='address'>
                        {project.address.address}
                    </span>
                </div>

            </div>
        
        </div>
    )
}
export default Project