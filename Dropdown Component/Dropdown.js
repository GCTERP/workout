//Import the component
//Pass data as below json format
//{
// "dept" :[
//     {"id": "1", "name" : "CSE"},
//   {"id": "2", "name" : "IT"},
//      {"id": "3", "name" : "EEE"},
//      {"id": "4", "name" : "EIE"},
//      {"id": "5", "name" : "MECH"},
//      {"id": "6", "name" : "IBT"},
//      {"id": "7", "name" : "PRODUCTION"},
//      {"id": "8", "name" : "CIVIL-A"},
//    {"id": "9", "name" : "CIVIL-B"}
//      
//  ]
//  }
//Import the data from data.json file

import React from 'react';
import data from './data.json';
const App = () =>
(
  <>
   <div className = 'dropdown-comp text-gray-700  pt-1'>
    <center>
     <select className= 'length' style = {{width : '10%'}}>     
      {data.dept.map((dept) => {
        return <option key={dept.id} value={dept.id}>{dept.name}</option>
      })}
    </select>
     
     </center>
   </div>
   </>
 );

export default App;
