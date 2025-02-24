import {Router} from 'express'
import User from '../models/User.js'
import config from 'config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'
import authMiddleware from '../middleware/auth.middleware.js'
import fileService from '../services/file.service.js'
import File from '../models/File.js'


const router = new Router()


router.post('/registration',
	[
		check('email', "не корректный email").isEmail(),
		check('password', "не корректный пароль").isLength({min:3, max: 10})
	], async (req, res)=>{

	try{

		const errors = validationResult(req)
		if(!errors.isEmpty()){
			return res.status(400).json({message: 'Не корректные данные', errors})
		}
		const {email, password} = req.body

		const condidate = await User.findOne({email})
		if(condidate){
			return res.status(400).json({message:`пользователь с email: ${email} существует`})
		}
		const hashPassword = await bcrypt.hash(password, 8)
		const user = new User({email, password: hashPassword})
		console.log(user)
		await user.save()
		await fileService.createDir(new File({user: user.id, name: ''}))
		return res.json({message: 'Пользователь создан'})
	}catch(e){
		console.log(e)
		res.send({message: 'Ошибка регистрации'})
	}
})

router.post('/login', async (req, res)=>{
	try{
		const {email,password} = req.body

		if (!email || !password) {
            return res.status(400).json({ message: "Введите email и пароль" });
        }

		const user = await User.findOne({email})
		if(!user){
			return res.status(404).json({message:"пользователя не найден"})
		}
		const isPassValid = bcrypt.compareSync(password, user.password)
		if(!isPassValid){
			return res.status(400).json({message:"Неверный пароль"})
		}

		const token = jwt.sign({id: user.id}, config.get('secretKey'),{expiresIn: "1h"})
		return res.json({
			token,
			user:{
				id:user.id,
				email: user.email,
				disk: user.disk,
				usedDisk: user.usedDisk,
				avatar: user.avatar
			}
		})
	}catch(e){
		console.log(e)
		res.status(404).send({message: 'Ошибка регистрации'})
	}
})


router.get('/auth',authMiddleware, async (req, res)=>{
	try{
		const user = await User.findOne({_id: req.user.id})
		const token = jwt.sign({id: user.id}, config.get('secretKey'),{expiresIn: "1h"})
		return res.json({
			token,
			user:{
				id:user.id,
				email: user.email,
				disk: user.disk,
				usedDisk: user.usedDisk,
				avatar: user.avatar
			}
		})
		
	}catch(e){
		console.log(e)
		res.status(404).send({message: ''})
	}
})

export default router