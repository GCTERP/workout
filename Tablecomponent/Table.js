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
//             "period": 11
//         }
//         ]     
//     return(
//         <>
//             <Table data={data}/>
//         </>
//     )
// }
// export default Workout;


const Table = ({data}) => (
        data &&
        <>
       
        <div className="relative p-1.5 w-fit inline-block align-middle">
            <div className=" overflow-hidden overflow-x-auto shadow-md sm:rounded-lg border">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left sm:rounded-lg">
    
                <thead className="rounded-t-lg bg-gray-100 text-xs uppercase">
                    <tr className="">
                        {Object.keys(data[0]).map(heading => {
                            return <th className="px-5 py-3 text-gray-600 text-left text-xs font-semibold  uppercase tracking-wider" key={heading}>{heading}</th>
                            })
                        }
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                    {data.map((element) => {
                        return <tr className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap hover:bg-sky-50" key={element._id}>
                            {Object.keys(data[0]).map((key, index) => {
                                return <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap" key={element[key]}>{element[key]}</td>
                            })}
                        </tr>;
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>
    </>
)

export default Table
