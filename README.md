[![build status](https://secure.travis-ci.org/jprichardson/node-batchdir.png)](http://travis-ci.org/jprichardson/node-batchdir)

Node.js - batchdir
================

Batch create directories or delete them.


Why?
----

I got tired of checking whether a group of directories exist before I create or make them. Even worse, when you have to check three directories:

```javascript
var fs = require('fs')
  , mkdirp = require('mkdirp');

var dirs = ['/tmp/a', '/tmp/b', '/tmp/c'];
var i = 0;

function again(callback) {
  if (i < dirs.length) {
    fs.exists(dirs[i], function(itDoes) {
      if (!itDoes)
        fs.mkdir(dirs[i], function(err) {
          if (err) {
            callback(err); //<--- error return
          } else {
            i += 1;
            again(callback);
          }
        })
      else
        i += 1;
        again(callback);  
    });
  } else {
    callback(); //<--- done
  }
}

again(function(err){
  if (err) 
    console.log('We have an error.')
  else
    console.log('Done.');
});
```

Yuck.

Why not the following:

```javascript
var batchdir = require('batchdir');

var dirs = ['/tmp/a', '/tmp/b', '/tmp/c'];
batchdirs(dirs).mkdirs(function(err) {
  if (err) 
    console.log('We have an error.')
  else
    console.log('Done.');
})
```

Much cleaner.



Installation
------------

    npm install batchdir



Methods
-------

### batchdirs()

Contsructor function.

**Args:**

1. Array or strings.

```javascript
batchdirs(['d1', 'd2'])
//or
batchdirs('d1', 'd2')
```


### create() / mkdirs() / mkdir() / make()

Creates the directory(ies) if they don't exist. Will make full path like `mkdir -p`.

**Args:**

1. Callback function containing an `Error` object if one existed.

```javascript
batchdirs(dirs).create(function(err) { });
```


### remove() / delete() / rmrf() 

Deletes directory(ies) if they do exist. Will delete all of the contents like `rm -rf`.

**Args:**

1. Callback function containing an `Error` object if one existed.

```javascript
batchdirs(dirs).remove(function(err) { });
```



Author
------

JP Richardson ([@jprichardson](http://twitter.com/jprichardson)) read my coding blog [Procbits](http://procbits.com).

If you use Git with others, you should checkout [Gitpilot](http://gitpilot.com) to make collaboration with Git simple using a different GUI. We would love your feedback. 



License
-------

(MIT License)

Copyright 2012, JP Richardson  <jprichardson@gmail.com>


