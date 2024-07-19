export type FileResponse = {
  Metadata: Metadata;
  Body: Uint8Array;
};

interface Metadata {
  ContentType: string;
  ContentLength: number;
}
