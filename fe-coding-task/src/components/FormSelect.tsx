import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {forwardRef} from "react";

type FormSelectProps = {
    label: string;
    values: Array<string | number>;
    id: string;
    field: unknown
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(({field, label, values, id}, ref) => {
    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                {...field}
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