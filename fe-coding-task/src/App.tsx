import React, {useState} from 'react';
import {Box, Container, Paper} from "@mui/material";
import {AppForm} from "./components/AppForm";
import {AppChart} from "./components/AppChart";


function App() {

    const [chartData, setChartData] = useState<any>({})
    const [chartLabels, setChartLabels] = useState<Array<string>>([])
    const [buildingType, setBuildingType] = useState<string>('')

    return (
        <Box mt={2}>
            <Container>
                <Paper>
                    <AppForm setChartData={setChartData} setChartLabels={setChartLabels}
                             setBuildingType={setBuildingType}></AppForm>
                    <AppChart chartLabels={chartLabels} chartData={chartData} buildingType={buildingType}></AppChart>
                </Paper>
            </Container>
        </Box>
    );
}

export default App;
