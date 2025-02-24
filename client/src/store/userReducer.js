import { createSlice } from "@reduxjs/toolkit"


const initialState ={
	currentUser:{
	},
	isAuth: false

}

const userSlice = createSlice({

	name: 'user',
	initialState,
	reducers:{
		setUser(state, action){
			state.currentUser = action.payload
			state.isAuth = true
		},
		logout(state){
			localStorage.removeItem('token')
			state.currentUser = {}
			state.isAuth = false
		}
	}
})
export const {logout, setUser} = userSlice.actions
export default userSlice.reducer
// export default function userReducer(state = defaultState ,action){
// 	switch(action.type){
// 		default:
// 			return state
// 	}
// }