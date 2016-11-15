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
		const outputArray = [];

		if (musicValue) {
			outputArray.push({
				"full_text": musicValue,
				"color": "#9be52a",
				"align": "left"
			});
		}
		outputArray.push({
			"full_text": `CPU: ${("0"+cpuUsageValue).slice(-5)}%`,
			"min_width": "CPU: 100%",
			"align": "left"
		});
		outputArray.push({
			"full_text": `Mem: ${memUsageValue}`,
			"min_width": "Mem: 16.78GB/16.78GB",
			"align": "left"
		});
		outputArray.push({
			"full_text": `Disk: ${diskUsageValue}`,
			"min_width": "Disk: 936.01GB/936.01GB",
			"align": "left"
		});
		outputArray.push({
			"full_text": timeValue,
			"align": "right",
		});
		console.log(`,${JSON.stringify(outputArray)}`);
		setTimeout(FindAndOutputStats, 1000);
	});
}
console.log(JSON.stringify({ "version": 1 }));
console.log('[');
console.log('[]');
FindAndOutputStats();