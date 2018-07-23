var mongoose = require('mongoose');
var dburl = "mongodb://localhost:27017/meanrestaurants";
var retry = null;

mongoose.connect(dburl);

mongoose.connection.on('connected',function(){
  console.log("Mongoose connected to " +dburl);
});


mongoose.connection.on('disconnected',function(){
  console.log("Mongoose disconnected to " +dburl);
});

mongoose.connection.on('error',function(err){
    console.log("Error in connection :" +err);
});

// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}


// For app termination
process.on('SIGINT',function(){
    mongoose.connection.close(function(){
        console.log("Mongoose disconnected through app termination(SIGINT)");
        process.exit(0);
    });
});

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// For heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});


require('./restaurant.model.js');
require('./users.model.js');
