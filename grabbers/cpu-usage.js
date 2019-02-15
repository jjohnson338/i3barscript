const execSync = require("child_process").execSync;
const formatBuffer = require("../utils/utils");

const smoothingLength = 50;
let smoothingArray = [];

const avgArray = (arr) => {
    return Math.round(arr.reduce(
      (acc, cur) => {
        return acc + cur;
      },
      0
    ) / arr.length);
};

module.exports = async function getCPUUsage(){
  const cpuLoad = 100 - parseInt(formatBuffer(
    execSync(`top -bn 1 | grep "id," | awk '{print $8}'`)
  ));

  if (smoothingArray.length < smoothingLength) {
    smoothingArray.push(cpuLoad);
  } else {
    smoothingArray = [ cpuLoad ].concat(
      smoothingArray.slice((smoothingLength-1))
    );
  }
  return avgArray(smoothingArray);
};
