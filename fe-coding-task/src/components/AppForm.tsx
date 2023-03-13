import {FormSelect} from "./FormSelect";
import {Button, Grid} from "@mui/material";

export const AppForm = () => (
    <form>
        <Grid spacing={2} container>
            <Grid item xs={6}>
                <FormSelect id={'start-year'} label={'Starting year'} values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>
            </Grid>

            <Grid item xs={6}>
                <FormSelect id={'start-quarter'} label={'Starting quarter'}
                            values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>
            </Grid>

            <Grid item xs={6}>
                <FormSelect id={'end-year'} label={'End year'} values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>
            </Grid>

            <Grid item xs={6}>
                <FormSelect id={'end-quarter'} label={'End quarter'} values={['Q1', 'Q2', 'Q3', 'Q4']}></FormSelect>
            </Grid>
        </Grid>
        <Button variant="text">Submit</Button>
    </form>
)

