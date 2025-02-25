import { createSlice } from "@reduxjs/toolkit"



const initialState ={
	files: [],
	currentDir: null,
	popup: 'none',
	dirStack: []
}


const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers:{
		setFiles(state, action){
			state.files = action.payload
		},
		setCurrentDir(state,action){
			state.currentDir = action.payload
		},
		addFile(state, action){
			state.files.push(action.payload)
		},
		popupDisplay(state, action){
			state.popup = action.payload
		},
		pushToStack(state,action){
			state.dirStack = [...state.dirStack, action.payload]
		},
		popFromStack(state){
			state.dirStack = state.dirStack.slice(0,-1)
		}
	}
})

export const {setFiles, setCurrentDir, addFile, popupDisplay, pushToStack, popFromStack} = fileSlice.actions
export default fileSlice.reducer
// export default function fileReducer(state = defaultState ,action){
// 	switch(action.type){
// 		default:
// 			return state
// 	}
// }