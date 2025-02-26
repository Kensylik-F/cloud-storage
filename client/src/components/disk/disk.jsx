import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getFiles, uploadFile } from "../../actions/files"
import './disk.scss'
import { FileList } from "./fileList/fileList"
import { Popup } from "./Popup"
import { popFromStack, popupDisplay, setCurrentDir } from "../../store/fileReducer"
import { Uploader } from "./fileList/uploader/Uploader"



export const Disk = () =>{
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const dirStack = useSelector(state => state.files.dirStack)


	const [dragEnter, setDragEnter] = useState(false)
	useEffect(()=>{
		dispatch(getFiles(currentDir))
	},[currentDir])

	function showPopup(){
		dispatch(popupDisplay('flex'))
	}

	const clickBackHandler  = () =>{
		if(dirStack.length === 0) return 
		const dirStackBack = dirStack[dirStack.length-1]
		console.log('click BACK:', dirStackBack)
		dispatch(setCurrentDir(dirStackBack))
		dispatch(popFromStack())
	}

	const fileUploadHandler = (event)=>{
		const files = [...event.target.files]
		files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))
	}

	const dragEnterHandler = (event) =>{
		event.preventDefault();
		event.stopPropagation();
		setDragEnter(true)
	}
	const dragLeavehandler = (event) =>{
		event.preventDefault();
		event.stopPropagation()
    	setDragEnter(false);
	}
	const dragOverHandler = (event) =>{
		event.preventDefault();
		event.stopPropagation();
		if(!dragEnter) setDragEnter(true)
	}
	const drophHandler = (event) =>{
		event.preventDefault();
		event.stopPropagation();
		let files = [...event.dataTransfer.files]
		files.forEach(file => dispatch(uploadFile({file, dirId: currentDir})))
		setDragEnter(false)
	} 
	return( !dragEnter ?
		<div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeavehandler} onDragOver={dragOverHandler}>
			<div className="disk_header">
				<button className="disk_btn back" onClick={()=> clickBackHandler()}>Back</button>
				<button className="disk_btn create" onClick={()=> showPopup()}>Create Dir</button>
				<div className="disk_upload">
					<label htmlFor="disk_input" className="disk_label">Загрузить файл</label>
					<input multiple={true} onChange={(event) => fileUploadHandler(event)} type="file" id="disk_input" className="disk_input"/>
				</div>
			</div>
			<FileList/>
			<Popup/>
			<Uploader/>
		</div>
		:
		<div className="drag_field" onDrop={drophHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeavehandler} onDragOver={dragOverHandler}> 
			Перетащите файл сюда
		</div>
	)
}