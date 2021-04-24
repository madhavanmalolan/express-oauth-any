# Express OAuth Any
OAuth implementations for most popular OAuth providers 

# Supported OAuth Providers
Implemented : 
- Twitter
- Google

Coming soon (Help requested) :
- GitHub
- Facebook
- Microsoft
- Apple
- Amazon
- LinkedIn

## Installation
### Dependencies
express and express-session
### Install
`$ npm install express-oauth-any`

Add the following to app.js

```
  var { registerOauth } = require('express-oauth-any');
  app.use(session({ secret: "yoursecret"}))
  registerOauth(app, options);
```

### Options
Options should include the platforms for which you need oauth enabled
```
  options = {
      twitter: {
          key: "YOUR CONSUMER KEY", 
          secret: "YOUR CONSUMER SECRET"
      }
  }
```

## Usage
Once installed, call the following url to invoke the login process 
```<a href="/oauth-any/twitter/login?state=/profile"> Login with Twitter </a>```

Once the login is successful, user will be redirected to the url determined by `state` and login information will be available in `req.session[PLAFTOMRM]`, e.g. `req.session.twitter` 

You can replace "twitter" with "google" in the above example for login using Google

### Twitter
```
  options = {
      twitter: {
          key: "YOUR CONSUMER KEY", 
          secret: "YOUR CONSUMER SECRET"
      }
  }
```

Get your Consumer Key and Consumer Secret on [developers.twitter.com](developers.twitter.com)
```
http://localhost:<PORT>/oauth-any/twitter/callback
https://yourdomainname.com/oauth-any/twitter/callback
```

### Google
```
  options = {
      google: {
          key: "Your Client Id", 
          secret: "Your Client Secret"
      }
  }
```
Get your Consumer Key and Consumer Secret on [https://console.cloud.google.com/apis/credential](https://console.cloud.google.com/apis/credential)

Create an OAuth Client ID
Set callback urls as
```
http://localhost:<PORT>/oauth-any/google/callback
https://yourdomainname.com/oauth-any/google/callback
```




## Requested help
Please help me implement the various [OAuth Providers listed here](https://en.wikipedia.org/wiki/List_of_OAuth_providers) so that others don't have to
