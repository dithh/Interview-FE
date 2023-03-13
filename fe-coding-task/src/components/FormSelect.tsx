import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

type FormSelectProps = {
    label: string;
    values: Array<string | number>;
    id: string;
}

export const FormSelect = ({label, values, id}: FormSelectProps) => (
    <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
            id={id}
            label={label}
        >
            {values.map(value => (
                <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
        </Select>
    </FormControl>
)