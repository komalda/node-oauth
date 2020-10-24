const express = require('express')
const axios = require('axios')
const querystring  = require('querystring');
const app = express()

  // The req.query object has the query params that were sent to this route.
  //const requestToken = req.query.code
const clientId = '40c6bbc8a987b27a016a';
const clientSecret='095ce5a1199e94af193e679e22123162d764c4e4';
const state = 'randomstringstate';
app.get('/authorize', (req, res) => {
        axios({
            method: 'get',
            url: `https://github.com/login/oauth/authorize?client_id=${clientId}&state={state}`,
            // Set the content type header, so that we get the response in JSON
        }).then((response) => {
            //console.log("Step1 :=>");
            //console.log(response.request);
            res.json({"data":{ "html": response.data, "url":response.request.res.responseUrl}});
        }).catch((error) => {
            console.log('Error is >>>'+error);
        })

}); 

app.get('/callback', (req, res) => {
    var codeFromGithub = res.req.query.code;
    var stateFromGithub = res.req.query.state;
    console.log("code :"+codeFromGithub);
    axios({
            method: "post",
            url: "https://github.com/login/oauth/access_token",
            data:{
                "client_id":clientId,
                "client_secret":clientSecret,
                "code":codeFromGithub,
                "state":stateFromGithub
            },
            headers:{
                "Content-type":"application/json"
            }
    }).then((response) => {
            console.log("Step2 :=>");
            dataFromGithub= querystring.parse(response.data)
            console.log(dataFromGithub.access_token);     
            res.redirect(`/home.html?token=${dataFromGithub.access_token}`);     
    }).catch((error) => {
            console.log('Error is >>>'+error);
            res.redirect(400, "/index.html",{"msg":"Something went wrong, please login again"})
    });
    
}); 
app.get('/logout', (req, res) => {    
    console.log("#LOGOUT") 
    res.redirect(`/end.html`);     
    
}); 

app.use(express.static(__dirname + '/public'))
app.listen(8080,()=>{
    console.log("Server listening on port : 8080")
});