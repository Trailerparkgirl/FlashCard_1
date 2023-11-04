import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';

const saveWord = (newWord) => {
  axios.post('http://localhost:3000/WordList', newWord)
    .then((response) => {
      console.log('Word saved:', response.data);
    })
    .catch((error) => {
      console.error('Error saving word:', error);
    });
};
saveWord();

export const WordsList = () => {
  const words = useSelector((state) => state.words)

  const renderedWords = words.map((word) => (
    <article className="post-excerpt" key={word.id}>
      <p className="post-content">{word.word} - {word.definition.substring(0, 100)}</p>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Words</h2>
      {renderedWords}
    </section>
  )
}
