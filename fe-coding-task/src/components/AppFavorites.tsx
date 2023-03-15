import React from 'react';
import {Favorite} from "../types/Favorite";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


type FavoritesProps = {
    favorites: Array<Favorite>;
    handleLoadFavorite: (index: number) => void
    handleEditFavorite: (index: number) => void
    handleDeleteFavorite: (index: number) => void
}
export const AppFavorites = ({
                                 favorites,
                                 handleLoadFavorite,
                                 handleEditFavorite,
                                 handleDeleteFavorite
                             }: FavoritesProps) => {
    return (
        <List>
            {favorites.map(({title, id}: Favorite, index: number) => (
                <ListItem key={id}>
                    <ListItemText>
                        <span> {title}</span>
                        <span onClick={() => handleLoadFavorite(index)}> Load </span>
                        <span onClick={() => handleEditFavorite(index)}> Edit </span>
                        <span onClick={() => handleDeleteFavorite(index)}> Delete </span>
                    </ListItemText>
                </ListItem>
            ))}

        </List>
    );
};