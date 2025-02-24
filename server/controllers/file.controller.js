import fileService from "../services/file.service.js"
import File from "../models/File.js"
import User from "../models/User.js"

class FileController{
	async createDir(req,res){
		try{
			const {name,parent, type} = req.body
			const file = new File({name, type, parent, user: req.user.id})
			const parentFile = await File.findOne({_id: parent})
			if(!parentFile){
				file.path = name
				await fileService.createDir(file)
			}else{
				file.path = `${parentFile.path}\\${file.name}`
				await fileService.createDir(file)
				parentFile.childs.push(file._id)
				await parentFile.save()
			}
			await file.save()
			return res.json(file)
		}catch(e){
			console.log(e)
			return res.status(400).json(e)
		}
	}
	async fetchFile(req, res){
		try{
			const files = await File.find({user: req.user.id, parent: req.query.parent})
			return res.json(files)

		}catch(e){
			console.log(e)
			return res.status(400).json(e)
		}
	}
}

export default new FileController()