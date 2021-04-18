const LoginWithTwitter = require('login-with-twitter');

module.exports.Twitter = class {
    constructor(options){
        this.options = options;
    }
    login(req, res, next) {
        console.log(req.protocol+"//"+req.get('host')+"/oauth-any/twitter/callback");
        if(!this.tw){
         this.tw = new LoginWithTwitter({
            consumerKey: this.options.key,
            consumerSecret: this.options.secret,
            callbackUrl: this.options.redirectUri || req.protocol+"://"+req.get('host')+"/oauth-any/twitter/callback"
          })
        }

        this.tw.login((err, tokenSecret, url) => {
            if (err) {
            }
            req.session.tokenSecret = tokenSecret
            req.session.oauthanytwitterstate = req.query.state
            res.redirect(url)
          })
        }
    
    callback(req, res, next){
        this.tw.callback({
            oauth_token: req.query.oauth_token,
            oauth_verifier: req.query.oauth_verifier
          }, req.session.tokenSecret, (err, user) => {
            if (err) {
                console.log("error", err);
            }
            console.log(req.session.oauthanytwitterstate);
            delete req.session.tokenSecret
            req.session.twitter = { id: user.userId, name: user.userName, email: user.email };            
            res.redirect(req.session.oauthanytwitterstate)
            delete req.session.oauthanytwitterstate
          });
        
    }

}