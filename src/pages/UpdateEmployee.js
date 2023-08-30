import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import '../App.css'
import axios from "axios";
import {
    Alert,
    Button,
    MenuItem,
    Paper,
    Snackbar,
    Stack,
    TextField
} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import EmployeeValidation from "../validation/EmployeeValidation";
import {useParams} from "react-router-dom";

const UpdateEmployee = () => {

    const [allAddress, setAllAddress] = useState([])
    const form = useForm({resolver: yupResolver(EmployeeValidation)})
    const {register, handleSubmit, formState} = form
    const [errorValue, setErrorValue] = useState(null)
    const {errors} = formState
    const [alertOpen, setAlertOpen] = useState(false)
    const [addressIdList,setAddressIdList] = useState([])
    const [employee,setEmployee] = useState({})
    const param = useParams()
    const empId = param.id

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_EMP_URL}/${empId}`)
            .then(response => createEmployee(response.data))
            .catch(error => console.log(error))
    }, [empId]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_ADDRESS_URL}get-all`).then(response => {
            setAllAddress(response.data)
        })
    }, []);

    const createEmployee = (data) => {
        setEmployee({
            id: data.id,
            name: data.name,
            department: data.department,
            companyName: data.companyName
        })
       const test = data.addressList.map(address => address.id)
         setAddressIdList(test)
    }


    async function handleOnSubmit(data) {
        try {
            data.addressIds = addressIdList
            const response = await axios.put(`${process.env.REACT_APP_BASE_EMP_URL}/update/${employee.id}`, data);
            console.log('Response:', response.data);
            setAlertOpen(true)
        } catch (error) {
            if (error.response) {
                setErrorValue(error.response?.data)
                console.error('Error response:', error?.response?.data);
                console.error('Status code:', error?.response?.status);
            }
        }
    }

    const handleChange = (event) => {
        const value = event.target.value
        setAddressIdList(typeof value === 'string' ? value.split(','): value)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    }

    return(
        <div>
            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Employee update is successful
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <h2 style={{textAlign: 'center'}}>Update An Employee</h2>
                <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            fullWidth
                            error={errorValue?.name}
                            type="text"
                            label="Name"
                            placeholder="Enter employee name"
                            value={employee?.name}
                            helperText={errorValue?.name}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register('name')}
                            onChange={(e) => setEmployee({...employee,name: e.target.value})}
                        />
                    </Paper>
                    <p style={{color:'red'}}>{errors?.name?.message}</p>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            fullWidth
                            error={errorValue?.department}
                            type="text"
                            label="Department"
                            placeholder="Enter employee department"
                            value={employee?.department}
                            helperText={errorValue?.department}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register('department')}
                            onChange={(e) => setEmployee({...employee,department: e.target.value})}
                        />
                    </Paper>
                    <p style={{color:'red'}}>{errors?.name?.message}</p>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            fullWidth
                            error={errorValue?.companyName}
                            type="text"
                            label="Company Name"
                            placeholder="Enter employee company name"
                            value={employee?.companyName}
                            helperText={errorValue?.companyName}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register('companyName')}
                            onChange={(e) => setEmployee({...employee,companyName: e.target.value})}
                        />
                    </Paper>
                    <p style={{color:'red'}}>{errors?.name?.message}</p>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            select
                            fullWidth
                            type="text"
                            label="Select Address"
                            value={addressIdList}
                            SelectProps={{
                                multiple: true
                            }}
                            onChange={handleChange}
                        >
                            {
                                allAddress.map((address) => {
                                    return(
                                        <MenuItem
                                            key={address.id}
                                            value={address.id}
                                        >
                                            {address.city}
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <Button style={{width: "100%"}}
                                type="submit"
                                variant="contained"
                                color="warning"
                        >
                            Update
                        </Button>
                    </Paper>
                </Stack>
            </form>
        </div>
    )
}
export default UpdateEmployee;