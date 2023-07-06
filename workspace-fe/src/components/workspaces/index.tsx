import { useEffect, useRef, useState } from 'react';
import CustomInput from '../input';
import CustomButton from '../button';
import CustomError from '../error';
import workspaceService from '../../services/workspace.service';

import styles from './index.module.css';

interface WorkspaceI {
  id: string;
  name: string;
  slug: string;
}

export function Workspace() {
  const [name, setName] = useState('');
  const slug = useRef<string | undefined>()
  const [workspaces, setWorkspaces] = useState<WorkspaceI[]>([]);
  const [suggession, setSuggession] = useState('');
  const [debounceTimerId, setDebounceTimerId] = useState<NodeJS.Timeout | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const getWorkspaces = async () => {
      try {
        const workspaces = await workspaceService.getAllWorkspaces();
        setWorkspaces(workspaces.data?.workspaces);
      } catch (err) {
        setError((err as Error)?.message);
      }
    };

    getWorkspaces();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(debounceTimerId as NodeJS.Timeout);
    };
  }, [slug.current]);

  const handleCreateWorkspace = async () => {
    try {
        if (!slug.current) return
        const createdWorkspace = await workspaceService.create(name, slug.current)
        setWorkspaces((oldState) => [createdWorkspace.data, ...oldState])
    } catch (err) {
        setError((err as Error)?.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await workspaceService.delete(id);
      const filteredWorkspaces = workspaces.filter((item) => item.id !== id);
      setWorkspaces(filteredWorkspaces);
    } catch (err) {
      setError((err as Error)?.message);
    }
  };

  const checkSlug = async () => {
    try {
      if (!slug.current) return
      const checkongResponse = await workspaceService.checkSlug(slug.current);
      if (checkongResponse.data?.suggestion) {
        setSuggession(checkongResponse.data.suggestion);
      } else {
        setSuggession('Slug is available');
      }
    } catch (err) {
      console.log(err);
      setSuggession('Something went wrong, try again');
    }
  };  

  const debounce = (func: () => void, delay: number) => {
    debounceTimerId !== null && clearTimeout(debounceTimerId);
    const timerId = setTimeout(func, delay)
    setDebounceTimerId(timerId);
  };

  const handleChangeSlug = (newSlug: string) => {
    slug.current = newSlug
    debounce(checkSlug, 350);
  };

  return (
    <div className={styles.WorkspaceContainer}>
      <h3>Create Workspace</h3>
      {error && <CustomError errorMessage={error} />}
      <div className={styles.InputsContainer}>
        <CustomInput placeholder="name: Bee Weeb" value={name} onChange={setName} />
        {suggession && (
          <div className={styles.warrning}>
            {suggession}
          </div>
        )}
        <CustomInput placeholder="slug: beeweeb" value={slug.current} onChange={handleChangeSlug} />
      </div>
      <CustomButton
        text="Create Workspace"
        onClick={handleCreateWorkspace}
        customStyles={{ background: 'green' }}
      />
      <h3>Your Workspaces</h3>
      <div>
        <div className={styles.WorkspacesInfo}>
          Count of Workspaces: {workspaces.length}
        </div>
        {workspaces.map((workspace) => (
          <div className={styles.EachWorkspace} key={workspace.id}>
            <p>name: {workspace.name}</p>
            <p>|</p>
            <p>slug: {workspace.slug}</p>
            <CustomButton
              text='delete'
              onClick={() => handleDelete(workspace.id)}
              customStyles={{ background: 'red' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
