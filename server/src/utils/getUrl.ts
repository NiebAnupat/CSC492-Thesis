export const getUrl = (url: string): string => {
  // remove /api from url
  //   return url.replace('/api/branch', '');
  return url.replace('/api', '');
};
