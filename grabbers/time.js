const moment = require("moment");

module.exports = async function getDate(){
		return moment().format('MMMM Do YYYY, h:mm:ss a');
};
