const XLSX = require('xlsx')

const Data = "StudentsData.xlsx"

const convertJsonToExcel = () =>{
const s =XLSX.readFile(Data);
const sheetName = s.SheetNames[0]
const sheetValue = s.Sheets[sheetName];

const exceldata =  XLSX.utils.sheet_to_json(sheetValue);
console.log(exceldata)
}
convertJsonToExcel()