# grunt-sproc

A nice little grunt task that lets you run PostgreSQL SQL scripts.  This is mostly useful for keeping things like stored procedures with other code files, making them easy to keep in version control.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sproc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sproc');
```

## The "sproc" task

### Overview
In your project's Gruntfile, add a section named `sproc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sproc: {
    default: {
      options: {
        db: 'postgres://username:password@host.name/database'
      },
      files: [{
        src: 'sql/**/*.sql',
      }]
    },
  },
});
```

### Options

#### options.db
Type: `String`
Default value: `'.'`

The database connection string to be used to connect to PostgreSQL.

### Usage Examples

#### Default Options
In this example we run all the *.sql files that our glob matches.

```js
grunt.initConfig({
  sproc: {
    default: {
      options: {
        db: 'postgres://username:password@host.name/database'
      },
      files: [{
        src: 'sql/**/*.sql',
      }]
    },
  },
});
```

## Release History
_(Nothing yet)_
