import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';

import styles from './index.module.css'

export function SignIn () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    const handleSignIn = () => {
        console.log('here should be something')
    }

    return (
        <div className={styles.signinContainer}>
            <h3>Login</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='example@gmail.com' value={email} onChange={setEmail}/> 
                <CustomInput placeholder='*********' value={password} type='password' onChange={setPassword}/> 
            </div>
            <CustomButton text="Sign In" onChange={handleSignIn} />
            <Link to='/sign-up' className={styles.NewUserRedirection}> New User? Register </Link>
        </div>
    )
}
