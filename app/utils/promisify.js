/**
 * Created by thomasnatter on 10/19/16.
 */

import {readFile, writeFile} from 'fs';

export function readFilePromise(filename) {
  return new Promise(
      function (resolve, reject) {
        readFile(filename, { encoding: 'utf8' },
            (error, data) => {
              if (error) {
                reject(error);
              } else {
                resolve(data);
              }
            });
      });
}


export function writeFilePromise(filename, content) {
    return new Promise(
        function (resolve, reject) {
            writeFile(filename, JSON.stringify(content, null, 4),
                (error, data) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(data);
                    }
                });
        });
}
