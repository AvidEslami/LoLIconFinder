var express = require('express')
var cors = require('cors')
var app = express()
const request = require('request');
const bodyParser = require("body-parser");
const router = express.Router();
var SummonerName = String
var SummonerTransfer = String
var SummonerCutName = String

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/test',(request,response) => {
    SummonerTransfer = request.body;
    var SummonerName = JSON.stringify(SummonerTransfer)
    console.log(SummonerName)
    //console.log(SummonerName.replace(/['"]+/g, ''));
    console.log(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerName.replace('{"name":"', "").replace('"}', "")}?api_key=${api_key}`)
    SummonerCutName = SummonerName.replace('{"name":"', "").replace('"}', "")
    console.log(SummonerName);
});

app.use(cors())

const api_key = 'RGAPI-c80a5d6c-5e32-475e-ba55-9faf7fa4b74d'


app.get('/test', (req, server_res, next) => {
    // res.json({ msg: 'This is CORS-enabled for all origins!' })

    const options = {
        url: `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${SummonerCutName}?api_key=${api_key}`,
        headers: {
            "X-Riot-Token": api_key
        },
        json: true
    }

    request(options, (err, riot_res, body) => {
        if (err) {console.log(err); }
        console.log(body)
        server_res.json(body)
        console.log(body)
    });



})

app.listen(8000, function () {
    console.log('CORS-enabled web server listening on port 8000')
})

