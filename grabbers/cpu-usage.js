const os = require("os");

module.exports = function getCpuUsage(){
	return new Promise((resolve) => {
        const oneMinuteLoadAvg = os.loadavg()[0];
		resolve((oneMinuteLoadAvg*100).toFixed(2));
	});
};