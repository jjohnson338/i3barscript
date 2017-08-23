const  execSync = require("child_process").execSync;

module.exports = (async function getBatStats(){
  const charging = await execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | awk '/state/ {print $2}'`)
    .toString().split('\n').join('') == 'charging';
  const percentage = await execSync(`upower -i /org/freedesktop/UPower/devices/battery_BAT0 | awk '/percentage/ {print $2}'`)
    .toString().split('\n').join(''); 
  const percentageNumber = parseInt(percentage.substring(0, percentage.length -1));
  return {
    charging,
    percentage: percentageNumber,
  };
});
