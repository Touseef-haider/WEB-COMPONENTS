import React,{useEffect,useState} from 'react';
import AsyncSelect from 'react-select/async';
import { components } from "react-select";
import Arrow from './drop-down-arrow.svg'
import axios from 'axios';
import './style.css'

const filterNames = (inputValue) => {
    return axios.get(`http://localhost:8080/api/tpa/search?search=${inputValue}`).then(res=>{
        return res.data
    }).catch(err=>{
        console.log(err)
    })
};

// asda
const promiseOptions = inputValue =>{
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterNames((inputValue)))
      }, 1000);
    });
}

const CaretDownIcon = () => {
return <img src={Arrow} className="drop-down-arrow" width="10" />;
};

const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <CaretDownIcon />
      </components.DropdownIndicator>
    );
  };


const UISelect = (props) => {
    const [options,setOptions] = useState([])
    

    return (
    <div style={{marginTop:'30px'}}>
      <AsyncSelect
        components={{ DropdownIndicator }}
        cacheOptions
        options={options}
        defaultOptions
        getOptionValue={options => options._id}
        getOptionLabel={(options) => options.name}
        loadOptions={promiseOptions} 
      />
    </div>
    );  
}

export default UISelect