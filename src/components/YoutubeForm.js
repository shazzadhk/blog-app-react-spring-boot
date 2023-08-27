import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import '../App.css'
import axios from "axios";
import {Alert, Button, MenuItem, Paper, Snackbar, Stack, TextField} from "@mui/material";

const YoutubeForm = () => {

    const [addressList, setAddressList] = useState([])
    const form = useForm()
    const {register, handleSubmit, formState, reset} = form
    const baseEmpUrl = "http://localhost:8790/api/employee"
    const baseAddressUrl = "http://localhost:8790/api/address/get-all"
    const [errorValue, setErrorValue] = useState(null)
    const {isDirty, isValid, isSubmitting, isSubmitSuccessful} = formState
    const [alertOpen, setAlertOpen] = useState(false)

    console.log({isDirty, isValid,isSubmitSuccessful})

    useEffect(() => {
        axios.get(baseAddressUrl).then(response => {
            setAddressList(response.data)
        })
    }, []);

    const handleOnSubmit = (data) => {
        data.addressIds = [parseInt(data.addressIds)]
        axios.post(
            baseEmpUrl, data
        ).then(response => console.log(response))
            .catch(error => setErrorValue(error.response.data))
        setAlertOpen(true)
        handleReset()
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
                            helperText={errorValue?.name}
                            {...register('name', {
                                required: true,
                                message: "Name can't be empty or null"
                            })}
                        />
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            error={errorValue?.department}
                            type="text"
                            label="Department"
                            helperText={errorValue?.department}
                            {...register('department')}
                        />
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            error={errorValue?.companyName}
                            type="text"
                            label="Company Name"
                            helperText={errorValue?.companyName}
                            {...register('companyName')}
                        />
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <TextField
                            style={{width: "100%"}}
                            id="outlined-select-currency"
                            select
                            label="Select"
                            {...register('addressIds')}
                        >
                            {addressList.map((address) => (
                                <MenuItem key={address.id} value={address.id}>
                                    {address.city}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Paper>
                    <Paper style={{width: "35%"}} elevation={4}>
                        <Button style={{width: "100%"}}
                                disabled={!isDirty || !isValid || isSubmitting}
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
export default YoutubeForm;