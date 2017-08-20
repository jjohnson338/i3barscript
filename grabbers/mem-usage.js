const  execSync = require("child_process").execSync;

module.exports = (async function getMemUsage(){
  const used = await parseInt(execSync(`free | awk 'FNR == 2 {print $3}'`));
  const total = await parseInt(execSync(`free | awk 'FNR == 2 {print $2}'`));
  const usedGigabytes = (used/1000/1000).toFixed(2);
  const totalGigabytes = (total/1000/1000).toFixed(2);

  return `${usedGigabytes}GB / ${totalGigabytes}GB`;
});
