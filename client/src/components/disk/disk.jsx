import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  getFiles } from "../../actions/files"
import './disk.scss'
import { FileList } from "./fileList/fileList"
import { Popup } from "./Popup"
import { popFromStack, popupDisplay, setCurrentDir } from "../../store/fileReducer"



export const Disk = () =>{
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	const dirStack = useSelector(state => state.files.dirStack)

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
	return( 
		<div className="disk">
			<div className="disk_header">
				<button className="disk_btn back" onClick={()=> clickBackHandler()}>Back</button>
				<button className="disk_btn create" onClick={()=> showPopup()}>Create Dir</button>
			</div>
			<FileList/>
			<Popup/>
		</div>
	)
}