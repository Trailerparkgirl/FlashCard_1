import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { wordAdded } from './wordsSlice'

export const AddWordForm = () => {
  const [word, setWord] = useState('')
  const [definition, setdefinition] = useState('')

  const dispatch = useDispatch()

  const onTitleChanged = (e) => setWord(e.target.value)
  const onContentChanged = (e) => setdefinition(e.target.value)

  const onSavePostClicked = (e) => {
    e.preventDefault();
    if (word && definition) {
      dispatch(
        wordAdded({
          id: nanoid(),
          word,
         definition,
        })
      )

      setWord('')
      setdefinition('')
    }
  }

  return (
    <section>
      <h2>Add a New word</h2>
      <form onSubmit={onSavePostClicked}>
        <label htmlFor="postTitle">Word:</label>
        <input
          type="text"
          id="word"
          name="word"
          value={word}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Definition:</label>
        <input
          id="text"
          name="wordDefinion"
          value= {definition}
          onChange={onContentChanged}
        />
        <button type="submit">
          Save Word
        </button>
      </form>
    </section>
  )
}
