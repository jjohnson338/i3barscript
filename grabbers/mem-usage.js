const os = require("os");

module.exports = function getMemUsage(){
	return new Promise((resolve) => {
        const freedGigabytes = (os.freemem()/(1000*1000*1000)).toFixed(2);
        const totalGigabytes = (os.totalmem()/(1000*1000*1000)).toFixed(2);
        const usedGigabytes = (totalGigabytes - freedGigabytes).toFixed(2);
			
        resolve(`${usedGigabytes}GB / ${totalGigabytes}GB`);
	});
};