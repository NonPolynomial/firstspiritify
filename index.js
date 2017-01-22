const path = require('path');
const fs = require('./src/fs-promise-wrapper.js');
const urlReplacer = require('./src/url_replacer.js');

module.exports = ({source, dist, abs = 0}) =>
    fs.readFile({file: source})
        .then((data) => {
            const result = urlReplacer({str: data, abs});
            return result;
        })
        .then((content) => {
            let distFile;
            if(!dist) {
                return {
                    file: null,
                    content,
                    source,
                    dist
                };
            }
            if(typeof dist === 'string') {
                distFile = dist;
            } else {
                const parsedDist = path.parse(source);
                distFile = path.resolve(parsedDist.dir, `${parsedDist.name}.fs${parsedDist.ext}`);
            }
            return fs.writeFile({
                file: distFile,
                content
            });
        }).then(({file, content}) => ({
            file,
            content,
            source,
            dist
        }))
        .catch((err) => {
            console.error(err);
        })
    ;
