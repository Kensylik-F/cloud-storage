import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFiles } from "../../actions/files"
import './disk.scss'
import { FileList } from "./fileList/fileList"



export const Disk = () =>{
	const dispatch = useDispatch()
	const currentDir = useSelector(state => state.files.currentDir)
	useEffect(()=>{
		dispatch(getFiles(currentDir))
	},[currentDir])
	return( 
		<div className="disk">
			<div className="disk_header">
				<button className="disk_btn back">Back</button>
				<button className="disk_btn create">Create Dir</button>
			</div>
			<FileList/>
		</div>
	)
}