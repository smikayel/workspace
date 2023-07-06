import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';
import AuthService from "../../services/auth.service";
import { useNavigate  } from 'react-router-dom';
import { AxiosError } from 'axios';

import styles from './index.module.css'

export interface requestError {
    error?: string
    message: string
}

export function SignIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleSignIn = async () => {

        try {
            const authResponse = await AuthService.login(email, password);
            console.log(authResponse)
            if (authResponse) {
                console.log('asd')
                navigate('/');
            }
        } catch (err) {
            const data = (err as AxiosError).response?.data as requestError
            setError(data.error || data.message)
        }

    }

    return (
        <div className={styles.signinContainer}>
            <h3>Login</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='example@gmail.com' value={email} onChange={setEmail}/> 
                <CustomInput placeholder='*********' value={password} type='password' onChange={setPassword}/> 
            </div>
            <CustomButton text="Sign In" onClick={handleSignIn} />
            <Link to='/sign-up' className={styles.NewUserRedirection}> New User? Register </Link>
        </div>
    )
}
