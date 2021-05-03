const axios = require('axios');
const fetch = require('node-fetch');

module.exports.GitHub = class {
    constructor(options){
        this.options = options;
    }
    
    login(req, res, next) {
    const url = "https://github.com/login/oauth/authorize?client_id=" + this.options.key + "&scope=" + (this.options.scope ? this.options.scope : "") + "&state=" + req.query.state
	res.redirect(url)
    }
    
    async callback(req, res, next){
        const response = await fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: this.options.key,
                client_secret: this.options.secret,
                code: req.query.code
            })
        })
        const data = await response.text();
        const params = new URLSearchParams(data);
        const accessToken = params.get('access_token')
        const userResponse = await axios.get('https://api.github.com/user', { headers: { Authorization: `token ${accessToken}`, Accept: 'application/json'}});
        req.session.GitHub = {
            ...userResponse.data, accessToken
        }
        res.redirect(req.query.state)
    }

}
