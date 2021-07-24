import React from 'react'
import Car from './car.png'
import ImageMapper from 'react-img-mapper';
import Area from './area.json'

const Mapper = () => {
    const MAP = {
        name: 'my-map',
        // GET JSON FROM BELOW URL AS AN EXAMPLE
        areas: Area,
      };
    return (
        <>

        <ImageMapper src={Car} map={MAP}/> 

        </>
    )

}

export default Mapper