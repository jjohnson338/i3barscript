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
  const result = parseInt(formatBuffer(
    execSync(`top -bn 1 | grep "id," | awk '{print $8}'`)
  ), 10);

  if (isNaN(result)) return avgArray(smoothingArray);

  const cpuLoad = 100 - result;

  if (smoothingArray.length < smoothingLength) {
    smoothingArray.push(cpuLoad);
  } else {
    smoothingArray = [ cpuLoad ].concat(
      smoothingArray.slice((smoothingLength-1))
    );
  }
  return avgArray(smoothingArray);
};
