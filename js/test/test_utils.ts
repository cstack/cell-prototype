/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';

function bufferFile(relPath) {
  return fs.readFileSync(path.join(__dirname, relPath), "utf-8"); // zzzz....
}

export {
  bufferFile
};