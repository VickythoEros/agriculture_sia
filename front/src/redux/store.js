import { configureStore } from '@reduxjs/toolkit'
import agriculteurReducer from './features/agriculteurSlice'
import { messageReducer } from './features/messageSlice'


export default configureStore({
  reducer: {
    agriculteurReducer,
    messageReducer,
    
  },
  devTools:true
})