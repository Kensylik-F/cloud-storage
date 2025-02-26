import { useDispatch } from 'react-redux'
import './Uploader.scss'
import PropTypes from 'prop-types'
import { removeFileUploader } from '../../../../store/uploadReducer'

// interface IUpload {
// 	id:number
// 	progress: number
// 	name: string
// }
// interface IFile {
// 	file: IUpload
// }
export const UploaderFile = ({file}) =>{
	const dispatch = useDispatch()
	return (
		<div className="uploadFile">
			<div className="uploadFile_header">
				<div className="uploadFile_title">{file.name}</div>
				<button className="uploadFile_btn" onClick={()=> dispatch(removeFileUploader(file.id))}>x</button>
			</div>
			<div className="upload_bar">
				<div className="upload_bar-progress" style={{width: file.progress + '%'}}></div>
				<div className="upload_bar-procent">{file.progress}%</div>
			</div>
		</div>
	)
}

UploaderFile.propTypes = {
	file: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		progress: PropTypes.number.isRequired
	}).isRequired
}