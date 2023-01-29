//Import the component
//Pass data as below json format
// const title = "Registration"
//     const options = 
//         [
//             {"name" : "CSE"},
//             {"name" : "IT"},
//             {"name" : "EEE"},
//             {"name" : "EIE"},
//             {"name" : "MECH"},
//             {"name" : "IBT"},
//             {"name" : "PRODUCTION"},
//             {"name" : "CIVIL-A"},
//             {"name" : "CIVIL-B"}
//         ]
    

//     return (
//         <>
//         <Dropdown dropdownoptions={options} dropdowntitle={title}/>
//         {/* <LoaderPrimary /> */}
//         </>
//     )

export default function Dropdown({dropdownoptions,dropdowntitle})
{
return (
  <>
    <label for="dropdownprimay" className="p-2 pb-0 text-lg text-gray-800 font-bold rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed">{dropdowntitle}</label>
     <select id="dropdown-primary" className= "shadow-md font-medium bg-gray-50 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2">     
      {dropdownoptions.map((options) => {
        return <option className="p-2 bg-blue-50 opacity-5" value={options.name}>{options.name}</option>
      })}
    </select>
   </>
 );
    }
