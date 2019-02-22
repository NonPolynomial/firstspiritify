const path = require('path');

module.exports = ({ str, abs = 0 }) =>
    str.replace(
        /url\(['"]?([\w-_ ./]*\.[\w-_ ]*)([?#a-zA-Z]*)['"]?\)/g,
        (matches, file, suffix) =>
            `url("$CMS_REF(media:"${path
                .parse(file)
                .name.replace(/(-| |\.)/g, (m) => {
                    switch (m) {
                    case ' ':
                    case '.':
                        return '';
                    case '-':
                        return '_';
                    default:
                        return '';
                    }
                })}", abs: ${abs})$${suffix}")`
    );
