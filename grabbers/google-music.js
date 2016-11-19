const execSync = require('child_process').execSync;

module.exports = function getGooglePlayMusic() {
    return new Promise((resolve, reject) => {
        try {
            const googleMusicObject = JSON.parse(execSync(`cat ~/.config/'Google Play Music Desktop Player'/json_store/playback.json`));
            if (!googleMusicObject.playing) {
                resolve(void(0));
            } else {
                const millisecondsPlayed = googleMusicObject.time.current;
                const totalMilliseconds = googleMusicObject.time.total;
                const tenthsOfSongPlayed = Math.round(((millisecondsPlayed/totalMilliseconds)*10));
                const percentageBar = `[${Array(tenthsOfSongPlayed+1).join(">")}${Array((10-tenthsOfSongPlayed)+1).join("#")}]`
                resolve(`${percentageBar} ${googleMusicObject.song.title} - ${googleMusicObject.song.artist}`);
            }
        } catch (e) {
            resolve(void(0));
        }
    });
};