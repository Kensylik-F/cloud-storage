import PropTypes from 'prop-types';
import './file.scss'
import dir from '../../../../assets/img/dir.png'
import folder from '../../../../assets/img/file.png'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../store/fileReducer';
import { deleteFile, downloadFile } from '../../../../actions/files';
// import down from '../../../../assets/img/down.png';
// import del from '../../../../assets/img/delete.png';


export const File =({file})=>{
	const dispatch = useDispatch()
	const dirId = useSelector(state => state.files.currentDir)

	const openDirHandler = (file) =>{
		if(file.type === 'dir'){
			dispatch(pushToStack(dirId))
			dispatch(setCurrentDir(file._id))
		}

	}

	const fileDownloadHandler = (e) =>{
		e.stopPropagation()

		
		dispatch(downloadFile(file))

	}

	const deleteFileHandler =async(e) =>{
		e.stopPropagation()
		if (file.type === "dir" && file.childs.length > 0) {
			const isConfirmed = window.confirm(
			  `Папка "${file.name}" содержит файлы. Удалить?`
			);
			if (!isConfirmed) return;
		  }
		dispatch(deleteFile(file))
	}
	return (
		<div className="file" onClick={()=> openDirHandler(file)}>
			<img className="file_img" src={file.type === 'dir' ? dir : folder} alt="" />
			<div className="file_name">{file.name}</div>
			<div className="file_date">{file.date.slice(0,10)}</div>
			<div className="file_size">{file.size}</div>
			{file.type !== 'dir' && <button onClick={(e) => fileDownloadHandler(e)} className='file_btn file_download'>Download</button>}
			<button onClick={(e)=> deleteFileHandler(e)} className='file_btn file_delete'>Delete</button>
		</div>
	)
}

File.propTypes = {
    file: PropTypes.shape({
		_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
		type: PropTypes.string,
		childs: PropTypes.object
    }).isRequired,
};
