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

const AddEmployee = () => {

    const [addressList, setAddressList] = useState([])
    const form = useForm({resolver: yupResolver(EmployeeValidation)})
    const {register, handleSubmit, formState, reset} = form
    const [errorValue, setErrorValue] = useState(null)
    const {isDirty, isSubmitting,errors} = formState
    const [alertOpen, setAlertOpen] = useState(false)
    const [addressIdList,setAddressIdList] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_ADDRESS_URL}get-all`).then(response => {
            setAddressList(response.data)
        })
    }, []);



    async function handleOnSubmit(data) {
        console.log(data)
        try {
            data.addressIds = addressIdList
            const response = await axios.post(`${process.env.REACT_APP_BASE_EMP_URL}`, data);
            console.log('Response:', response.data);
            setAlertOpen(true)
            setAddressIdList([])
            handleReset()
        } catch (error) {
            if (error.response) {
                setErrorValue(error.response?.data)
                console.error('Error response:', error?.response?.data);
                console.error('Status code:', error?.response?.status);
            }
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    }

    const handleReset = () => {
        reset()
    }

    const handleChange = (event) => {
        const value = event.target.value
        setAddressIdList(typeof value === 'string' ? value.split(','): value)
    };



    return (
        <>

            <Snackbar
                open={alertOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical:'top', horizontal:'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Employee saved is successful
                </Alert>
            </Snackbar>

            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <h2 style={{textAlign: 'center'}}>Add An Employee</h2>
                <Stack spacing={2} direction="column" justifyContent="flex-start" alignItems="center">
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            error={errorValue?.name}
                            type="text"
                            label="Name"
                            placeholder="Enter employee name"
                            helperText={errorValue?.name}
                            {...register('name')}
                        />
                    </Paper>
                    <p style={{color:'red'}}>{errors?.name?.message}</p>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            error={errorValue?.department}
                            type="text"
                            label="Department"
                            placeholder="Enter employee department"
                            helperText={errorValue?.department}
                            {...register('department')}
                        />
                    </Paper>
                    <p style={{color:'red'}}>{errors?.name?.message}</p>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            error={errorValue?.companyName}
                            type="text"
                            label="Company Name"
                            placeholder="Enter employee company name"
                            helperText={errorValue?.companyName}
                            {...register('companyName')}
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
                                addressList.map((address) => {
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
                                // disabled={!isDirty || isSubmitting}
                                type="submit"
                                variant="contained"
                                color="primary"
                        >
                            Submit
                        </Button>
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <Button style={{width: "100%"}}
                                type="button"
                                variant="contained"
                                color="warning"
                                onClick={handleReset}
                        >
                            Reset
                        </Button>
                    </Paper>
                </Stack>
            </form>
        </>
    )
}
export default AddEmployee;