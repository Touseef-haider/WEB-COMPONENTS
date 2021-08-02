import React,{useState,useEffect} from "react";
import "./style.css";
import axios from 'axios'
import CustomSelect from "./custom-select";

const Example = () => {
  const [data,setData] = useState([])
  const [fetchingData,setFetchingData] = useState(false)
  const [selectedOption,setselectedOption] = useState("")
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/tpa?current=${1}`).then(res=>{
        setData(res.data)      
    }).catch(err=>{
        console.log(err)
    })
  },[])


  const changeOptionsData = () => {
    setFetchingData(true)
    setTimeout(() => {
        axios.get(`http://localhost:8080/api/tpa?current=${5}`).then(res=>{
            console.log(res.data)
            setData(res.data)      
        }).catch(err=>{
            console.log(err)
        })
      setFetchingData(false)
    }, 1000);
  };
  
const filterNames = (inputValue) => {
    console.log(inputValue)
    return axios.get(`http://localhost:8080/api/tpa/search?search=${inputValue}`).then(res=>{
        console.log(res.data)
        // setData(res.data)
        return res.data
    }).catch(err=>{
        console.log(err)
    })
};

  const promiseOptions = inputValue =>{
    console.log(inputValue)
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(filterNames((inputValue)))
      }, 1000);
    });
}

  const handleChange = (selectedOption) => {
    setselectedOption(selectedOption ? selectedOption.name : "")
  };


    return (
      <div>
      
        <CustomSelect
          options={data}
          getOptionValue={data => data._id}
          getOptionLabel={(data) => data.name}
          changeOptionsData={changeOptionsData}
          fetchingData={fetchingData}
          onChange={handleChange}
          loadOptions={promiseOptions} 

        />
      </div>
    );
}

export default Example;
