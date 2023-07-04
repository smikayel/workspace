/**
 * Environments variables declared here.
 */

import dotenv from 'dotenv'

dotenv.config()

export default {
	NodeEnv: process.env.NODE_ENV ?? '',
	Port: process.env.PORT ?? 0,
	Jwt: {
		Secret: process.env.JWT_SECRET ?? 'super secret',
		Exp: '1h',
	},
	Database: {
		databaseName: process.env.DATABASE_NAME ?? 'hearst',
		host: process.env.DATABASE_HOST ?? 'localhost',
		databasePort: process.env.DATABASE_PORT ?? 5432,
		username: process.env.DATABASE_USERNAME ?? 'username',
		password: process.env.DATABASE_PASSWORD ?? 'password',
	},
	Cron: {
		TimeInterval: process.env.CRON_TIME_INTERVAL ?? 30,
	},
	BigQuery: {
		projectId: process.env.GOOGLE_CLOUD_PROJECT ?? 'hearst-corporation',
	},
} as const
