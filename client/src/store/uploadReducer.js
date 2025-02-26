import { createSlice } from "@reduxjs/toolkit"



const initialState ={
	isVisible: false,
	files: [],
	
}


const uploadSlice = createSlice({
	name: 'upload',
	initialState,
	reducers:{
		showUploader(state){
			state.isVisible = true
		},
		hiddenUploader(state){
			state.isVisible = false

		},
		addFileUploader(state, action) {
			state.files.push(action.payload)
		},
		removeFileUploader(state, action) {
			state.files = state.files.filter(file => file.id !== action.payload)
		},
		changeFileUploader(state, action){
			state.files = state.files.map(file => 
				file.id === action.payload.id
					? { ...file, progress: action.payload.progress }
					: file
			);
		}
		
	}
})

export const {showUploader,hiddenUploader,addFileUploader,removeFileUploader,changeFileUploader} = uploadSlice.actions
export default uploadSlice.reducer