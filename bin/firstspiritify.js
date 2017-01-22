#!/usr/bin/env node
const yargs = require('yargs');
const firstspiritify = require('../index.js');

const handler = ({file, dist, source, content}) => {
    if(dist) {
        console.log(`The result of source "${source}" was written to "${file}".`);
    } else {
        console.log(
`Result of "${source}":
${content}
`
        );
    }
};

const argv = yargs
  .command(require('./cmds/multiple.js'))
  .option('source', {
      alias: 's',
      describe: 'source file',
      required: true,
      type: 'string'
  })
  .option('dist', {
      alias: 'o',
      describe: `decide if results should be written into file
if "dist" is a string, it will be used as filename`
  })
  .option('abs', {
      alias: 'a',
      describe: 'absolute level',
      default: 0,
      type: 'string'
  })
  .help()
  .version()
  .argv;

if(argv._.length === 0) {
    firstspiritify(argv).then(handler);
} else if(argv._[0] === 'multiple') {
    Promise
        .all(argv.sources.reduce((carry, source) =>
            [].concat(carry, firstspiritify({
                source,
                dist: argv.dist,
                abs: argv.abs
            })),
        []))
        .then((results) => {
            results.forEach((result) => {
                handler(result);
            });
        })
    ;
}
