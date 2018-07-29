import * as path from 'path';

const jsFilePath = (buildDir, moduleDir, resourcePath, inSource, suffix) => {
  const outputDir = 'lib';
  const fileNameRegex = /\.(ml|re)$/;

  const mlFileName = resourcePath.replace(buildDir, '');
  const jsFileName = mlFileName.replace(fileNameRegex, suffix);

  if (inSource) {
    return path.join(buildDir, jsFileName);
  }

  return path.join(buildDir, outputDir, moduleDir, jsFileName);
};

export default jsFilePath;
