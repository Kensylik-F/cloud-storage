import jwt from 'jsonwebtoken'
import config from 'config'

const authMidlleware = (req,res,next) =>{
	if(req.method == "OPTIONS"){
		return next()
	}

	try{
		const token = req.headers.authorization.split(' ')[1]
		if(!token){
			return res.status(401).json({message: 'token not found'})
		}
		const decoded = jwt.verify(token, config.get('secretKey'))
		req.user = decoded
		next()
	}catch(e){
		return res.status(401).json({message: 'token not found'})


	}
}

export default authMidlleware