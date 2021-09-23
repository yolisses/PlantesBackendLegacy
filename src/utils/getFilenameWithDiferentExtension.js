export function getFileNameWithDiferentExtension(file, extension) {
  const pos = file.lastIndexOf('.');
  return `${file.substr(0, pos < 0 ? file.length : pos)}.${extension}`;
}
