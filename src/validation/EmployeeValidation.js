import * as yup from "yup";

const EmployeeValidation = yup.object({
    name: yup.string().required("Name is required"),
    department: yup.string().required("Department is required"),
    companyName: yup.string().required("Company name is required")
}).required()
export default EmployeeValidation;