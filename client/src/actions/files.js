import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addFile, deleteFileAc, setFiles } from "../store/fileReducer";

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

export const uploadFile = createAsyncThunk(
	"api/files/upload",
	async({ file, dirId}, {dispatch})=>{
		try{
			const formData = new FormData()
			formData.append('file', file)
			if(dirId){
				formData.append("parent", dirId)
			}
			const res = await axios.post(`${parentURL}\\${'upload'}`,formData, {
				headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
				onUploadProgress: progressEvent => {
					const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
					console.log(totalLength)
					if(totalLength){
						let progress = Math.round((progressEvent.loaded * 100) / totalLength)
						console.log(progress)
					}
				}

			})
			console.log(res.data)
			dispatch(addFile(res.data))
		}catch(e){
			console.log(e.response.data.message)
		}
})

export const downloadFile = createAsyncThunk(
	"api/files/download",
	async(file)=>{
		try{
			const res = await fetch(`${parentURL}/download?id=${file._id}`,{
				headers:{
					Authorization:`Bearer ${localStorage.getItem('token')}`
				}
			})

			if(res.status === 200){
				const blob = await res.blob()
				const downdloadUrl  = window.URL.createObjectURL(blob)
				const link = document.createElement('a')
				link.href = downdloadUrl
				link.download = file.name
				document.body.appendChild(link)
				link.click()
				link.remove()
			}
			
			
		}catch(e){
			console.log(e.response.data.message)
		}
})
export const deleteFile = createAsyncThunk(
	"api/files/",
	async(file, {dispatch})=>{
		try{
			const res = await axios.delete(`${parentURL}?id=${file._id}`,{
				headers:{
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			})


			
			dispatch(deleteFileAc(file._id))
			alert('file was deleted', res.data.message)
		}catch(e){
			console.log(e.response.data.message)
		}
})