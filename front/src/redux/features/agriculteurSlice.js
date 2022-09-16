import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance  from '../../api/axiosIntance'
import { setMessage } from './messageSlice'




const initialState = {
          agriculteur: [],
          loading : false
    }



export const loginAgriculteur = createAsyncThunk(
    'agriculteur/loginAgriculteur',
    async({numero,password},thunkAPI) => {
      
      try{
        const responseData =  await axiosInstance.post("agriculteurs/auth/",{numero,password})
        console.log('respon : ',responseData.data)
        return responseData.data;
     }catch (error) {
      const message = error.response.data.message
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
    }
)





export const agriculteurSlice = createSlice({
  name: "agriculteur",
  initialState,
  reducers: {},
  extraReducers:{

    [loginAgriculteur.pending]: (state)=>{
      state.loading = true;
    },
    [loginAgriculteur.fulfilled]: (state,{payload})=>{
      state.loading = false;
      state.agriculteur = payload;
    },
    [loginAgriculteur.rejected]:(state)=>{
      state.loading = false;
    }

  }
})

export default  agriculteurSlice.reducer
