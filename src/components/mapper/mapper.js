import React,{useEffect} from 'react'
import Car from './car.png'
import Mark from './mark.svg'
import ImageMapper from 'react-img-mapper';
import Area from './area.json'

const Mapper = () => {

const mapperRef = React.useRef(null);   
    const MAP = {
        name: 'my-map',
        // GET JSON FROM BELOW URL AS AN EXAMPLE
        areas: Area,
    };

    const handleClick = (value) =>{
        console.log('selected area',value)
    
    }


    const handleSpot=(e)=>{
        console.log('x',e.pageX)
        console.log('y',e.pageY)
        if(!e.target.coords) return
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        var size = '13px';
        let div = window.document.createElement('div')
        div.style.position = 'fixed';
        div.style.top = `${mouseY}px`;
        div.style.left = `${mouseX}px`;
        div.style.height = size;
        div.style.zIndex = 1;
        div.style.width = size;
        div.style.backgroundImage = `url(${Mark})`
        div.style.backgroundPosition = `center`
        window.document.body.appendChild(div)
    }

    
    return (
        <>      
            <div className="mapper" onClick={handleSpot}>
                <ImageMapper containerRef={mapperRef} src={Car} map={MAP}   onClick={handleClick}/> 
            </div>
        </>
    )

}

export default Mapper