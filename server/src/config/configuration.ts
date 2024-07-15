import { registerAs } from '@nestjs/config';
import {
  AppConfig,
  DatabaseConfig,
  GoogleAuthConfig,
  AWSConfig,
} from './config.interface';
import { ConfigKey } from './config.enum';

const APPConfig = registerAs(
  ConfigKey.App,
  () =>
    ({
      stage: process.env.STAGE,
      port: process.env.PORT || 4000,
      jwtSecret: process.env.JWT_SECRET,
      originsURL: process.env.ORIGINS_WHITELIST.split(' '),
      domainName: process.env.DOMAIN_NAME,
    }) as AppConfig,
);

const DBConfig = registerAs(
  ConfigKey.Database,
  () =>
    ({
      url: process.env.DB_URL,
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
    }) as DatabaseConfig,
);

const GOOGLEAuthConfig = registerAs(
  ConfigKey.GoogleAuth,
  () =>
    ({
      clientID: process.env.GOOGLE_CLIENT_ID,
      projectID: process.env.GOOGLE_PROJECT_ID,
      authURI: process.env.GOOGLE_AUTH_URI,
      tokenURI: process.env.GOOGLE_TOKEN_URI,
      authProviderX509CertURL: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: process.env.GOOGLE_SCOPE.split(' '),
    }) as GoogleAuthConfig,
);

const AWSConfig = registerAs(
  ConfigKey.AWS,
  () =>
    ({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
      bucketName: process.env.AWS_BUCKET_NAME,
      endpoint: process.env.AWS_ENDPOINT,
    }) as AWSConfig,
);
export const configurations = [
  APPConfig,
  DBConfig,
  GOOGLEAuthConfig,
  AWSConfig,
];
