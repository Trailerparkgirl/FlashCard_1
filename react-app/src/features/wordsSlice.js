import { createSlice } from '@reduxjs/toolkit'

export const initialState = [
  { id: '1', word: 'distraction', definition: 'mansuural' },
  { id: '2', word: 'complimentary', definition: 'unegui' },
]

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    wordAdded(state, action) {
      state.push(action.payload)
    }
  },
})

export const { wordAdded } = wordsSlice.actions

export default wordsSlice.reducer
