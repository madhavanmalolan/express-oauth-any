const { Twitter } = require('./twitter');
module.exports.registerOauth = function(app, options){
    if(options.twitter){
    const twitter = new Twitter(options.twitter);
    console.log(twitter);
    app.get('/oauth-any/twitter/login', (req, res) => twitter.login(req, res));
    app.get('/oauth-any/twitter/callback', (req, res) => twitter.callback(req, res));
  }
}
