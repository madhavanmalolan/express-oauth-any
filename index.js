const { Twitter } = require('./twitter');
const { Google } = require('./google');
module.exports.registerOauth = function(app, options){
    console.log(options);
    if(options.twitter){
    const twitter = new Twitter(options.twitter);
    app.get('/oauth-any/twitter/login', (req, res) => twitter.login(req, res));
    app.get('/oauth-any/twitter/callback', (req, res) => twitter.callback(req, res));
  }
  if(options.google){
    const google = new Google(options.google);
    console.log(google)
    app.get('/oauth-any/google/login', (req, res) => google.login(req, res));
    app.get('/oauth-any/google/callback', (req, res) => google.callback(req, res));
  }
}
