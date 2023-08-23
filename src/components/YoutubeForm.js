import {useForm} from "react-hook-form";
import {DevTool} from "@hookform/devtools";
import {useEffect, useState} from "react";
import '../App.css'
import axios from "axios";

const YoutubeForm = () => {

    // const [formValue, setFormValue] = useState({})
    const [addressList,setAddressList] = useState([])
    const form = useForm()
    const {register, handleSubmit, control} = form
    const baseEmpUrl = "http://localhost:8790/api/employee"
    const baseAddressUrl = "http://localhost:8790/api/address/get-all"
    const [addressId,setAddressId] = useState("")
    const [errorValue,setErrorValue] = useState(null)

    useEffect(() => {
        axios.get(baseAddressUrl).then(response => {
            setAddressList(response.data)
        })
    }, []);
    const handleOnSubmit = (data) => {
        data = {...data,addressIds: [parseInt(addressId)]}
        axios.post(
            baseEmpUrl, data
        ).then(response => console.log(response))
        .catch(error => setErrorValue(error.response.data))

    }

    return (
        <div>
            <h3>Add New Employee</h3>
            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                <label htmlFor="username">Name: </label>
                <input type="text" id="name" {...register("name")}/>
                {/*{errors.name?.message && <p className="error">{errors.name?.message}</p>}*/}
                {errorValue?.name && <p className="error">{errorValue.name}</p>}
                <br/>

                <label htmlFor="department">Department: </label>
                <input type="text" id="department" {...register("department")}/>
                {errorValue?.department && <p className="error">{errorValue.department}</p>}
                <br/>
                <label htmlFor="companyName">Company Name: </label>
                <input type="text" id="companyName" {...register("companyName")}/>
                {errorValue?.companyName && <p className="error">{errorValue.companyName}</p>}
                <br/>

                <label htmlFor="addressIds">Address: </label>
                <select id="addressIds" {...register("addressIds")} onChange={(e) => setAddressId(e.target.value)}>
                    <option value="">::Select One::</option>
                    {
                        addressList.map((address) => {
                            return(
                                <option key={address.id} value={address.id}>{address.city}</option>
                                )
                        })
                    }
                </select>
                <br/>

                <input type="submit"/>
            </form>
            <DevTool control={control}/>
            {/*<div>*/}
            {/*    <p>{errorValue?.name}</p>*/}
            {/*    <p>{errorValue?.department}</p>*/}
            {/*    <p>{errorValue?.companyName}</p>*/}
            {/*</div>*/}
        </div>
    )
}
export default YoutubeForm;