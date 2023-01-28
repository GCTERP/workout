const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet');
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
const headingColumnNames = [
    "Name",
    "DOB",
    "Email",
    "Mobile",
]
//Write Column Title in Excel file

let headingColumnIndex = 1;
headingColumnNames.forEach(heading => {
    ws.cell(1, headingColumnIndex++)
        .string(heading)
});
//Write Data in Excel file
let rowIndex = 2;
data.forEach( record => {
    let columnIndex = 1;
    Object.keys(record ).forEach(columnName =>{
        ws.cell(rowIndex,columnIndex++)
            .string(record [columnName])
    });
    rowIndex++;
}); 
wb.write('Data.xlsx');//Excel file will be generated 
