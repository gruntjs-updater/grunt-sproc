/*
 * grunt-sproc
 * 
 *
 * Copyright (c) 2015 Joe Mills
 * Licensed under the MIT license.
 */

'use strict';

var pg = require('pg');
var async = require('async');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sproc', 'Run sproc definitions on change.', function() {
    var taskComplete = this.async();
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    var fns = [];

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        var query = grunt.file.read(filepath);

        fns.push(function(query, filepath) {
          return function(cb) {
            pg.connect(options.db, function(err, pgClient, release) {
              if(err) return grunt.log.error("Could not connect to the database");
              //grunt.log.write("Running " + filepath + "\n");
              pgClient.query(query, [], function(err, data) {
                release();
                //grunt.log.write(">> " + filepath + " complete\n\n");
                cb(err, data);
              });
            });
          };
        }(query, filepath));
      });

      async.series(fns, function(err, results) {
        //if(err) grunt.fail(err.error);
        if(err) {
          console.log(err);
          return taskComplete(err);
        }
        grunt.log.write("Updated " + fns.length + " stored procedures");
        taskComplete();
      });
    });
  });

};
