import { access, constants } from 'fs';
export const isFile = async (file: string) =>
  new Promise((resolve) => {
    access(file, constants.F_OK, (err) => {
      resolve(!err);
    });
  });
