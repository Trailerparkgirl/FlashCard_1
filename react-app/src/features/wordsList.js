import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toggleIsEditing, wordAdded, wordEdited, wordDeleted } from './wordsSlice'
import EditWordForm from '../components/EditWordForm'
import Word from '../components/Word'


export const WordsList = () => {
  const words = useSelector((state) => state.words)
  const dispatch = useDispatch()
  

  const storedWordsInLocal = JSON.parse(localStorage.getItem('words')) || [];

  // Iterate over storedWordsInLocal and add to Redux store if not present
  const updateReduxStore = () =>{
    for (let i = 0; i < storedWordsInLocal.length; i++) {
      const checkWord = (word) => word.word === storedWordsInLocal[i].word;
      const result = words.filter(checkWord);
  
       // If the word is not present in the Redux store, add it
      if (result.length === 0) {
        dispatch(wordAdded(storedWordsInLocal[i]));
      }
    }
  }
  updateReduxStore();
  
  console.log(words);

  // buh locald bga ugiig ustgalaa
  // localStorage.clear();

  // edit function g idevhijuulegch
  const editTrigger = id => {
    dispatch(toggleIsEditing({ id }));
  }
  
  // EditWordForm oos irsen ugiig redux store bolon localStorage luu shahna
  const editWord = (editedWord, editedDefinition, id) =>{
    dispatch(wordEdited({ id: id, updatedWord: { word: editedWord, definition: editedDefinition } }));
    dispatch(toggleIsEditing({ id: id }));
    //localStorage
    const updatedWord = storedWordsInLocal.map((word)=>
    word.id === id ? {...word, word: editedWord, definition: editedDefinition } : word
    )
    localStorage.setItem('words', JSON.stringify(updatedWord));
  }

  // Delete function
  const deleteWord = (id) =>{
    dispatch(wordDeleted({id}));
    //localStorage
    const newWordList = storedWordsInLocal.filter(word=> word.id !== id);
    localStorage.setItem('words', JSON.stringify(newWordList))
  }
  
  return (
    <section className="posts-list">
      <h2>Words</h2>
      {words.map((word)=>
        word.isEditing ? (<EditWordForm word={word} editWord={editWord}/>): (<Word key={word.id} word={word} editTrigger={editTrigger} deleteWord={deleteWord}/>)
      )}
    </section>
  )
}