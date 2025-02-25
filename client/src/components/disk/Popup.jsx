import { useState } from "react"
import { Input } from "../../utils/input/Input"
import { useDispatch, useSelector } from "react-redux"
import { popupDisplay } from "../../store/fileReducer"
import { createDir } from "../../actions/files"



export const Popup = () =>{
	const [dirName, setDirName ]= useState('')

	const popUp = useSelector(state => state.files.popup)
	const currentDir = useSelector(state => state.files.currentDir)
	const dispatch = useDispatch()


	const createDirHandler = () => {
		dispatch(createDir({dirId: currentDir, name: dirName}))
		dispatch(popupDisplay('none'))
		setDirName('')

	}
	return(
		<div className="popup"  onClick={()=> dispatch(popupDisplay('none'))} style={{display: popUp}}>
			<div className="popup_container" onClick={(event)=> event.stopPropagation()}>
				<div className="popup_header">
					<div className="popup_title">
						Создать новую папку
					</div>
					<button onClick={()=> dispatch(popupDisplay('none'))} className="popup_btn_close">X</button>
				</div>
				<Input value={dirName} setValue={setDirName} type="text" placeholder="имя папки" />
				<button className="popup_btn_create" onClick={()=> createDirHandler()}>Создать</button>
			</div>
		</div>
	)
}