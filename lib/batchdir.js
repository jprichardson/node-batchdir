var fs = require('fs-extra')
  , batch = require('batchflow');

function BatchDir(dirs) {
  this.dirs = dirs;
}

BatchDir.prototype.create = function(callback) {
  var self = this;
  mapDirsExist(this.dirs, function(dirsExist) {
    batch(dirsExist).parallel()
      .each(function(i, item, done) {
        if (item) done(null);
        else fs.mkdir(self.dirs[i], done);
      })
      .error(callback)
      .end(function() {
        callback(null);
      })

  })

}

BatchDir.prototype.remove = function(callback) {
  var self = this;
  mapDirsExist(this.dirs, function(dirsExist) {
    batch(dirsExist).parallel()
      .each(function(i, item, done) {
        if (item) fs.remove(self.dirs[i], done);
        else done(null);
      })
      .error(callback)
      .end(function() {
        callback(null);
      })

  })

};

BatchDir.prototype.mkdirs = BatchDir.prototype.create;
BatchDir.prototype.make = BatchDir.prototype.create;
BatchDir.prototype.mkdir = BatchDir.prototype.create;
BatchDir.prototype.delete = BatchDir.prototype.remove;
BatchDir.prototype.rmrf = BatchDir.prototype.remove;


module.exports = function batchdir(dirs) {
  if (arguments.length === 1)
    return new BatchDir(dirs);
  else
    return new BatchDir(Array.prototype.slice.call(arguments, 0));
}

//PRIVATE METHODS

function mapDirsExist(dirs, callback) {
  batch(dirs).parallel()
    .each(function(i, item, done) {
      fs.exists(item, done);
    })
    .error(callback)
    .end(callback);
}