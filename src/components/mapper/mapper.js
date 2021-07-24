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

    useEffect(()=>{

        document.body.addEventListener('onClick',handleBodyClick)
        
        return ()=>{
            document.body.removeEventListener('onClick',handleBodyClick)
        } 
    },[])

    const handleBodyClick = (e) =>{
        console.log(e)
    }

    return (
        <>

        <ImageMapper src={Car} map={MAP} onClick={(e)=>handleClick(e)}/> 

        </>
    )

}

export default Mapper