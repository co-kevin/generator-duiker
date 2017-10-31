const Generator = require('yeoman-generator')
const _string = require('lodash/string')

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
  }

  run () {
    console.log('// TODO generate entity')
  }
}