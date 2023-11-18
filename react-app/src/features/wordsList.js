import React, {useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { wordAdded, wordEdited } from './wordsSlice'
import EditWordForm from '../components/EditWordForm'
import Word from '../components/Word'


export const WordsList = () => {
  const words = useSelector((state) => state.words)
  const dispatch = useDispatch()
  const [reduxWords, setWords]= useState(words);

  const storedWordsInLocal = JSON.parse(localStorage.getItem('words')) || [];

  // Iterate over storedWordsInLocal and add to Redux store if not present
  for (let i = 0; i < storedWordsInLocal.length; i++) {
    const checkWord = (word) => word.word === storedWordsInLocal[i].word;
    const result = words.filter(checkWord);

     // If the word is not present in the Redux store, add it
    if (result.length === 0) {
      dispatch(wordAdded(storedWordsInLocal[i]));
    }
  }
  console.log(words);

  // buh locald bga ugiig ustgalaa
  // localStorage.clear();

  // edit function g idevhijuulegch
  const editTrigger = id => {
    setWords(
      reduxWords.map((word)=>
        word.id === id ? {...word, isEditing: !word.isEditing } : word)
    );
    console.log(words);
  }
  
  // EditWordForm oos irsen ugiig redux store bolon localStorage luu shahna
  const editWord = (editedWord, editedDefinition, id) =>{
    dispatch(wordEdited({ id: id, updatedWord: { word: editedWord, definition: editedDefinition } }));

    setWords(
      words.map((word) =>
        word.id === id ? { ...word, word: editedWord, defition: editedDefinition, isEditing: !word.isEditing } : word
      )
    );
  }
  console.log()
  
  return (
    <section className="posts-list">
      <h2>Words</h2>
      {words.map((word)=>(
        word.isEditing ? <EditWordForm word={word} editWord={editWord}/>: <Word key={word.id} word={word} editTrigger={editTrigger}/>
      ))}
    </section>
  )
}