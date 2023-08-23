import {useEffect, useState} from "react";
import axios from "axios";

const EmployeeView = () => {

    const baseEmpGetUrl = "http://localhost:8790/api/employee"
    const baseEmpDelUrl = "http://localhost:8790/api/employee/delete/"
    const [employeeList,setEmployeeList] = useState([])
    const [errorValue,setErrorValue] = useState(null)
    const [page,setPage] = useState(0)
    const [size,setSize] = useState(3)

    useEffect(() => {
        axios.get(`${baseEmpGetUrl}?page=${page}&size=${size}`).then(response => {
            setEmployeeList(response.data)
        })
    }, [page,size]);

    const  handleDelEmp = async (empId) => {
        try{
            await axios.delete(`${baseEmpDelUrl}${empId}`)
                .then(response => setErrorValue(null))
            removeData(empId)
        }catch(error){
            setErrorValue(error.response.data)
        }

    }

    const removeData = (empId) => {
        setEmployeeList((employeeList => employeeList.filter(emp => emp.id !== empId)))
    }

    return (
        <>
            <h3 style={{textAlign: "center"}}>Employee List</h3>
            <div className="dropdown-pagination" style={{display: 'flex',gap: '2rem',justifyContent: 'flex-end'}}>
                <select onChange={(e) => setPage(parseInt(e.target.value))}>
                    <option value="">::select page::</option>
                    <option value="0">1</option>
                    <option value="1">2</option>
                    <option value="2">3</option>
                </select>

                <select onChange={(e) => setSize(parseInt(e.target.value))}>
                    <option value="">::select size::</option>
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Company</th>
                            <th>Addresses</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        employeeList.map((emp) => {
                            return(
                                <tr key={emp.id}>
                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.companyName}</td>
                                    <td>{
                                        emp.addressList.map((address) => {
                                            return `${address.city} `
                                        })
                                    }</td>
                                    <td>
                                        <button onClick={() => handleDelEmp(emp.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            <div>
                {errorValue?.error}
            </div>
        </>
    )
}
export default EmployeeView;