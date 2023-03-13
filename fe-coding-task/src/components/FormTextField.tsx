import {TextField} from "@mui/material";
import {forwardRef} from "react";
import {ControllerRenderProps, FieldValues} from "react-hook-form";
import {FormData} from "./AppForm";

type FormTextFieldProps = {
    label: string;
    field: unknown


}

// export const FormTextField = ({label, value}: FormTextFieldProps) => (
//     <TextField fullWidth value={value} label={label}></TextField>
// )
export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(({label, field}, ref) => (
    <TextField fullWidth {...field} ref={ref} label={label}></TextField>
))