const {key} = require('../config/index');
const request = require('request');
const {watson} = require('./natural-language');

function getLyrics(query, res) {

  let artist = query.artist;
  let track = query.track;

// let artist1 = 
// let track2 = 

    return makeCall(artist,track).then(function(data){
        return watson(data);
    }).then(function(obj){
        console.log(obj);
        res.render('index', {obj});
    })

 
}

function encode(str) {

    str = str.trim().toLowerCase();

    const reg = /\s/g;

    return str.replace(reg, "%20");

}

function makeCall(artist, track, res){

    artist = encode(artist);
    track = encode(track);

    return new Promise(function(resolve, reject){

    
    request.get(`http://api.musixmatch.com/ws/1.1/track.search?apikey=${key.api_key}&q_artist=${artist}&q_track=${track}&format=json&page_size=1&f_has_lyrics=1`, {json:true},
    (err, req, data) => {
        if(err) { reject(err); console.log(err);}
    
        
        let trackId = data.message.body.track_list[0].track.track_id;

            request.get(`http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${key.api_key}&track_id=${trackId}`, {json: true},
            (err, req, data) => {

                if(err) { reject(err); console.log(err); }

                let lyrics = data.message.body.lyrics.lyrics_body;
              
                resolve(lyrics);
            
            });               
        });
    })
}

// makeCall('aerosmith', 'dream on').then(function(data, res){
    
//     return watson(data).then(function(data){
//         console.log(data);
//     });
// });



module.exports = {getLyrics}

// console.log(encode(string));
// http://api.musixmatch.com/ws/1.1/
// matcher.lyrics.get?q_track=sexy%20and%20i%20know%20it&q_artist=lmfao
//http://api.musixmatch.com/ws/1.1/track.search?apikey=MY_API_KEY&q_artist=queen&q_track=we%20are%20the%20champions&format=json&page_size=1&f_has_lyrics=1
//ANY GAP WE NEED %20
//track.lyrics.get?track_id=15953433

// `http://api.musixmatch.com/ws/1.1/track.search?apikey=${key.api_key}&q_artist=radiohead&q_track=no%20surprises&format=json&page_size=1&f_has_lyrics=1`