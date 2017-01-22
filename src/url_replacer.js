const path = require('path');

module.exports = ({str, abs = 0}) =>
    str.replace(/url\(['"]?([\w-_ ./]*\.[\w-_ ]*)['"]?\)/g, (m,file) =>
        `url("\$CMS_REF(media:"${path.parse(file).name.replace(/(-| |\.)/g, (m) => {
            switch(m) {
            case ' ':
            case '.':
                return '';
            case '-':
                return '_';
            }
        })}", abs: ${abs})$")`
);
