import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {forwardRef, Ref} from "react";
import {FieldError, UseFormRegisterReturn} from "react-hook-form";

type FormSelectProps = {
    label: string;
    values: Array<string | number>;
    id: string;
    onChange: (value: any) => void
    onBlur: () => void;
    value: unknown
    ref: Ref<any>
    name: string

    error?: FieldError

}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({
                                                                              error,
                                                                              onChange,
                                                                              onBlur,
                                                                              value,
                                                                              name,
                                                                              label,
                                                                              values,
                                                                              id
                                                                          }, ref) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                value={value} name={name} onBlur={onBlur}
                onChange={onChange}
                ref={ref}
                id={id}
                label={label}
            >
                {values.map(value => (
                    <MenuItem key={value} value={value}>{value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
})