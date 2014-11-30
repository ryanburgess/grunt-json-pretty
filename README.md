Grunt JSON Pretty
=================

Clean up the formatting of your JSON files.

## Getting Started

If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```sh
npm install grunt-json-pretty --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-json-pretty');
```

*Tip: the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) module makes it easier to load multiple grunt tasks.*

[grunt]: http://gruntjs.com
[Getting Started]: https://github.com/gruntjs/grunt/wiki/Getting-started


## Documentation

See the [Gruntfile](Gruntfile.js) in this repo for a full example.


### Example config

```js
grunt.initConfig({
  'json-pretty': {
      options: {
        files: 'content/',
        indent: 4,
        minify:true,
        append:'.min'
      },
   }
});

grunt.loadNpmTasks('grunt-json-pretty');
grunt.registerTask('default', ['json-pretty']);
```
### Options

#### files
Type: `String`
Default value: `content/`

A reference to a directory that contains JSON files.

#### indent
Type: `Number`
Default value: `4`

A number of tab spaces to use in the formatting of JSON files.

#### minify
Type: `Boolean`
Default value: `false`

Create a minified version of each JSON file.

#### append
Type: `String`
Default value: `'.min'`

Append to minified version of each JSON file.

## Release History
* 0.1.7: add release history notes to documentation.
* 0.1.6: small adjustments.
* 0.1.5 add the ability change appened string on minified JSON files.
* 0.1.4: display output for successful and failed files.
* 0.1.3: updates to documentation.
* 0.1.2: updates to documentation.
* 0.1.1: add the option to minify JSON files.
* 0.1.0: Initial release.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## License

MIT © [Ryan Burgess](http://ryanburgess.com)
