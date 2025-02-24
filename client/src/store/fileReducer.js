import { createSlice } from "@reduxjs/toolkit"



const initialState ={
	files: []
}


const fileSlice = createSlice({
	name: 'file',
	initialState,
	reducers:{
		clearFile(state){
			state.files = []
		}
	}
})

export const {clearFile} = fileSlice.actions
export default fileSlice.reducer
// export default function fileReducer(state = defaultState ,action){
// 	switch(action.type){
// 		default:
// 			return state
// 	}
// }