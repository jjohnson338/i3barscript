#!/usr/bin/node
const getTime = require("./grabbers/time");
const getDiskUsage = require("./grabbers/disk-usage");
const getCpuUsage = require("./grabbers/cpu-usage");
const getMemUsage = require("./grabbers/mem-usage");
const getMusic = require('./grabbers/google-music');

//Get and output stats on a loop
const FindAndOutputStats = function() {

	Promise.all([
					getTime(), 
					getDiskUsage(), 
					getCpuUsage(), 
					getMemUsage(),
					getMusic(),
				]).then(([
							timeValue,
							diskUsageValue,
							cpuUsageValue,
							memUsageValue,
							musicValue,
						 ]) => {
		//Format and output results
		console.log(`Cpu: ${cpuUsageValue}% | Mem: ${memUsageValue} | Disk: ${diskUsageValue} | Music: ${musicValue} | ${timeValue}`);
		setTimeout(FindAndOutputStats, 1000);
	});
}

FindAndOutputStats();