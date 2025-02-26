import { hiddenUploader } from '../../../../store/uploadReducer.js'
import './Uploader.scss'
import { UploaderFile } from './UploaderFile.jsx'
// import close from '../../../../assets/img/close.png'
import {useDispatch, useSelector} from 'react-redux'

export const Uploader = () =>{

	const files = useSelector(state => state.upload.files)
	const isVisible = useSelector(state => state.upload.isVisible)
	const dispatch = useDispatch()
	return ( isVisible && 
		<div className="uploader">
			<div className="uploader_header">
				<div className="uploader_title">Загрузка</div>
				<button className="uploader_btn" onClick={() => dispatch(hiddenUploader())}>
					x
				</button>
			</div>
			{files.map(file =>
				<UploaderFile key={file.id} file={file}/>
			)}
		</div>
	)
}