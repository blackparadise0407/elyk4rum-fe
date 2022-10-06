export const extractFileName = (fileName?: string) => {
  if (!fileName) return [];
  const lastIdxOfDot = fileName.lastIndexOf('.');
  return [
    fileName.substring(0, lastIdxOfDot),
    fileName.substring(lastIdxOfDot + 1, fileName.length),
  ];
};
