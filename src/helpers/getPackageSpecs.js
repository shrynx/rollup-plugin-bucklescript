const getPackageSpecs = packageSpecs => {
  const defaults = {
    moduleDir: 'es6',
    inSource: false,
  };

  if (!packageSpecs) {
    return defaults;
  }

  if (Array.isArray(packageSpecs) && packageSpecs.length === 0) {
    return defaults;
  }

  const moduleSpec = Array.isArray(packageSpecs)
    ? packageSpecs[0]
    : packageSpecs;
  const moduleDir =
    typeof moduleSpec === 'string' ? moduleSpec : moduleSpec.module;
  const inSource =
    typeof moduleSpec === 'string' ? false : moduleSpec['in-source'];

  return { moduleDir, inSource };
};

export default getPackageSpecs;
