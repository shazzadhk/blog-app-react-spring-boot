import {useFieldArray, useForm} from "react-hook-form";
// import {DevTool} from "@hookform/devtools";
import {useEffect, useState} from "react";
import '../App.css'
import axios from "axios";
import {Button, MenuItem, Stack, TextField} from "@mui/material";

const YoutubeForm = () => {

    const [addressList,setAddressList] = useState([])
    const form = useForm()
    const {register, handleSubmit, control} = form
    const baseEmpUrl = "http://localhost:8790/api/employee"
    const baseAddressUrl = "http://localhost:8790/api/address/get-all"
    const [errorValue,setErrorValue] = useState(null)
    // const {fields,append,remove} = useFieldArray({name: "phNumber",control})

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

    }

    return (
        <>
            {/*<h3>Add New Employee</h3>*/}
            {/*<form onSubmit={handleSubmit(handleOnSubmit)} noValidate>*/}
            {/*    <label htmlFor="username">Name: </label>*/}
            {/*    <input type="text" id="name" {...register("name")}/>*/}
            {/*    /!*{errors.name?.message && <p className="error">{errors.name?.message}</p>}*!/*/}
            {/*    {errorValue?.name && <p className="error">{errorValue.name}</p>}*/}
            {/*    <br/>*/}

            {/*    <label htmlFor="department">Department: </label>*/}
            {/*    <input type="text" id="department" {...register("department")}/>*/}
            {/*    {errorValue?.department && <p className="error">{errorValue.department}</p>}*/}
            {/*    <br/>*/}
            {/*    <label htmlFor="companyName">Company Name: </label>*/}
            {/*    <input type="text" id="companyName" {...register("companyName")}/>*/}
            {/*    {errorValue?.companyName && <p className="error">{errorValue.companyName}</p>}*/}
            {/*    <br/>*/}

            {/*    <label htmlFor="addressIds">Address: </label>*/}
            {/*    <select id="addressIds" {...register("addressIds")} multiple>*/}
            {/*        <option value="">::Select One::</option>*/}
            {/*        {*/}
            {/*            addressList.map((address) => {*/}
            {/*                return(*/}
            {/*                    <option key={address.id} value={address.id}>{address.city}</option>*/}
            {/*                    )*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </select>*/}
            {/*    <br/>*/}

            {/*    <div>*/}
            {/*        <label>List of Addresses</label><br/>*/}
            {/*        {*/}
            {/*            fields.map((field,index) => {*/}
            {/*                return(*/}
            {/*                    <div className="form-control" key={field.id}>*/}
            {/*                        <input type="text" {...register(`phNumber.${index}.number`)}/>*/}
            {/*                        {index > 0 && <button onClick={() => remove(index)}>Remove</button>}*/}
            {/*                    </div>*/}
            {/*                )*/}
            {/*            })*/}

            {/*        }*/}
            {/*        <button type="button" onClick={() => append({number:""})}>Add Address</button>*/}
            {/*    </div>*/}

            {/*    <button type="submit">Submit</button>*/}
            {/*</form>*/}
            {/*<DevTool control={control}/>*/}
            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <h2 style={{textAlign: 'center'}}>Add An Employee</h2>
                <Stack spacing={2} width={500} direction="column" justifyContent="center" ml={58}>
                    <TextField
                        error={errorValue?.name}
                        type="text"
                        label="Name"
                        helperText={errorValue?.name}
                        {...register('name')}
                    />
                    <TextField
                        error={errorValue?.department}
                        type="text"
                        label="Department"
                        helperText={errorValue?.department}
                        {...register('department')}
                    />
                    <TextField
                        error={errorValue?.companyName}
                        type="text"
                        label="Company Name"
                        helperText={errorValue?.companyName}
                        {...register('companyName')}
                    />
                    <TextField
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
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </Stack>
            </form>

        </>
    )
}
export default YoutubeForm;