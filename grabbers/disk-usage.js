const diskspace = require("diskspace");

module.exports = async function getDiskUsage(){
  const getDiskspace = new Promise((resolve, reject) =>	{
    diskspace.check("/", (err, diskStuff) => {
      if(err) return reject(err);
      resolve(diskStuff);
    });	
  });
  const {total, free, status} = await getDiskspace;
  const freeGigabytes = (free / (1000*1000*1000)).toFixed(2);
  const totalGigabytes = (total / (1000*1000*1000)).toFixed(2);
  const usedGigabytes = (totalGigabytes - freeGigabytes).toFixed(2);

  return `${usedGigabytes}GB / ${totalGigabytes}GB`;
};
