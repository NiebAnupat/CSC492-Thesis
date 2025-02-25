export interface AppConfig {
  stage: string;
  port: number;
  jwtSecret: string;
  encodeSecret: string;
  originsURL: string[];
  domainName: string;
}

export interface DatabaseConfig {
  url: string;
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
}

export interface GoogleAuthConfig {
  clientID: string;
  projectID: string;
  authURI: string;
  tokenURI: string;
  authProviderX509CertURL: string;
  clientSecret: string;
  callbackURL: string;
  scope: string[];
}

export interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
  endpoint: string;
}
