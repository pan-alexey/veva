import * as fs from 'fs';
import * as path from 'path';

export const resolve = path.resolve;
export const rootPath = fs.realpathSync(process.cwd());
export const resolvePath = (relativePath: string): string => path.resolve(rootPath, relativePath);
