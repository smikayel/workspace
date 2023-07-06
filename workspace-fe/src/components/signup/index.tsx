import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';

import styles from './index.module.css'

export function SignUp () {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRePass] = useState('')
    const [error, setError] = useState('')

    const handleSignUp = () => {
        console.log('here should be something')
    }

    return (
        <div className={styles.signUpContainer}>
            <h3>SignUp</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='username' value={username} onChange={setUsername}/> 
                <CustomInput placeholder='example@gmail.com' value={email} onChange={setEmail}/> 
                <CustomInput placeholder='*********' value={password} type='password' onChange={setPassword}/> 
                <CustomInput placeholder='Reenter passowrd' value={rePass} type='password' onChange={setRePass}/> 
            </div>
            <CustomButton text="Sign Up" onClick={handleSignUp} />
            <Link to='/sign-in' className={styles.HaveAccountRedirection}> Have an Account? Login </Link>
        </div>
    )
}
