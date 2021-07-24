import React,{useEffect} from 'react'
import Car from './car.png'
import ImageMapper from 'react-img-mapper';
import Area from './area.json'

const Mapper = () => {
    const MAP = {
        name: 'my-map',
        // GET JSON FROM BELOW URL AS AN EXAMPLE
        areas: Area,
    };

    const handleClick = (value) =>{
        console.log(value)

    }

    const handleSpot=(e)=>{
        let mouseX = e.pageX;
        let mouseY = e.pageY;
        var color = '#0057ff';

        var size = '13px';
        let div = window.document.createElement('div')
        div.style.position = 'absolute';
        div.style.top = `${mouseY}px`;
        div.style.left = `${mouseX}px`;
        div.style.height = size;
        div.style.zIndex = 1;
        div.style.borderRadius = '50%';
        div.style.width = size;
        div.style.backgroundColor = color;
        window.document.body.appendChild(div)
       
    }

    
    return (
        <>

        <div className="mapper" onClick={handleSpot}>
            <ImageMapper src={Car} map={MAP} onClick={(e)=>handleClick(e)}/> 
        </div>

        </>
    )

}

export default Mapper