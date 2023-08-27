import {useEffect, useState} from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import {tableCellClasses} from '@mui/material/TableCell';
import {
    Box,
    Button,
    Paper, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";

const EmployeeView = () => {

    const baseEmpGetUrl = "http://localhost:8790/api/employee/paginated"
    const baseEmpDelUrl = "http://localhost:8790/api/employee/delete/"
    const [employeeList,setEmployeeList] = useState([])
    const [errorValue,setErrorValue] = useState(null)
    const [totalElements,setTotalElements] = useState(0)
    const [currentPage,setCurrentPage] = useState(0)
    const [rowsPerPage,setRowsPerPage] = useState(3)

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
        axios.get(`${baseEmpGetUrl}?page=${currentPage}&size=${rowsPerPage}`).then(response => {
            setEmployeeList(response.data.contents)
            setTotalElements(response.data.totalElements)
        })
    }, [currentPage,rowsPerPage]);

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
        setTotalElements(totalElements - 1)
    }

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    return (
        <>
            <h3 style={{textAlign: "center"}}>Employee List</h3>
            <Stack width="70%" m="auto">
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
                <TablePagination
                    rowsPerPageOptions={[3, 5, 10]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={currentPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Stack>



        </>
    )
}
export default EmployeeView;