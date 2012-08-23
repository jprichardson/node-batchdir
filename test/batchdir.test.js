var testutil = require('testutil')
  , assert = require('assert')
  , batchdir = require('../lib/batchdir')
  , fs = require('fs-extra')
  , path = require('path');

var TEST_DIR = ''

suite('batchdir')

beforeEach(function(done){
  TEST_DIR = testutil.generateTestPath('test-batchdir');
  fs.mkdir(TEST_DIR, done);
})


test('create()', function(done) {
  var dirs = [
    path.join(TEST_DIR, 'm1'),
    path.join(TEST_DIR, 'm2'),
    path.join(TEST_DIR, 'm2/fff')
  ];

  F (fs.existsSync(dirs[0]))
  F (fs.existsSync(dirs[1]))
  F (fs.existsSync(dirs[2]))

  batchdir(dirs).create (function(err) {
    F (err)
    T (fs.existsSync(dirs[0]))
    T (fs.existsSync(dirs[1]))
    T (fs.existsSync(dirs[2]))
    done()
  })

})

test('create() - with string args', function(done) {
  var dirs = [
    path.join(TEST_DIR, 'm3'),
    path.join(TEST_DIR, 'm4')
  ];

  F (fs.existsSync(dirs[0]))
  F (fs.existsSync(dirs[1]))
 
  var d1 = dirs[0];
  var d2 = dirs[1];

  batchdir(d1, d2).create (function(err) {
    F (err)
    T (fs.existsSync(d1))
    T (fs.existsSync(d2))
    done()
  })

})


test('remove()', function(done) {
  var dirs = [
    path.join(TEST_DIR, 'm5'),
    path.join(TEST_DIR, 'm6'),
    path.join(TEST_DIR, 'm7/fff')
  ];

  fs.mkdirSync(dirs[0])
  fs.mkdirSync(dirs[1])
  fs.mkdirSync(dirs[2])

  batchdir(dirs).remove (function(err) {
    F (err)
    F (fs.existsSync(dirs[0]))
    F (fs.existsSync(dirs[1]))
    F (fs.existsSync(dirs[2]))
    done()
  })

})
