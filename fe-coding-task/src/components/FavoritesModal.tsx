import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {FormTextField} from "./FormTextField";
import React, {Dispatch, SetStateAction} from "react";
import {Controller, useForm} from "react-hook-form";
import {FavoritesFormData} from "../types/FavoritesFormData";
import {useEffect} from "react";

type ModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    handleSubmitFavorite: ({title}: FavoritesFormData) => void
    selectedFavoriteTitle?: string
};


export const FavoritesModal = ({
                                   isModalOpen,
                                   setIsModalOpen,
                                   handleSubmitFavorite,
                                   selectedFavoriteTitle
                               }: ModalProps) => {
    const {control, handleSubmit, reset, setValue} = useForm<FavoritesFormData>({
        defaultValues: {
            title: ''
        }
    });

    useEffect(() => {
        selectedFavoriteTitle && setValue('title', selectedFavoriteTitle)
    }, [selectedFavoriteTitle, setValue])

    const handleSave = (data: FavoritesFormData) => {
        handleSubmitFavorite(data);
        reset()
    }

    return (
        <Dialog
            open={isModalOpen}
        >
            <DialogTitle>Save as favorite</DialogTitle>

            <Controller
                name="title"
                control={control}
                rules={{
                    required: {value: true, message: "Field is required"},
                }}
                render={({field, fieldState}) => <FormTextField
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    value={field.value}
                    ref={field.ref}
                    name={field.name}
                    error={fieldState.error}
                    label={'Title '}></FormTextField>}/>
            <DialogActions>
                <Button onClick={() => setIsModalOpen(false)}>Close</Button>
                <Button onClick={handleSubmit(handleSave)}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};