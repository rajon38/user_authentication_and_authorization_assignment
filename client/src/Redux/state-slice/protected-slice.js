import {createSlice} from "@reduxjs/toolkit";

const protectedSlice = createSlice({
    name: 'protected',
    initialState : {
        isAuthenticated: false,
    },
    reducers:{
        setAuthenticated(state,action){
            state.isAuthenticated = action.payload;
        }
    }
})

export  const {setAuthenticated}=protectedSlice.actions;
export default protectedSlice.reducer;