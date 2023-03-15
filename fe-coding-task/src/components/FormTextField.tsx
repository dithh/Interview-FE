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
    type?: string

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
                                                                                   type,
                                                                                   error
                                                                               }, ref) => (
    <TextField helperText={error?.message} error={!!error} fullWidth value={value} name={name} onBlur={onBlur}
               onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)} ref={ref}
               label={label}></TextField>
))