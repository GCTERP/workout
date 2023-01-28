const XLSX = require('xlsx')

const Data = "Data.xlsx"

const convertJsonToExcel = () =>{
//Read Data in Excel file  
const s =XLSX.readFile(Data);
const sheetName = s.SheetNames[0]
const sheetValue = s.Sheets[sheetName];

const excel =  XLSX.utils.sheet_to_json(sheetValue);
console.log(excel)
}
convertJsonToExcel()
