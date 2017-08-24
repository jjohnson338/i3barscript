const  execSync = require("child_process").execSync;

module.exports = async function getBatStats(){
  const formatBuffer = (buf) => {
    return buf.toString().split('\n').join(''); 
  };
  const charging = await formatBuffer(
    execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | awk '/state/ {print $2}'`)) == "charging";
  const percentage = await formatBuffer(
    execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | awk '/percentage/ {print $2}'`));
  const percentageNumber = parseInt(percentage.substring(0, percentage.length -1));

  return {
    charging,
    percentage: percentageNumber,
  };
};
