import { useState } from "react"
import { Input } from "../../utils/input/Input"
import './Auth.scss'
import { login } from "../../actions/user"
import { useDispatch } from "react-redux"



export const Login = () =>{
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	return(
		<div className="auth">
			<div className="auth_header">
				Войти
			</div>
			<Input value={email} setValue={setEmail} type='email' placeholder='email'/>
			<Input value={password} setValue={setPassword} type='password' placeholder='password'/>
			<button onClick={()=> dispatch(login({email,password}))}>Bойти</button>
		</div>
	)
}