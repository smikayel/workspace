import EnvVars from '../../constants/EnvVars';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: EnvVars.Database.host,
	port: +EnvVars.Database.databasePort,
	username: EnvVars.Database.username,
	password: EnvVars.Database.password,
	database: EnvVars.Database.databaseName,
	synchronize: false,
	logging: false,
	migrations: ['dist/repos/migrations/*.js', 'src/repos/migrations/*.ts'],
	entities: ['dist/repos/entities/*.js', 'src/repos/entities/*.ts'],
});
