import fileService from "../services/file.service.js"
import File from "../models/File.js"
import User from "../models/User.js"
import config from 'config'
import fs from 'fs'
class FileController{
	async createDir(req,res){
		try{
			const {name,parent, type} = req.body
			const file = new File({name, type, parent, user: req.user.id})
			console.log("FILE", file)
			const parentFile = await File.findOne({_id: parent})
			if(!parentFile){
				file.path = name
				// await fileService.createDir(file)
			}else{
				file.path = `${parentFile.path}\\${file.name}`
				// await fileService.createDir(file)
				parentFile.childs.push(file._id)
				await parentFile.save()
			}
			await fileService.createDir(file)
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

	async uploadFile(req,res){
		try{
			const file = req.files.file

			const parent = await File.findOne({user: req.user.id, _id: req.body.parent})
			const user = await User.findOne({_id: req.user.id})

			if(user.usedDisk + file.size > user.disk){
				return res.status(400).json({message: 'диск заполнен'})
			}

			user.usedDisk = user.usedDisk + file.size
			let path
			if(parent){
				path = `${config.get('filePath')}\\${user.id}\\${parent.path}\\${file.name}`
			}else{
				path = `${config.get('filePath')}\\${user.id}\\${file.name}`
			}
			
			if(fs.existsSync(path)){
				return res.status(400).json({message: 'файл уже загружен'})
			}
			file.mv(path)
			const type = file.name.split('.').pop()
			let filePath = file.name
			if(parent){
				filePath = `${parent.path}\\${file.name}`
			}
			const dbFile = new File({
				name: file.name,
				type,
				size: file.size,
				path: filePath,
				parent: parent?._id,
				user: user.id
			})

			await dbFile.save()
			await user.save()
			res.json(dbFile)
		}catch(e){
			console.log(e)
			return res.status(500).json({message: e})
		}

	}

	async downloadFile(req,res){
		try{
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			const path = `${config.get('filePath')}\\${req.user.id}\\${file.path}\\${file.name}`

			if(fs.existsSync(path)){
				return res.download(path, file.name)
			}
			return res.status(404).json({message: 'ошибка загрузки файла'})
		}catch(e){
			console.log(e)
			return res.status(500).json({message: e})

		}
	}

	async deleteFile(req,res){
		try{
			const file = await File.findOne({_id: req.query.id, user: req.user.id})
			console.log("FILE:",file)
			if(!file){
				return res.status(404).json({message:'file not found'})
			}
			fileService.deleteFile(file)
			await file.deleteOne()
			return res.json({message:'delete file'})

		}catch(e){
			console.log(e)
			return res.status(500).json({message: e})
		}
	}
}

export default new FileController()