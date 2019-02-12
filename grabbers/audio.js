const execSync = require("child_process").execSync;
const formatBuffer = require("../utils/utils");

module.exports = async function getAudioVolume(){
  const selectedSink = formatBuffer(
    execSync(`pactl list short sinks | sed -e 's,^\\([0-9][0-9]*\\)[^0-9].*,\\1,' | head -n 1`)
  );
  const sinkVolume = formatBuffer(
    execSync(`pactl list sinks | grep '^[[:space:]]Volume:' | head -n $(( ${ selectedSink } + 1 )) | tail -n 1 | sed -e 's,.* \\([0-9][0-9]*\\)%.*,\\1,'`)
  );

  return {
    mainSinkVolume: sinkVolume,
  }
};

