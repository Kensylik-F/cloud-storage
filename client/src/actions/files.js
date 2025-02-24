import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setFiles } from "../store/fileReducer";

const parentURL= "http://localhost:7777/api/files"



export const getFiles = createAsyncThunk(
	"api/files",
	async(dirId, {dispatch})=>{
		try{
			const response = await axios.get(`${parentURL}${dirId ? '?parent='+ dirId : ''}`,{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(setFiles(response.data))
			console.log(response.data)
		}catch(e){
			console.log(e.response.data.message)
		}

})