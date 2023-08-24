import {useEffect, useState} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import * as rows from "react-bootstrap/ElementChildren";

const EmployeeView = () => {

    const baseEmpGetUrl = "http://localhost:8790/api/employee"
    const baseEmpDelUrl = "http://localhost:8790/api/employee/delete/"
    const [employeeList,setEmployeeList] = useState([])
    const [errorValue,setErrorValue] = useState(null)
    const [page,setPage] = useState(0)
    const [size,setSize] = useState(3)

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

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
            <div className="dropdown-pagination" style={{display: 'flex',gap: '1rem',justifyContent: 'flex-end'}}>
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
            {/*<div>*/}
            {/*    <table>*/}
            {/*        <thead>*/}
            {/*            <tr>*/}
            {/*                <th>Id</th>*/}
            {/*                <th>Name</th>*/}
            {/*                <th>Department</th>*/}
            {/*                <th>Company</th>*/}
            {/*                <th>Addresses</th>*/}
            {/*                <th>Actions</th>*/}
            {/*            </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {*/}
            {/*            employeeList.map((emp) => {*/}
            {/*                return(*/}
            {/*                    <tr key={emp.id}>*/}
            {/*                        <td>{emp.id}</td>*/}
            {/*                        <td>{emp.name}</td>*/}
            {/*                        <td>{emp.department}</td>*/}
            {/*                        <td>{emp.companyName}</td>*/}
            {/*                        <td>{*/}
            {/*                            emp.addressList.map((address) => {*/}
            {/*                                return `${address.city} `*/}
            {/*                            })*/}
            {/*                        }</td>*/}
            {/*                        <td>*/}
            {/*                            <button onClick={() => handleDelEmp(emp.id)}>Delete</button>*/}
            {/*                        </td>*/}
            {/*                    </tr>*/}
            {/*                )*/}
            {/*            })*/}
            {/*        }*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Department</TableCell>
                            <TableCell align="right">Company Name</TableCell>
                            <TableCell align="right">Addresses</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employeeList.map((employee) => (
                            <StyledTableRow
                                key={employee.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    {employee.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{employee.name}</StyledTableCell>
                                <StyledTableCell align="right">{employee.department}</StyledTableCell>
                                <StyledTableCell align="right">{employee.companyName}</StyledTableCell>
                                <StyledTableCell align="right">{
                                    `${employee.addressList.map(address => {
                                        return `${address.city} `
                                    })}`
                                }</StyledTableCell>
                                <StyledTableCell align="right">
                                    <Button variant="contained" color="error" onClick={() => handleDelEmp(employee.id)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default EmployeeView;