import fs from 'fs'
import File from '../models/File.js'
import config from 'config'

class FileService {
	
	createDir(file){
		const filePath = `${config.get('filePath')}\\${file.user}\\${file.path}`
		console.log("file PATH: ",filePath)
		return new Promise((resolve, reject)=>{
			try{
				if(!fs.existsSync(filePath)){
					fs.mkdirSync(filePath, { recursive: true})
					return resolve({message:"file was created"})
				}else{
					return reject({message:"file already exist"})
				}

			}catch(e){
				reject({messege: 'error file service'})
			}
		})
	}
	getPath(file){
		return `${config.get('filePath')}\\${file.user}\\${file.path}`

	}

	deleteFile(file) {
		const path = this.getPath(file);
		
		try {
			if (file.type === "dir") {
				fs.rmSync(path, { recursive: true, force: true });
			} else {
				if (fs.existsSync(path)) {
					fs.unlinkSync(path);
				}
			}
		} catch (error) {
			console.error("Ошибка при удалении файла:", error);
		}
	}

}


export default new FileService()