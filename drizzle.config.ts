import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config()

export default {
  driver: 'pg',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL || '',
  },
} satisfies Config;
