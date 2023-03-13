import {FormSelect} from "./FormSelect";
import {Button, Grid} from "@mui/material";
import {buildingTypes} from "../consts/buildingTypes";
import {FormTextField} from "./FormTextField";
import {useForm, Controller} from "react-hook-form";
import {HousePricesData} from "../types/HousePricesData";
import {fetchHousePricesData} from "../services/housePricesService";
import {getAllQuartersInRange} from "../utils/getAllQuartersInRange";


export const AppForm = () => {


    const {control, handleSubmit, getValues} = useForm<HousePricesData>({
        defaultValues: {
            startingYear: 2009,
            startingQuarter: 1,
            endingYear: 2023,
            endingQuarter: 1,
            buildingType: ''
        }
    });

    const onSubmit = async ({
                                startingYear,
                                startingQuarter,
                                endingYear,
                                endingQuarter,
                                buildingType
                            }: HousePricesData) => {
        const quarters = getAllQuartersInRange({startingYear, startingQuarter, endingYear, endingQuarter})
        const buildingTypeCode = buildingTypes.get(buildingType) as string;
        try {
            const response = await fetchHousePricesData({quarters, buildingTypeCode})
            console.log(response);
        } catch (e) {
            console.error(e)
        }
    }


    return (<form onSubmit={handleSubmit(onSubmit)}>
        <Grid spacing={2} container>
            <Grid item xs={6}>
                <Controller
                    name="startingYear"
                    control={control}
                    rules={{
                        required: {value: true, message: "Year has to be between 2009 and 2022"},
                        min: {value: 2009, message: "Year has to be between 2009 and 2022"},
                        max: {value: 2022, message: "Year has to be between 2009 and 2022"}
                    }}
                    render={({field, fieldState}) => <FormTextField
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        value={field.value}
                        ref={field.ref}
                        name={field.name}
                        error={fieldState.error}
                        label={'Starting year'}></FormTextField>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller rules={{
                    required: true,
                }} name="startingQuarter" control={control} render={({field}) =>
                    <FormSelect onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                ref={field.ref}
                                name={field.name}
                                id={'startingQuarter'} label={'Starting quarter'}
                                values={[1, 2, 3, 4]}></FormSelect>}/>

            </Grid>

            <Grid item xs={6}>
                <Controller name="endingYear"
                            control={control}
                            rules={{
                                required: {value: true, message: "Year has to be between 2009 and 2022"},
                                min: {value: 2009, message: "Year has to be between 2009 and 2022"},
                                max: {value: 2022, message: "Year has to be between 2009 and 2022"},
                                validate: (value) => {
                                    return value >= getValues().startingYear || 'Ending year has to be equal or greater than starting year'
                                }
                            }}
                            render={({field, fieldState}) => <FormTextField
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                ref={field.ref}
                                name={field.name}
                                error={fieldState.error}
                                label={'Ending year'}></FormTextField>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller name="endingQuarter" control={control} render={({field}) =>
                    <FormSelect onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                ref={field.ref}
                                name={field.name}
                                id={'endingQuarter'} label={'Ending quarter'}
                                values={[1, 2, 3, 4]}></FormSelect>}/>
            </Grid>

            <Grid item xs={6}>
                <Controller name="buildingType" control={control} render={({field}) =>
                    <FormSelect onChange={field.onChange}
                                onBlur={field.onBlur}
                                value={field.value}
                                ref={field.ref}
                                name={field.name} id={'building-type'} label={'Building type'}
                                values={[...buildingTypes.keys()]}></FormSelect>}/>
            </Grid>
        </Grid>
        <Button type="submit" variant="text">Submit</Button>
    </form>)
}

