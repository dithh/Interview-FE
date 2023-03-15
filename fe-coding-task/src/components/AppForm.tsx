import {FormSelect} from "./FormSelect";
import {Button, Grid} from "@mui/material";
import {BUILDING_TYPES} from "../consts/buildingTypes";
import {FormTextField} from "./FormTextField";
import {useForm, Controller} from "react-hook-form";
import {HousePricesData} from "../types/HousePricesData";
import {fetchHousePricesData} from "../services/housePricesService";
import {getAllQuartersInRange} from "../utils/getAllQuartersInRange";
import {Dispatch, SetStateAction, useEffect} from "react";
import {ChartLabels} from "../types/ChartLabels";


type AppFormProps = {
    setChartData: Dispatch<any>;
    setChartLabels: Dispatch<SetStateAction<ChartLabels>>;
    setBuildingType: Dispatch<SetStateAction<string>>;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}


const DEFAULT_VALUES = {
    STARTING_YEAR: 2009,
    STARTING_QUARTER: 1,
    ENDING_YEAR: 2023,
    ENDING_QUARTER: 1,
    BUILDING_TYPE: 'Boliger i alt'
}

export const AppForm = ({setChartData, setChartLabels, setBuildingType, setIsModalOpen}: AppFormProps) => {

    const openFavoritesModal = () => setIsModalOpen(true);

    const getInitialValues = (): HousePricesData => {
        return {
            startingYear: Number(getQueryParam('startingYear') || localStorage.getItem('startingYear')) || DEFAULT_VALUES.STARTING_YEAR,
            startingQuarter: Number(getQueryParam('startingQuarter') || localStorage.getItem('startingQuarter')) || DEFAULT_VALUES.STARTING_QUARTER,
            endingYear: Number(getQueryParam('endingYear') || localStorage.getItem('endingYear')) || DEFAULT_VALUES.ENDING_YEAR,
            endingQuarter: Number(getQueryParam('endingQuarter') || localStorage.getItem('endingQuarter')) || DEFAULT_VALUES.ENDING_QUARTER,
            buildingType: getQueryParam('buildingType') || localStorage.getItem('buildingType') || DEFAULT_VALUES.BUILDING_TYPE
        }

    }

    const addQueryParam = (key: string, value: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set(key, value);
        window.history.pushState({}, '', url.toString());
    };

    const getQueryParam = (key: string) => {
        const url = new URL(window.location.href);
        return url.searchParams.get(key) || '';
    };

    const {control, handleSubmit, watch, getValues, trigger} = useForm<HousePricesData>({
        defaultValues: getInitialValues()
    });

    useEffect(() => {
        const subscription = watch(async (value, {name}) => {
            if (!name) {
                return;
            }
            if (name === 'startingYear' || name === 'endingYear') {
                await trigger('endingYear')
            }
            localStorage.setItem(name, String(value[name]))

            addQueryParam(name, String(value[name]))
        })
        return () => subscription.unsubscribe();
    }, [watch, trigger]);

    const onSubmit = async ({
                                startingYear,
                                startingQuarter,
                                endingYear,
                                endingQuarter,
                                buildingType
                            }: HousePricesData) => {
        const quarters = getAllQuartersInRange({startingYear, startingQuarter, endingYear, endingQuarter})
        const buildingTypeCode = BUILDING_TYPES[buildingType];
        try {
            const response = await fetchHousePricesData({quarters, buildingTypeCode})
            const chartLabels = response.data.data.map((data: { key: Array<string>; }) => (
                data.key[1]
            ))
            const chartData = response.data.data.map((data: { values: Array<string>; }) => (
                data.values[0]
            ))
            setChartLabels(chartLabels)
            setChartData(chartData)
            setBuildingType(buildingType)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                                type="number"
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
                                        type="number"
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
                        <Controller name="buildingType" rules={{
                            required: {
                                value: true,
                                message: "Field required"
                            }
                        }} control={control} render={({field, fieldState}) =>
                            <FormSelect onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        value={field.value}
                                        error={fieldState.error}
                                        ref={field.ref}
                                        name={field.name} id={'building-type'} label={'Building type'}
                                        values={Object.keys(BUILDING_TYPES)}></FormSelect>}/>
                    </Grid>
                </Grid>
                <Button type="submit" variant="text">Submit</Button>
                <Button onClick={openFavoritesModal} variant="text">
                    Save to favorites
                </Button>
            </form>
        </>)
}

