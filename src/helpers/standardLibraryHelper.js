import { dirname } from 'path';
import fs from 'fs';
import nodeResolve from 'resolve';

export const isStandardLibrary = id => {
  const runTimeLib = 'bs-platform/lib';
  return id.substr(0, runTimeLib.length) === runTimeLib;
};

export const resolveStandardLibrary = (id, importer) => {
  return new Promise((resolve, reject) => {
    nodeResolve(id, { basedir: dirname(importer) }, (err, resolved) => {
      if (!err) {
        if (resolved && fs.existsSync(resolved)) {
          resolve(fs.realpathSync(resolved));
        }
      } else {
        reject(err);
      }
    });
  });
};
