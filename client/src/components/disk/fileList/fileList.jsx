
import { useSelector } from 'react-redux'
import './fileList.scss'
import { File } from './file/file'

export const FileList =()=>{

	const files = useSelector(state => state.files.files).map(file => <File file={file} key={file._id}/>)
	// const files = [{_id:1, name: 'Direc1', type: 'dir', date: '24.02.2025', size: '5gb'},
	// 	{_id:2, name: 'Direc2', type: 'dir', date: '24.02.2025', size: '3gb'},
	// 	{_id:3, name: 'Dire3', type: 'file', date: '24.02.2025', size: '1gb'}
	// ].map(file => <File file={file} key={file._id}/>)
	return (
		<div className="fileList">
			<div className="fileList_container">
				<div className="fileList_name">Имя</div>
				<div className="fileList_date">Дата</div>
				<div className="fileList_size">Размер</div>
			</div>
			{files}
		</div>
	)
}