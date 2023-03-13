import React from 'react';
import {AppForm} from "./components/AppForm";
import {Box, Container, Paper} from "@mui/material";


function App() {
    return (
        <Box mt={2}>
            <Container>
                <Paper>
                    <AppForm></AppForm>
                </Paper>
            </Container>
        </Box>
    );
}

export default App;
