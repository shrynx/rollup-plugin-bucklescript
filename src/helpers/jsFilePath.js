import * as path from 'path';

const jsFilePath = (buildDir, moduleDir, resourcePath, inSource) => {
  const outputDir = 'lib';
  const fileNameRegex = /\.(ml|re)$/;

  const mlFileName = resourcePath.replace(buildDir, '');
  const jsFileName = mlFileName.replace(fileNameRegex, '.js');

  if (inSource) {
    return path.join(buildDir, jsFileName);
  }

  return path.join(buildDir, outputDir, moduleDir, jsFileName);
};

export default jsFilePath;
