import { readBsConfigSync } from 'read-bsconfig';

const getBsConfigModuleOptions = buildDir => {
  const bsconfig = readBsConfigSync(buildDir);

  if (!bsconfig) {
    throw new Error(`bsconfig not found in ${buildDir}`);
  }

  const bsSuffix = bsconfig.suffix;
  const suffix = typeof bsSuffix === 'string' ? bsSuffix : '.js';

  if (!bsconfig['package-specs'] || !bsconfig['package-specs'].length) {
    const options = {
      moduleDir: 'js',
      inSource: false,
      suffix,
    };
    return options;
  }

  const moduleSpec = bsconfig['package-specs'][0];
  const moduleDir =
    typeof moduleSpec === 'string' ? moduleSpec : moduleSpec.module;
  const inSource =
    typeof moduleSpec === 'string' ? false : moduleSpec['in-source'];

  const options = { moduleDir, inSource, suffix };
  return options;
};

export default getBsConfigModuleOptions;
