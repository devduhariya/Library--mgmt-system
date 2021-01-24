const mongoose = require('mongoose');

// const mongoose = require('mongoose');
const lmsSchema = new mongoose.Schema({
categoryName:String,
categoryDes: String,
categoryImg:String
});
const lmsModel = new mongoose.model('lmsModel',lmsSchema);

module.exports = lmsModel;