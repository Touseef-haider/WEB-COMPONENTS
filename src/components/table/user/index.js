import React, { useEffect,useState }  from 'react'
import { Card, Table,Row,Col,Input, Button,DatePicker } from 'antd';
import reqwest from 'reqwest';
import axios from 'axios'
import { Select, Radio } from 'antd';
import './style.css'
import { SearchOutlined } from '@ant-design/icons'

const { Option } = Select;

const columns = [
  {
    title: 'FULL NAME',
    // dataIndex: 'full_name',
    render:obj=>`${obj.first_name} ${obj.last_name}`,
    width: '10%',
  },
  {
    title: 'USER TYPE',
    // dataIndex: 'role',
    render:obj=>`${obj.role}`,
    width: '10%',
  },


 
];



const Users = () => {
  const [data,setData] = useState([])
  const [filerData,setFilterData] = useState([])
  const [show,setShow] = useState({})
  const [fromDate,setFromDate] = useState(null)
  const [pagination,setPagination] = useState({
    current: 1,
    pageSize: 10,
  })
  const [loading,setLoading] = useState(false)
  

  useEffect(()=> {
    fetch(pagination);
  },[])

  


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
      url: 'http://localhost:8080/api/profile/getProfiles',
      method: 'get',
      type: 'json',
      data:  {
        pageSize: params.pageSize,
        current: params.current,
      },
    }).then(data => {
      console.log(data);
      setLoading(false)
      setData(data)
      setFilterData(data)

      setPagination({
          ...params.pagination,
          total:200
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
          `http://localhost:8080/api/tpa/search?search=${e.target.value}`,
          { cancelToken: cancelToken.token } //Pass the cancel token to the current request
        )
        console.log("--->",results);
        setLoading(false)
        setData(results.data)
        setPagination({
          ...params.pagination,
            total: 200,
        })
      }else{
        setData(filerData)
      }
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <>
      <Row style={{margin:'10px'}}>
        <Col span={6}>
          <h2>System / Users</h2>
        </Col>
        <Col span={18}>
          <Row>
            <Col className="header-inputs" span={9}></Col>
            <Col className="header-inputs" span={10}>
              {/* <Input prefix={<SearchOutlined id="import-icon"/>} onChange={handleSearch} placeholder="search..." id="search" style={{width:'100%'}} /> */}
            </Col>
            <Col className="header-inputs" span={5}>
              <Button style={{width:"100%"}} id="user-btn">
                Add new User
              </Button>
            </Col>
            
          </Row>
    
        </Col>
  
      </Row>
      <Card id="card">
          <div className="main">
           
              <Table
                  sticky={false}
                  columns={columns}
                  dataSource={data}
                  pagination={pagination}
                  loading={loading}
                  onChange={handleTableChange}
              />
              <p class="pagination-show">
                Showing {show.current ? show.current : 1 } - {show.pageSize ? show.pageSize : 10} of {show.total ? show.total :200}
              </p>
           
          </div>
      
  
      </Card>
      </>

    );
  }

export default Users