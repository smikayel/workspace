import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'

import styles from './index.module.css'
import CustomError from '../error';

export function SignIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleEmailTyping = (e: string) => {
        setEmail(e)
    }

    const handlePasswordChange = (e: string) => {
        setPassword(e)
    }

    const handleSignIn = () => {
        console.log('here should be something')
    }

    return (
        <div className={styles.signinContainer}>
            <h3>Login</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='example@gmail.com' value={email} onChange={handleEmailTyping}/> 
                <CustomInput placeholder='*********' value={password} type='password' onChange={handlePasswordChange}/> 
            </div>
            <CustomButton text="Sign In" onChange={handleSignIn} />
            <Link to='/sign-up' className={styles.NewUserRedirection}> New User? Register </Link>
        </div>
    )
}
