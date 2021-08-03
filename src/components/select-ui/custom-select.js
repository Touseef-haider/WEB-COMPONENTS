import React, { Fragment } from "react";
import AsyncSelect from "react-select/async";
import { components } from 'react-select';
import { Button } from 'antd'
import Arrow from './drop-down-arrow.svg'

import "./style.css";

const Menu = (props) => {
  return (
    <Fragment>
      <components.Menu {...props}>
        <div>
          <div>{props.children}</div>
          <Button  style={{width:'100%',borderLeft:'none',borderRight:'none'}} onClick={props.selectProps.changeOptionsData}>
            {props.selectProps.fetchingData ? "Fetching ..." : "Load More" }
          </Button>
        </div>
      </components.Menu>
    </Fragment>
  );
};

const Option = (props) => {
  return (
    <Fragment>
      <components.Option {...props}>{props.children}</components.Option>
    </Fragment>
  );
};

const CaretDownIcon = () => {
    return <img src={Arrow} width="10" />;
};


const DropdownIndicator = props => {
    return (
        <components.DropdownIndicator {...props}>
          <CaretDownIcon />
        </components.DropdownIndicator>
    );
};
const CustomSelect = ({
    options,
  changeOptionsData,
  fetchingData,
  loadOptions,
  onChange
}) => {
  return (
    <div>
      <AsyncSelect
        defaultOptions={options}
        components={{ Menu, Option ,DropdownIndicator}}
        fetchingData={fetchingData}
        changeOptionsData={changeOptionsData}
        onChange={onChange}
        maxMenuHeight={250}
        getOptionValue={(options) => options._id}
        getOptionLabel={(options) => options.name}
        loadOptions={loadOptions} 
        cacheOptions
      />
    </div>
  );
};
export default CustomSelect;
