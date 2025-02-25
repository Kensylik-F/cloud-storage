import PropTypes from 'prop-types';
import './file.scss'
import dir from '../../../../assets/img/dir.png'
import folder from '../../../../assets/img/file.png'
import { useDispatch, useSelector } from 'react-redux';
import { pushToStack, setCurrentDir } from '../../../../store/fileReducer';


export const File =({file})=>{
	const dispatch = useDispatch()
	const dirId = useSelector(state => state.files.currentDir)

	const openDirHandler = () =>{

		console.log('CLick back in file:', dirId)
		dispatch(pushToStack(dirId))
		dispatch(setCurrentDir(file._id))
	}
	return (
		<div className="file" onClick={file.type === 'dir' ? ()=> openDirHandler(): ''}>
			<img className="file_img" src={file.type === 'dir' ? dir : folder} alt="" />
			<div className="file_name">{file.name}</div>
			<div className="file_date">{file.date.slice(0,10)}</div>
			<div className="file_size">{file.size}</div>
		</div>
	)
}

File.propTypes = {
    file: PropTypes.shape({
		_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
		type: PropTypes.string
    }).isRequired,
};
