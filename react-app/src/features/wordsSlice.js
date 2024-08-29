import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  words: [], // Array to hold word objects with structure: { id: '', word: '', definition: '', isEditing: false }
  dataLoaded: false,
  // ... other state variables
};

const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    wordAdded(state, action) {
      state.words.push(action.payload)
    },
    wordEdited(state, action){
      const { id, updatedWord } = action.payload;
      const wordToEdit = state.words.find((word) => word.id === id);

      if (wordToEdit) {
        Object.assign(wordToEdit, updatedWord);
      }
    },
    toggleIsEditing(state, action) {
      const { id } = action.payload;
      const wordToToggle = state.words.find((word) => word.id === id);

      if (wordToToggle) {
        wordToToggle.isEditing = !wordToToggle.isEditing;
      }
    },
    wordDeleted: (state, action) => {
      state.words = state.words.filter(word => word.id !== action.payload.id);
    },    

    dataLoaded: (state, action) => {
      state.dataLoaded = true;  // Set flag to true when data is loaded
    },
  },
})

export const { wordAdded, wordEdited, toggleIsEditing, wordDeleted, dataLoaded } = wordsSlice.actions

export default wordsSlice.reducer