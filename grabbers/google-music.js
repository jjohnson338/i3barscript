const execSync = require('child_process').execSync;

module.exports = function getGooglePlayMusic() {
    const googleMusicObject = JSON.parse(execSync(`cat ~/.config/'Google Play Music Desktop Player'/json_store/playback.json`));
    if (!googleMusicObject.playing) {
        return "";
    } else {
        const millisecondsPlayed = googleMusicObject.time.current;
        const totalMilliseconds = googleMusicObject.time.total;
        const tenthsOfSongPlayed = Math.round(((millisecondsPlayed/totalMilliseconds)*10));
        const percentageBar = `<${Array(tenthsOfSongPlayed+1).join("#")}${Array((10-tenthsOfSongPlayed)+1).join("-")}>`
        return `${percentageBar} ${googleMusicObject.song.title} - ${googleMusicObject.song.artist}`;
    }
};