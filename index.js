#!/usr/bin/node
const getTime = require("./grabbers/time");
const getDiskUsage = require("./grabbers/disk-usage");
const getCpuUsage = require("./grabbers/cpu-usage");
const getMemUsage = require("./grabbers/mem-usage");

//Get and output stats on a loop
const FindAndOutputStats = function() {

	Promise.all([
					getTime(), 
					getDiskUsage(), 
					getCpuUsage(), 
					getMemUsage(),
				]).then(([
							timeValue,
							diskUsageValue,
							cpuUsageValue,
							memUsageValue,
						 ]) => {
		//Format and output results
		console.log(`Cpu: ${cpuUsageValue}% | Mem: ${memUsageValue} | Disk: ${diskUsageValue} | ${timeValue}`);
		setTimeout(FindAndOutputStats, 1000);
	});
}

FindAndOutputStats();