import { readBsConfigSync } from 'read-bsconfig';
import getPackageSpecs from './getPackageSpecs';

const getBsConfigModuleOptions = buildDir => {
  const bsconfig = readBsConfigSync(buildDir);

  if (!bsconfig) {
    throw new Error(`bsconfig not found in ${buildDir}`);
  }

  const bsSuffix = bsconfig.suffix;
  const suffix = typeof bsSuffix === 'string' ? bsSuffix : '.js';
  const { moduleDir, inSource } = getPackageSpecs(bsconfig['package-specs']);

  const options = { moduleDir, inSource, suffix };
  return options;
};

export default getBsConfigModuleOptions;
