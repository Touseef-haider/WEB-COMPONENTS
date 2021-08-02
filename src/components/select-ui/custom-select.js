import React, { Fragment } from "react";
import Select, { components } from "react-select";
import Arrow from './drop-down-arrow.svg'

import "./style.css";

const Menu = (props) => {
  return (
    <Fragment>
      <components.Menu {...props}>
        <div>
          {props.selectProps.fetchingData ? (
            <span className="fetching">Fetching data...</span>
          ) : (
            <div>{props.children}</div>
          )}
          <button
            className={"change-data"}
            onClick={props.selectProps.changeOptionsData}
          >
            Load More
          </button>
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
    return <img src={Arrow} className="drop-down-arrow" width="10" />;
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
      <Select
        components={{ DropdownIndicator }}
        options={options}
        components={{ Menu, Option }}
        fetchingData={fetchingData}
        changeOptionsData={changeOptionsData}
        onChange={onChange}
        getOptionValue={(options) => options._id}
        getOptionLabel={(options) => options.name}
        loadOptions={loadOptions} 
      />
    </div>
  );
};
export default CustomSelect;
