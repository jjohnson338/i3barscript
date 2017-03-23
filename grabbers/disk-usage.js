const diskspaceChecker = require("diskspace");

module.exports = function getDiskUsage(){
	return new Promise((resolve, reject) =>	{
		diskspaceChecker.check("/", (err, diskStuff) => {
		if(err) {
			return reject(err);
		}
		const {total, free, status} = diskStuff;
        const freeGigabytes = (free / (1000*1000*1000)).toFixed(2);
        const totalGigabytes = (total / (1000*1000*1000)).toFixed(2);
        const usedGigabytes = (totalGigabytes - freeGigabytes).toFixed(2);

		const diskUsage = `${usedGigabytes}GB / ${totalGigabytes}GB`;
		resolve(diskUsage);
		});
	});
};