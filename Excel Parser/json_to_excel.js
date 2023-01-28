const XLSX = require('xlsx')
const data = [
    {
       "name":"Ram",
       "DOB":"22/01/2001",
       "email":"ram@gmail.com",
       "mobile":"1234567890"
    },
    {
       "name":"Vinay",
       "DOB":"05/04/2001",
       "email":"vinay@gmail.com",
       "mobile":"9807654321"
    }
]
exports.convertJsonToExcel = () =>{
    //Create a worksheet
    const workSheet = XLSX.utils.json_to_sheet(data);
    //Create a workbook and append the worksheet to workbook
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "data");
    // Generate buffer
    XLSX.write(workBook, { bookType: 'xlsx', type: "buffer" })
    // Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "Data.xlsx")

}



