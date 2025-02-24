import mongoose from 'mongoose'

const File = new mongoose.Schema({
	name: {type: String, required: true},
	type: {type: String, required: true},
	date: {type: Date, default: Date.now()},
	size: {type: Number, default:0},
	accesslink: {type: String},
	path: {type: String, default: ''},
	user: {type: mongoose.Types.ObjectId, ref: 'User'},
	parent: {type: mongoose.Types.ObjectId, ref: 'File'},
	childs: [{type: mongoose.Types.ObjectId, ref: 'File'}]

})

export default mongoose.model('File', File)