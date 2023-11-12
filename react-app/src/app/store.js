import { configureStore } from '@reduxjs/toolkit'
import wordsReducer from '../features/wordsSlice'

export default configureStore({
  reducer: {
    words: wordsReducer,
  },
})
