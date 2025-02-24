import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { setUser } from '../store/userReducer'
 
const authURL = 'http://localhost:7777/api/auth'

export const registration = async(email, password)=>{
	try{	
		const responce = await axios.post(`${authURL}/registration`, {
			email, 
			password
		})
		alert(responce.data.message)
	}catch(e){
		alert('Не удалось зарегистрироваться', e.responce.data.message)
	}
}

export const login =createAsyncThunk(
	"auth/login",
	async ({email, password}, {dispatch})=>{
	
		try{
			const res = await axios.post(`${authURL}/login`,{
				email,
				password
			})
			dispatch(setUser(res.data.user))
			localStorage.setItem("token",res.data.token)
			
		}catch(e){
			alert(e)
		}
	})

	export const auth =createAsyncThunk(
		"auth/auth",
		async (_,{dispatch, rejectWithValue})=>{
		
			try{
				const token = localStorage.getItem('token')
				if(!token){
					return rejectWithValue('no token found')
				}
				const res = await axios.get(`${authURL}/auth`,{headers: {Authorization: `Bearer ${token}`}})
				dispatch(setUser(res.data.user))
				localStorage.setItem("token",res.data.token)
				console.log(res.data)
				
			}catch(e){
				alert(e)
				localStorage.removeItem('token')
				return rejectWithValue(e.response?.data?.message || "Authorization failed");

			}
		})
	
	
