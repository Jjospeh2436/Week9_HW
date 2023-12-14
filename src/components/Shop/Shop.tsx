import * as _React from 'react'; 
import { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    Stack,
    Typography,
    Snackbar,
    Alert } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGetShop, ShopProps } from '../../customHooks';
import { NavBar, InputText } from '../sharedComponents';
import { theme } from '../../Theme/themes';
import { MessageType } from '../Auth';

export const shopStyles = {
    main: {
        backgroundColor: theme.palette.secondary.main,
        height: '100%',
        width: '100%',
        color: 'white',
        backgroundSize: 'cover',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed',
        position: 'absolute',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    grid: {
        marginTop: '25px', 
        marginRight: 'auto', 
        marginLeft: 'auto', 
        width: '70vw'
    },
    card: {
        width: "300px", 
        padding: '10px',
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.secondary.light,
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    cardMedia: {
        width: '95%',
        margin: 'auto',
        marginTop: '5px',
        aspectRatio: '1/1',
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '10px'
    },
    button: {
        color: 'white', 
        borderRadius: '50px',
        height: '45px',
        width: '250px',
        marginTop: '10px'
    },
    stack: {
        width: '75%', 
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
    stack2: {
        border: '1px solid', 
        borderColor: theme.palette.primary.main, 
        borderRadius: '50px', 
        width: '100%',
        marginTop: '10px'
    },
    typography: { 
        marginLeft: '15vw', 
        color: "white", 
        marginTop: '100px'
    }

}

export const Shop = () => {
    // setup our hooks
    const { shopData } = useGetShop();
    const [ currentShop, setCurrentShop] = useState<ShopProps>();
    const [ cartOpen, setCartOpen ] = useState(false); 

    console.log(shopData)
    return (
        <Box sx={ shopStyles.main }>
            <NavBar />
            <Typography 
                variant = 'h4'
                sx = { shopStyles.typography }
                >
                The Shop
            </Typography>
            <Grid container spacing={3} sx={shopStyles.grid}>
                {shopData.map((shop: ShopProps, index: number ) => (
                    <Grid item key={index} xs={12} md={6} lg={4}>
                        <Card sx={shopStyles.card}>
                            <CardMedia 
                                component='img'
                                sx={shopStyles.cardMedia}
                                image={shop.image}
                                alt={shop.name}
                            />
                            <CardContent>
                                <Stack 
                                    direction='column'
                                    justifyContent='space-between'
                                    alignItems = 'center'
                                >
                                    <Stack 
                                        direction = 'row'
                                        alignItems = 'center'
                                        justifyContent = 'space-between'
                                    >
                                        <Accordion sx={{ color: 'white', backgroundColor: theme.palette.secondary.light }}>
                                            <AccordionSummary 
                                                expandIcon={<InfoIcon sx={{ color: theme.palette.primary.main }}/>}
                                            >
                                                <Typography>{shop.name}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>{shop.description}</Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Stack>
                                <Button
                                    size='medium'
                                    variant='outlined'
                                    sx={shopStyles.button}
                                    onClick = {()=>{}}
                                >
                                    Add to Cart - ${parseFloat(shop.price).toFixed(2)}
                                </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Box>
    )
}