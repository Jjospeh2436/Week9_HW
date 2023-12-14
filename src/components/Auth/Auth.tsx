import * as _React from 'react';
import { useState } from 'react'; 
import {useSignInWithGoogle } from 'react-firebase-hooks/auth'; 
import {
    onAuthStateChanged,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword 
} from 'firebase/auth'; 
import { SubmitHandler, useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom'; 
import {
    Box,
    Button,
    Typography,
    Snackbar, 
    Stack,
    Divider,
    CircularProgress, 
    Dialog,
    DialogContent,
    Alert } from '@mui/material' 



import { NavBar, InputText, InputPassword } from '../sharedComponents'




const authStyles = {
    main: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .3), rgba(0, 0, 0, .5)), url(data:image/jpeg;base64,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);`,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center top 5px', 
        position: 'absolute',
        marginTop: '10px'
    },
    stack: {
        width: '400px',
        marginTop: '100px',
        marginRight: 'auto', 
        marginLeft: 'auto',
        color: 'white'
    },
    button: {
        width: '175px',
        fontSize: '14px'
    }
}



interface Props {
    title: string
}


interface ButtonProps {
    open: boolean 
    onClick: () => void
}


interface SubmitProps {
    email: string
    password: string 
}


export type MessageType = 'error' | 'warning' | 'info' | 'success'



// create a google button component
const GoogleButton = (_props: ButtonProps ) => {
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()
    const auth = getAuth()
    const  [ signInWithGoogle, _user, loading, error ] = useSignInWithGoogle(auth)


    const signIn = async () => {
        await signInWithGoogle()
        localStorage.setItem('auth', 'true')  
        onAuthStateChanged(auth, (user) => {

            if (user) {
                localStorage.setItem('user', user.email || "")
                localStorage.setItem('uuid', user.uid || "") 
                setMessage(`Successfully logged in ${user.email}`)
                setMessageType('success')
                setOpen(true)
                setTimeout(() => {navigate('/shop')}, 2000)
            }
        })

        if (error) {
            setMessage(error.message)
            setMessageType('error')
            setOpen(true)
        }

        if (loading) {
            return <CircularProgress />
        }

    }

    return (
        <Box>
            <Button
                variant = 'contained'
                color = 'info'
                size = 'large'
                sx = { authStyles.button }
                onClick = { signIn }
            >
                Sign In With Google
            </Button>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}


const SignIn = () => {
    // setup our hooks
    const [ open, setOpen ] = useState(false)
    const [ message, setMessage ] = useState<string>()
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()  
    const auth = getAuth() 
    const { register, handleSubmit } = useForm<SubmitProps>({})


    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault();


        signInWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {
            localStorage.setItem('auth', 'true') 
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('user', user.email || "") 
                    localStorage.setItem('uuid', user.uid || "")
                    setMessage(`Successfully logged in ${user.email}`)
                    setMessageType('success')
                    setOpen(true)
                    
                    setTimeout(() => {navigate('/shop')}, 2000) 
                }
            } )
        })
        .catch((error) => {
            const errorMessage = error.message 
            setMessage(errorMessage)
            setMessageType('error')
            setOpen(true)
        })

    }
    
    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign In</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}



const SignUp = () => {
    // setup our hooks
    const [ open, setOpen ] = useState(false) 
    const [ message, setMessage ] = useState<string>() 
    const [ messageType, setMessageType ] = useState<MessageType>()
    const navigate = useNavigate()  
    const auth = getAuth() 
    const { register, handleSubmit } = useForm<SubmitProps>({})


    const onSubmit:SubmitHandler<SubmitProps> = async (data, event) => {
        if (event) event.preventDefault(); 


        createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((_userCredential) => {
            localStorage.setItem('auth', 'true')
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    localStorage.setItem('user', user.email || "")
                    localStorage.setItem('uuid', user.uid || "")
                    setMessage(`Successfully logged in ${user.email}`)
                    setMessageType('success')
                    setOpen(true)
                    setTimeout(() => {navigate('/shop')}, 2000)
                }
            } )
        })
        .catch((error) => {
            const errorMessage = error.message 
            setMessage(errorMessage)
            setMessageType('error')
            setOpen(true)
        })

    }
    
    return (
        <Box>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <Typography variant='h6'>Sign Up for Free!</Typography>
                <Box>
                    <label htmlFor='email'></label>
                    <InputText {...register('email')} name='email' placeholder='Email' />
                    <label htmlFor='password'></label>
                    <InputPassword {...register('password')} name='password' placeholder='Password must be 6 characters or longer' />
                </Box>
                <Button type='submit'>Submit</Button>
            </form>
            <Snackbar
                open = {open}
                autoHideDuration={2000}
                onClose = { () => setOpen(false) }
            >
                <Alert severity = {messageType}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    )

}




export const Auth = (props:Props) => {
    const [open, setOpen] = useState(false)
    const [ signType, setSignType ] = useState<string>()



    return (
        <Box>
            <NavBar />
            <Box sx={ authStyles.main}>
                <Stack direction = 'column' alignItems = 'center' textAlign = 'center' sx={authStyles.stack}>
                    <Typography variant='h2' sx={{color: 'white'}}>
                        {props.title}
                    </Typography>
                    <br />
                    <Typography variant='h5'>
                        Track your Cars
                    </Typography>
                    <br />
                    <GoogleButton open={open} onClick={() => setOpen(false)} />
                    <Divider variant = 'fullWidth' color = 'white' />
                    <br />
                    <Stack 
                        width = '100%'
                        alignItems = 'center'
                        justifyContent = 'space-between'
                        direction = 'row'
                    >
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signin')}}
                        >
                            Email Login
                        </Button>
                        <Button 
                            variant = 'contained'
                            color = 'primary'
                            size = 'large'
                            sx = { authStyles.button}
                            onClick = { () => { setOpen(true); setSignType('signup')}}
                        >
                            Email Signup
                        </Button>
                    </Stack>
                </Stack>
                <Dialog open={open} onClose = {() => setOpen(false)}>
                    <DialogContent>
                        { signType === 'signin' ? <SignIn /> : <SignUp />}
                    </DialogContent>
                </Dialog>
            </Box>
        </Box>
    )

}