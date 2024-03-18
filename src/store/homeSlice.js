import { createSlice } from "@reduxjs/toolkit";
const initialState={
    url:{name:'js dev'},
    genres:{}
}
const homeSlice=createSlice({
    name:'home',
    initialState,
    reducers:{
        getApiConfiguration:(state,action)=>{
            state.url=action.payload
        },
        getGenre:(state,action)=>{
            state.genres=action.payload
        }
    }
})
export default homeSlice.reducer
export const {getApiConfiguration,getGenre}=homeSlice.actions