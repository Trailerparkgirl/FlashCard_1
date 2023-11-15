import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { wordAdded } from './wordsSlice'


export const WordsList = () => {
  const words = useSelector((state) => state.words)
  const dispatch = useDispatch()

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

  const renderedWords = words.map((word) => (
    <article className="post-excerpt" key={word.id}>
      <p className="post-content">{word.word} - {word.definition.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Words</h2>
      {words.map((word)=>(
        word.isEditing ? <wordEditing/>: <wordForm/>
      }
    </section>
  )
}