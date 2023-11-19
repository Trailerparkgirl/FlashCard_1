import { createSlice } from '@reduxjs/toolkit'

export const initialState = [
  { id: '1', isEditing: false, word: 'distraction', definition: 'mansuural' },
  { id: '2', isEditing: false, word: 'complimentary', definition: 'unegui' },
]

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    wordAdded(state, action) {
      state.push(action.payload)
    },
    wordEdited(state, action){
      const { id, updatedWord } = action.payload;
      const wordToEdit = state.find((word) => word.id === id);

      if (wordToEdit) {
        Object.assign(wordToEdit, updatedWord);
      }
    },
    toggleIsEditing(state, action) {
      const { id } = action.payload;
      const wordToToggle = state.find((word) => word.id === id);

      if (wordToToggle) {
        wordToToggle.isEditing = !wordToToggle.isEditing;
      }
    }
  },
})

export const { wordAdded, wordEdited, toggleIsEditing } = wordsSlice.actions

export default wordsSlice.reducer