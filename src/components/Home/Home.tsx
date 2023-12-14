import * as _React from 'react';
import { styled } from '@mui/system'; 
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 

import shopImage from '../../assets/images/shop.jpg'; 
import { NavBar } from '../sharedComponents/NavBar';

interface Props {
    title: string
}

const Root = styled('div')({
    padding: 0,
    margin: 0
})

const Main = styled('main')({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(https://silverbackautomotive.com/wp-content/uploads/2017/09/best-car-dealerships-1227x800.jpg);`,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 5px', 
    position: 'absolute',
    marginTop: '10px'
})

const MainText = styled('div')({
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
})


export const Home = (props: Props) => {

    return (
        <Root>
            <NavBar />
            <Main>
                <MainText>
                    <Typography variant='h3'> { props.title }</Typography>
                    <Button sx={{ marginTop: '10px'}} component={Link} to={"/shop"} variant='contained'>Purchase a nice Car</Button>
                </MainText>
            </Main>
        </Root>
    )
}