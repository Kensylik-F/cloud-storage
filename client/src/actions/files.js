import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addFile, setFiles } from "../store/fileReducer";

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

export const createDir = createAsyncThunk(
	"api/files/create",
	async({dirId, name}, {dispatch})=>{
		try{
			const response = await axios.post(parentURL,{
				name,
				parent: dirId,
				type: 'dir'

			},{
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
			})
			dispatch(addFile(response.data))
			console.log(response.data)
		}catch(e){
			console.log(e.response.data.message)
		}
})