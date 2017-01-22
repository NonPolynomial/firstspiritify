const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = {
    readFile({file, options: opts = {encoding: 'utf8', flag: 'r'}}) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, opts, (err,data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },
    writeFile({file, content, options: opts = {encoding: 'utf8', mode: 0777}, append = false}) {
        const fn = append ? 'appendFile' : 'writeFile';
        return new Promise((resolve,reject) => {
            mkdirp(path.parse(file).dir, (err, made) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(new Promise((resolve,reject) => {
                        fs[fn](file, content, opts.encoding, (err) => {
                            if(err) {
                                reject(err);
                            } else {
                                resolve({
                                    file,
                                    content
                                });
                            }
                        });
                    }));
                }
            });
        });
    }
};
