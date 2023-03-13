import {TextField} from "@mui/material";
import {forwardRef, Ref} from "react";
import {FieldError} from "react-hook-form";


type FormTextFieldProps = {
    label: string;

    onChange: (value: any) => void
    onBlur: () => void;
    value: unknown
    ref: Ref<any>
    name: string

    error?: FieldError

}

// export const FormTextField = ({label, value}: FormTextFieldProps) => (
//     <TextField fullWidth value={value} label={label}></TextField>
// )
export const FormTextField = forwardRef<HTMLInputElement, FormTextFieldProps>(({
                                                                                   label,
                                                                                   onChange,
                                                                                   onBlur,
                                                                                   value,
                                                                                   name,
                                                                                   error
                                                                               }, ref) => (
    <TextField helperText={error?.message} error={!!error} fullWidth value={value} name={name} onBlur={onBlur}
               onChange={(e) => onChange(Number(e.target.value))} ref={ref}
               label={label}></TextField>
))