import mongoose from 'mongoose'
 
 const User = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
		
	},
	password:{
		type:String,
		required: true,
	},
	disk:{
		type: Number,
		default: 1024**3*10
	},
	usedDisk: {
		type: Number,
		default: 0
	},
	avatar:{
		type: String
	},
	file:[{type: mongoose.Types.ObjectId, ref: 'File'}]
})

export default mongoose.model('User', User)