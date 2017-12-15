var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const {wat_key} = require('../config/index')


var nlu = new NaturalLanguageUnderstandingV1(wat_key);

const lyrics ="One man come in the name of love One man come and go One man come he to justifyOne man to overthrow";
const reg = /\*.*/g;
const reg2 = /\(\d+\)/g
function watson(lyrics, res){
  lyrics = lyrics.replace(reg, '');
  lyrics = lyrics.replace(reg2, '');
    return new Promise(function(resolve, reject){

  

nlu.analyze(
    {
        html: lyrics, // Buffer or String
        features: {
            concepts: {},
            keywords: {},
            sentiment: {}
        }
    },
    function(err, response) {
        if (err) {
            console.log('error:', err);
        } else {
            // console.log(response)
            let newArr = [];
            response.keywords.forEach(function(el){
                newArr.push(el.text);
            });
            console.log(response.keywords)
            let sentiment = response.sentiment.document.label;
            let obj = {};

            obj.sentiment = sentiment;
            obj.lyrics = lyrics;
         
            obj.keyWords = newArr;
            // console.log(obj)
            resolve(obj);
        }
       }
    );
})
}

module.exports = {watson};

// res.render('pages/index', { staff });