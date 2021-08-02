import React, { useEffect,useState }  from 'react'
import { Card, Table,Row,Col,Input, Button,DatePicker } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios'
import { Select } from 'antd';
import ImportIcon from './Icon.png'
import ExportIcon from './export.png'
import './style.css'
import { SearchOutlined } from '@ant-design/icons'

const { Option } = Select;

const columns = [
  {
    title: 'DD USER',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.first_name} `
  },
  {
    title: 'DD Claim #',
    // dataIndex: 'first_name',
    render: x => `${x.dd_claim_number} `
  },
  {
    title: 'TPA Claim #',
    // dataIndex: 'first_name',
    render: x => `${x.insurance_claim_number} `
  },
  {
    title: 'FIRST NAME',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.first_name} `
  },
  {
    title: 'LAST NAME',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.last_name} `
  },
  {
    title: 'CITY',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.city} `
  },
  {
    title: 'ST',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.state} `
  },
  {
    title: 'ZIP',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.zip_code} `
  },
  {
    title: 'PHONE 1',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.phone} `
  },
  {
    title: 'PHONE 2',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.secondary_phone} `
  },
  {
    title: 'EMAIL',
    // dataIndex: 'first_name',
    render: x => `${x.personal_info.email} `
  },
 ,
];



const TableComponent = () => {
  const [data,setData] = useState([])
  const [show,setShow] = useState({})
  const [filerData,setFilterData] = useState([]);
  const [fromDate,setFromDate] = useState(null);
  const [pagination,setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [loading,setLoading] = useState(false)
  

  useEffect(()=> {
    fetch(pagination);
  },[])

  const handleCategoryStatus = (value,params={}) =>{
    setLoading(true);
    reqwest({
      url: 'http://localhost:8080/api/claim/getClaim',
      method: 'get',
      type: 'json',
      data:  {
        status: value,
      },
    }).then(data => {
      setLoading(false)
      setData(data)
      setPagination({
        ...params.pagination,
      })
      
    });
  }
  const handleCategoryType = (value,params={}) =>{
    setLoading(true);


    reqwest({
      url: 'http://localhost:8080/api/claim/getClaimBasedOnType',
      method: 'get',
      type: 'json',
      data:  {
        type: value
      },
    }).then(data => {

      setLoading(false)
      setData(data)
      setPagination({
        ...params.pagination,
      })
      
    });
  }

  const handleFromDate = (value) =>{
    setFromDate(value.value)
  }

  const handleToDate = (value,params={}) =>{
    setLoading(true);
    reqwest({
      url: `http://localhost:8080/api/claim/getClaimByDate?date1=${fromDate}$date2=${value}`,
      method: 'get',
      type: 'json',
      data:  {
        pageSize: params.pageSize,
        current: params.current
      },
    }).then(data => {
      setLoading(false)
      setData(data)
      setPagination({
        ...params.pagination,
      })
      
    });
  }

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
    setShow({
      ...pagination
    })
  };

  const fetch = (params = {}) => {
    setLoading(true);
    reqwest({
      url: 'http://localhost:8080/api/claim/claimsPaginated',
      method: 'get',
      type: 'json',
      data:  {
        pageSize: 1,
        current: 4,
      },
    }).then(data => {
      setLoading(false)
      setData(data)
      setFilterData(data)

      setPagination({
          ...params.pagination,
      })

        
      
    });
  };
  let cancelToken;
  const handleSearch = async (e,params={}) =>{
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.")
    }
    cancelToken = axios.CancelToken.source()
    try {
      if(e.target.value){
        const results = await axios.get(
          `http://localhost:8080/api/claim/searchByClaimNumber?search=${e.target.value}`,
          { cancelToken: cancelToken.token } //Pass the cancel token to the current request
        )

        setLoading(false)
        setData(results.data)
        setPagination({
          ...params.pagination,
        })
      }else{
        setData(filerData)
      }
    } catch (error) {
      console.log(error)
    }
  }
  // abc

    return (
      <>
      <Row style={{margin:'10px'}}>
        <Col span={6}>
          <h2>Claims</h2>
        </Col>
        <Col span={18}>
          <Row>
            <Col className="header-inputs" span={2}></Col>
            <Col className="header-inputs" xs={24} md={12}>
              <Input className="input-height" prefix={<SearchOutlined id="import-icon"/>} onChange={handleSearch} placeholder="search..." id="search" style={{width:'100%'}} />
            </Col>
            <Col className="header-inputs" xs={12} md={5}>
              <Button className="input-height" style={{width:"100%"}} id="import-btn">
                <img src={ImportIcon} />
                Import
              </Button>
            </Col>
            <Col className="header-inputs" xs={12} md={5}>
              <Button className="input-height" style={{width:"100%"}} id="import-btn">
                <img height="20" src={ExportIcon} />
                Import
              </Button>
            </Col>
          </Row>
            
        </Col>
      </Row>
      <Card id="card">
          <div className="main">
            <Row className="input-div">
              <Col className="inp" span={6} >
                <label >Claim Type</label>
                <Select id="select" onChange={handleCategoryType} style={{width:'100%'}}>
                  <Option value="60e4663546937f22a8cc154f">PDR</Option>
                </Select>
              </Col>
              <Col className="inp" span={6} >
                <label>Peport Type</label>
                <Select id="select" onChange={handleCategoryStatus} style={{width:'100%'}}>
                  <Option value="in_process">In Process</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Col>
              <Col className="inp" span={6} >
                <label>Date From</label>
                <DatePicker onChange={handleFromDate} style={{width:'100%'}} id="datepicker"></DatePicker>
              </Col>
              <Col className="inp last-inp" span={6} >
                <label>Date To</label>
                <DatePicker style={{width:'100%'}} onChange={handleToDate} id="datepicker"></DatePicker>
              </Col>
              
            </Row>

              <Table
                  sticky={false}
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  
                  loading={loading}
                  onChange={handleTableChange}
              />
              <p class="pagination-show">
              </p>
           
          </div>
      </Card>
      </>
    );
  }


export default TableComponent