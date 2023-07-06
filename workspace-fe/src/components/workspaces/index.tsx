import { useState } from 'react'
import { Link } from 'react-router-dom';
import CustomInput from '../input'
import CustomButton from '../button'
import CustomError from '../error';

import styles from './index.module.css'

export function Workspace () {
    const [name, setName] = useState('')
    const [slug, setSlug] = useState('')
    const [workspaces, setWorkspaces] = useState([])

    const [error, setError] = useState('')


    const handleCreateWorkspace = () => {
        console.log('here should be something')
    }

    return (
        <div className={styles.WorkspaceContainer}>
            <h3>Create Workspace</h3>
            {error && <CustomError errorMessage={error} />}
            <div className={styles.InputsContainer}>
                <CustomInput placeholder='name: Bee Weeb' value={name} onChange={setName}/> 
                <CustomInput placeholder='slug: beeweeb' value={slug} type='password' onChange={setSlug}/> 
            </div>
            <CustomButton text="Create Workspace" onClick={handleCreateWorkspace} customStyles={{background:'green'}}/>
            <h3>Your Workspaces</h3>
            <div>
                <div className={styles.WorkspacesInfo}>
                    Count of Workspaces: {workspaces.length}
                </div>
            </div>
        </div>
    )
}
