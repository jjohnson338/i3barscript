const moment = require("moment");

module.exports = function getDate(){
	return new Promise((resolve) => {
		resolve(moment().format('MMMM Do YYYY, h:mm:ss a'));
	});
};