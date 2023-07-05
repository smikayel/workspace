import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';

import styles from './index.module.css'

export function Workspace () {
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [error, setError] = useState('')


    const handleCreateWorkspace = () => {
        console.log('here should be something')
    }

    return (
        <div className={styles.WorkspaceContainer}>
            <h3>Login</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='Bee Weeb' value={name} onChange={setName}/> 
                <CustomInput placeholder='beeweeb' value={slug} type='password' onChange={setSlug}/> 
            </div>
            <CustomButton text="Sign In" onChange={handleCreateWorkspace} />
            <div>


            </div>
        </div>
    )
}
