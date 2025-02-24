import PropTypes from 'prop-types';
import './file.scss'
import dir from '../../../../assets/img/dir.png'
import folder from '../../../../assets/img/file.png'


export const File =({file})=>{
	return (
		<div className="file">
			<img className="file_img" src={file.type === 'dir' ? dir : folder} alt="" />
			<div className="file_name">{file.name}</div>
			<div className="file_date">{file.date.slice(0,10)}</div>
			<div className="file_size">{file.size}</div>
		</div>
	)
}

File.propTypes = {
    file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        size: PropTypes.string.isRequired,
		type: PropTypes.string
    }).isRequired,
};
