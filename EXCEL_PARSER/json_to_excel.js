const XLSX = require('xlsx')
const students = [
    { name: "Ram", email: "ram@gmail.com", age: 20, gender: "M" ,dept:"networking" },
    { name: "Sita", email: "sita@gmail.com", age: 25, gender: "F",dept:"fullstack" },
     { name: "Siva", email: "siva@gmail.com", age: 24, gender: "M",dept:"Analyst"}
]

const convertJsonToExcel = () => {

    const workSheet = XLSX.utils.json_to_sheet(students);
    const workBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workBook, workSheet, "students")

    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })

    XLSX.writeFile(workBook, "StudentsData.xlsx")

}
convertJsonToExcel()