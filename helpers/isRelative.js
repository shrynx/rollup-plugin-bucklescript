const isRelative = url => {
  const parts = url.split(/[\/\\]/).shift();
  if (parts[0] === '.') {
    return true;
  }
  return false;
};

export default isRelative;
