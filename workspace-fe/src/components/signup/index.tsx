import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';
import AuthService from "../../services/auth.service";
import { AxiosError } from 'axios';
import { requestError } from '../signin';
import { useNavigate  } from 'react-router-dom';

import styles from './index.module.css'

export function SignUp () {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePass, setRePass] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async () => {
        try {
            if (password != rePass) {
                setError('passowrd and reentered password are different')
                return
            }
            const registeredUser = await AuthService.register(username, email, password)
            if (registeredUser) {
                navigate('/sign-in')
            }
        } catch (err) {
            const data = (err as AxiosError).response?.data as requestError
            setError(data.error || data.message)
        }
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
