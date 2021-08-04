
import Mapper from './components/mapper/mapper'
import Map from './components/canvas/index'
import TPA from './components/table/tpa/index'
import TableComponent from './components/table/claims/index'
import Users from './components/table/User/index'
import UISelect from './components/select-ui';
import AreaSelect from './components/auto-select-area'
import Example from './components/select-ui/reactSelect'
import './App.css'
// import Division from './components/table/styles'

function App() {
  return (
    // <Division>
    <div style={{margin:'0px auto',width:'70%'}}>
      {/* <TPA/> */}
      {/* <TableComponent/> */}
      {/* <Users/> */}
      {/* <Mapper/> */}
      {/* <UISelect/> */}
      {/* <Example/> */}
      <AreaSelect/>
    </div>
    // </Division>
  );
}

export default App;
