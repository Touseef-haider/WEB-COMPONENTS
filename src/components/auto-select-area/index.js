import React,{useEffect,useState} from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-google-places-autocomplete';
import Arrow from './drop-down-arrow.png'
import axios from 'axios'


const AreaSelect = () => {
    const [value, setValue] = useState(null);
//   useEffect(() =>{
//     let el = document.querySelector('.css-tlfecz-indicatorContainer')
//     let img = document.createElement('img')
//     img.src = `${Arrow}`
//     img.width='10'
//     img.height='10'
//     el.appendChild(img)
//   },[])

    


    const handleChange = (value) =>{
        console.log(value)
        geocodeByAddress(value.label)
        .then(results => console.log(results))
        .catch(error => console.error(error));
        setValue()
        geocodeByPlaceId(value.value.place_id)
        .then(results => {
            
            
            let lat = results[0].geometry.location.lat()
            let lng = results[0].geometry.location.lng()
            axios.get(`http://api.positionstack.com/v1/forward?access_key=23a79690702e249ff6040ba352164558&query=${lat},${lng}`).then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
            console.log({lat,lng})
        })
        .catch(error => console.error(error));
    }

  return(
    <div>
        <GooglePlacesAutocomplete
            selectProps={{
                value,
                onChange: handleChange,
            }}

        />
    </div>
  )
}


export default AreaSelect;