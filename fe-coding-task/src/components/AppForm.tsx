import {FormSelect} from "./FormSelect";
import {Button, Grid} from "@mui/material";
import {buildingTypes} from "../consts/buildingTypes";
import {FormTextField} from "./FormTextField";
import {useForm, Controller} from "react-hook-form";


export type FormData = {
    startingYear: string;
    startingQuarter: string;
    endingYear: string;
    endingQuarter: string;
    buildingType: string;
}

export const AppForm = () => {

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {
            startingYear: '',
            startingQuarter: '',
            endingYear: '',
            endingQuarter: '',
            buildingType: ''
        }
    });

    const onSubmit = (data: FormData) => console.log(data);

    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={2} container>
            <Grid item xs={6}>
                <Controller name="startingYear"
                            control={control}
                            render={({field}) => <FormTextField field={field}
                                                                label={'Starting year'}></FormTextField>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller name="startingQuarter" control={control} render={({field}) =>
                    <FormSelect field={field} id={'start-quarter'} label={'Starting quarter'}
                                values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>}/>

            </Grid>

            <Grid item xs={6}>
                <Controller name="endingYear"
                            control={control}
                            render={({field}) => <FormTextField field={field}
                                                                label={'Ending year'}></FormTextField>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller name="startingQuarter" control={control} render={({field}) =>
                    <FormSelect field={field} id={'start-quarter'} label={'Starting quarter'}
                                values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller name="buildingType" control={control} render={({field}) =>
                    <FormSelect field={field} id={'building-type'} label={'Building type'}
                                values={[...buildingTypes.keys()]}></FormSelect>}/>
            </Grid>
        </Grid>
        <Button type="submit" variant="text">Submit</Button>
    </form>)
}

