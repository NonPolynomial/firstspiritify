module.exports = {
    command: 'multiple',
    describe: 'firstspiritify an array of files',
    builder: {
        sources: {
            alias: 's',
            describe: 'array of source files',
            type: 'string',
            array: true
        },
        dist: {
            alias: 'o',
            describe: 'decide if results should be written into file',
            type: 'boolean'
        },
        abs: {
            alias: 'a',
            describe: 'absolute level',
            default: 0,
            type: 'string'
        }
    }
};
