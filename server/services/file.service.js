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

}


export default new FileService()