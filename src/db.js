var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var userpass = process.env.lemongrassdb;
var url = 'mongodb://' + userpass + '@cluster0-shard-00-00-ylxse.mongodb.net:27017,cluster0-shard-00-01-ylxse.mongodb.net:27017,cluster0-shard-00-02-ylxse.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
var database = 'lemongrass-app';

// CONNECT
// -----------------------------------------------------------------------------

exports.testConnection = function() {
  MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
  
  	db.close();
  });
};

// INSERT 
// -----------------------------------------------------------------------------

var insertDocuments = function(db, callback) {
  var collection = db.collection('documents')
  collection.insertMany( [ {a : 1}, {a : 2}, {a : 3} ], function (err, result) {
    assert.equal(err, null);
    assert.equal(result.result.n, 3);
    assert.equal(result.ops.length, 3);
    console.log("Insert 3 docs");
    callback(result);
  });
};

exports.testInsert = function() {
  MongoClient.connect(url, function(err, client) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
    insertDocuments(client.db(database), function() {
  	  client.close();
    });
  });
};

// FIND 
// -----------------------------------------------------------------------------

var getAllDocuments = function(db, callback) {
  var collection = db.collection('documents')
  collection.find({}).toArray(function (err, result) {
    assert.equal(err, null);
    console.log(result);
    console.log("Retrieved docs");
    callback(result);
  });
};

exports.testFind = function() {
  MongoClient.connect(url, function(err, client) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
    getAllDocuments(client.db(database), function() {
  	  client.close();
    });
  });
};

// DELETE
// -----------------------------------------------------------------------------

var deleteDocument = function(db, callback) {
  var collection = db.collection('documents')
  collection.deleteOne({ a: 1 }, function (err, result) {
    assert.equal(err, null);
    assert.equal(result.result.n, 1);
    console.log("Deleted doc");
    callback(result);
  });
};

exports.testDelete = function() {
  MongoClient.connect(url, function(err, client) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
    deleteDocument(client.db(database), function() {
  	  client.close();
    });
  });
};

// INITIALISE 
// -----------------------------------------------------------------------------

exports.init = function() {
  MongoClient.connect(url, function(err, db) {
  	assert.equal(null, err);
  	console.log("Connected successfully to server");
  	db.close();
  });
};

