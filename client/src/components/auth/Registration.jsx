import { useState } from 'react'
import { Input } from '../../utils/input/Input'
import './Auth.scss'
import { registration } from '../../actions/user'
import { useDispatch } from 'react-redux'


export const Registration = () =>{

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()

	return (
		<div className="auth">
			<div className="auth_header">
				Регистрация
			</div>
			<Input value={email} setValue={setEmail} type='email' placeholder='email'/>
			<Input value={password} setValue={setPassword} type='password' placeholder='password'/>
			<button onClick={()=> dispatch(registration(email,password))}>Войти</button>
		</div>
	)
}