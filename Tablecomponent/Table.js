
// 1.Import this component
// 2.Pass data as json format like
// Pass data as below json format

// import Table from '../utilities/Table'
// const Workout = () => {
//     const data = 
//         [{
//             "_id": "1",
//             "studentId": "1917101",
//             "courseCode": "18IHS234",
//             "branch": "IT",
//             "batch": 2019,
//             "date": "10.34.2323",
//             "period": 11
//         },
//         {
//             "_id": "1",
//             "studentId": "1917101",
//             "courseCode": "18IHS234",
//             "branch": "IT",
//             "batch": 2019,
//             "date": "10.34.2323",
//             "period": 11
//         },
//         {
//             "_id": "1",
//             "studentId": "1917101",
//             "courseCode": "18IHS234",
//             "branch": "IT",
//             "batch": 2019,
//             "date": "10.34.2323",
//             "period": 11
//         }
//         ]
//     const getHeadings = () => {
//         return Object.keys(data[0]);
//     }        
//     return(
//         <>
//             <Table theadData={getHeadings()} tbodyData={data}/>
//         </>
//     )
// }
// export default Workout;


export default function Table({theadData, tbodyData}) {
    return (
        <div className="relative p-1.5 w-full inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
    
                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                    <tr className="">
                        {theadData.map(heading => {
                            return <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold  uppercase tracking-wider" key={heading}>{heading}</th>
                            })
                        }
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {tbodyData.map((row, index) => {
                        return <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={index}>
                            {theadData.map((key, index) => {
                                return <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={row[key]}>{row[key]}</td>
                            })}
                        </tr>;
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
    }
