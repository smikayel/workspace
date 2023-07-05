import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { AppDataSource } from './repos/database/config';
import { User } from './repos/entities/User';
import { Workspace } from './repos/entities/Workspace';

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

export const userRepository = AppDataSource.getRepository(User);
export const workspaceRepository = AppDataSource.getRepository(Workspace);

const start = async () => {

  await AppDataSource.initialize();
  logger.info('Database connected!');
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
};

// **** Run **** //
start();
