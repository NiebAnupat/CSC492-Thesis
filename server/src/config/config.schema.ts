import * as Joi from 'joi';

// type DatabaseType = "mysql" | "postgres" | "cockroachdb" | "sap" | "mariadb" | "sqlite" | "cordova" | "react-native" | "nativescript" | "sqljs" | "oracle" | "mssql" | "mongodb" | "aurora-mysql" | "aurora-postgres" | "expo" | "better-sqlite3" | "capacitor" | "spanner";
export const DatabaseType = [
  'mysql',
  'postgres',
  'cockroachdb',
  'sap',
  'mariadb',
  'sqlite',
  'cordova',
  'react-native',
  'nativescript',
  'sqljs',
  'oracle',
  'mssql',
  'mongodb',
  'aurora-mysql',
  'aurora-postgres',
  'expo',
  'better-sqlite3',
  'capacitor',
  'spanner',
] as const;
// type DatabaseType = (typeof DatabaseType)[number];
const databaseTypeSchema = Joi.string()
  .valid(...DatabaseType)
  .required();

export const configSchema = Joi.object({
  // App Config -----------------------------------
  STAGE: Joi.string()
    .valid('development', 'production', 'test')
    .error(
      new Error(
        'NODE_ENV must be one of "development", "production" or "test"',
      ),
    ),
  PORT: Joi.number().positive().max(65535).default(4000),
  JWT_SECRET: Joi.string().required(),
  ORIGINS_WHITELIST: Joi.string().required(),
  DOMAIN_NAME: Joi.string().required(),
  // Database Config ------------------------------
  DATABASE_URL: Joi.string().uri().optional(),
  DB_TYPE: databaseTypeSchema,
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().positive().max(65535).default(5432),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  DB_SCHEMA: Joi.string().optional(),
  DB_SYNCHRONIZE: Joi.boolean().default(false),
  // Google Auth Config ---------------------------
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_PROJECT_ID: Joi.string().required(),
  GOOGLE_AUTH_URI: Joi.string().uri().required(),
  GOOGLE_TOKEN_URI: Joi.string().uri().required(),
  GOOGLE_AUTH_PROVIDER_X509_CERT_URL: Joi.string().uri().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),
  GOOGLE_CALLBACK_URL: Joi.string().uri().required(),
  GOOGLE_SCOPE: Joi.string().required(),
}).required();
