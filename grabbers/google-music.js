const WebSocket = require('ws');

module.exports = (() => {
  //Constantly updated object containing music state
  const state = {
    playing: false,
    artist: null,
    track: null,
    milliSecondsPlayed: null,
    milliSecondsTotal: null,
    albumArtworkUrl: null,
  };
 
  let gpmdpWS = null; 
  
  function tryLater() {
    gpmdpWS = null;
    state.playing = false;
    setTimeout(tryConnect, 500);
  }

  function tryConnect() {
    try {
      //Create the websocket
      gpmdpWS = new WebSocket('ws://localhost:5672');
      gpmdpWS.on('error', (e) => {
        tryLater();
      });
      gpmdpWS.on('open', () => {
        //Setup listeners
        gpmdpWS.on('message', (payload) => {
          //Payload comes as stringified JSON. Parse
          payload = JSON.parse(payload);
          //Payload is of the structure { channel: "channelName", payload: payload }
          const channel = payload.channel;
          if (channel == "playState") {
            state.playing = payload.payload;
          } else if (channel == "track") {
            const { title, artist, album, albumArt } = payload.payload;
            state.artist = artist;
            state.track = title;
            state.albumArtworkUrl = albumArt;
          } else if (channel == "time") {
            const { current, total } = payload.payload;
            state.milliSecondsPlayed = current;
            state.milliSecondsTotal = total;
          }
        });
        gpmdpWS.on('close', tryLater);
      }); 
    } catch(e) {
      tryLater();
    }
  }
  
  // Get this train rolling
  tryConnect();

  const getMusicBar = () => {
    if (!state.playing) {
      return;
    } else {
      const tenthsOfSongPlayed = Math.round(((state.milliSecondsPlayed/state.milliSecondsTotal)*10));
      const percentageBar = `[${Array(tenthsOfSongPlayed+1).join(">")}${Array((10-tenthsOfSongPlayed)+1).join("#")}]`
      return `${percentageBar} ${state.track} - ${state.artist}`;
    }
  };

  return {
    getMusicBar,
  };
})();
