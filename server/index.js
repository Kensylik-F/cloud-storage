import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import router from './routes/auth.routes.js'
import cors from 'cors'

const app = express()
const PORT = config.get('serverPort')


app.use(cors())
// распарсить Json обьект чтобы express правильно прочитал данные
app.use(express.json())
app.use('/api/auth', router)

const start = async () =>{
	try{
		mongoose.connect(config.get('dbURL'))
		.then(()=>{console.log('connect')})
		.catch((e)=>console.log('fail:', e))



		app.listen(PORT,()=>{
			console.log(`server started on port: ${PORT}`)
		})
	}catch(e){

	}
}

start()