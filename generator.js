'use strict';

var path = require('path');
var isValid = require('is-valid-app');

module.exports = function(app) {
  // returns false if `app` is not an instance of Generate, or `generate-travis` is already registered
  if (!isValid(app, 'generate-travis')) return;

  /**
   * Generates a `.travis.yml` file in the current working directory.
   *
   * ```sh
   * $ gen travis:travis-yml
   * ```
   * @name travis-yml
   * @api public
   */

  app.task('travis-yml', { silent: true }, function(cb) {
    return app.src('travis.yml', {cwd: path.resolve(__dirname, 'templates')})
      .pipe(app.dest(function(file) {
        file.basename = '.travis.yml';
        return app.options.dest || app.cwd;
      }));
  });

  /**
   * Alias to enable running the [travis-yml](#travis-yml) task with the following command:
   *
   * ```sh
   * $ gen travis
   * ```
   * @name default
   * @api public
   */

  app.task('default', { silent: true }, ['travis-yml']);
};