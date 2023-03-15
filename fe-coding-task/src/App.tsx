import React, {useState} from 'react';
import {Box, Container, Paper} from "@mui/material";
import {AppForm} from "./components/AppForm";
import {AppChart} from "./components/AppChart";
import {ChartData} from "./types/ChartData";
import {Favorite} from "./types/Favorite";
import {FavoritesModal} from "./components/FavoritesModal";
import {AppFavorites} from "./components/AppFavorites"
import {FavoritesFormData} from "./types/FavoritesFormData";
import {useLocalStorage} from "usehooks-ts";
import {ChartLabels} from "./types/ChartLabels";
import {v4 as uuidv4} from 'uuid';


function App() {

    const [chartData, setChartData] = useState<ChartData>([])
    const [chartLabels, setChartLabels] = useState<ChartLabels>([])
    const [buildingType, setBuildingType] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [favorites, setFavorites] = useLocalStorage<Array<Favorite>>('favorites', [])
    const [editedFavorite, setEditedFavorite] = useState<Favorite>()

    const handleSubmitFavorite = ({title}: FavoritesFormData) => {
        if (editedFavorite) {
            editFavorite(title)
            return
        }
        addFavorite(title)
    }

    const addFavorite = (title: string) => {
        const newFavorite: Favorite = {title, chartLabels, buildingType, chartData, id: uuidv4()}
        const newFavorites = [...favorites, newFavorite]
        setFavorites(newFavorites)
        setIsModalOpen(false)
    }

    const editFavorite = (title: string) => {
        if (!editedFavorite) {
            return
        }
        const newFavorite: Favorite = {...editedFavorite, title}
        const index = favorites.findIndex((element: Favorite) => element === editedFavorite)
        const newFavorites = [...favorites]
        newFavorites[index] = newFavorite
        setFavorites(newFavorites)
        setIsModalOpen(false)
    }

    const handleLoadFavorite = (index: number) => {
        const {chartData, chartLabels, buildingType}: Favorite = favorites[index]
        setChartData(chartData)
        setChartLabels(chartLabels)
        setBuildingType(buildingType)
    }

    const handleEditFavorite = (index: number) => {
        const editedFavorite = favorites[index]
        setEditedFavorite(editedFavorite)
        setIsModalOpen(true)
    }

    const handleDeleteFavorite = (index: number) => {
        const newFavorites = favorites.filter((favorite, i) => index !== i)
        setFavorites(newFavorites)
    }

    return (
        <Box mt={2}>
            <Container>
                <Paper>
                    <AppForm setIsModalOpen={setIsModalOpen} setChartData={setChartData} setChartLabels={setChartLabels}
                             setBuildingType={setBuildingType}></AppForm>
                    <AppFavorites handleDeleteFavorite={handleDeleteFavorite} handleEditFavorite={handleEditFavorite}
                                  handleLoadFavorite={handleLoadFavorite}
                                  favorites={favorites}></AppFavorites>
                    <AppChart chartLabels={chartLabels} chartData={chartData} buildingType={buildingType}></AppChart>
                </Paper>
            </Container>
            <FavoritesModal selectedFavoriteTitle={editedFavorite?.title} handleSubmitFavorite={handleSubmitFavorite}
                            setIsModalOpen={setIsModalOpen}
                            isModalOpen={isModalOpen}></FavoritesModal>
        </Box>
    );
}

export default App;
