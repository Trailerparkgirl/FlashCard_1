import React, { useState, useEffect, useCallback } from 'react'
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

      // Store the new word in IndexedDB
      storeWordInIndexedDB({ id: nanoid(), word, definition });

      setWord('')
      setdefinition('')
    }
  }

  const initializeIndexedDB = useCallback(async () => {
    const db = await openIndexedDB();
    if (db) {
      if (!db.objectStoreNames.contains('words')) {
        db.createObjectStore('words', { keyPath: 'id' });
      }
    }
  }, []);

// Initialize IndexedDB when the component is loaded
useEffect(() => {
    initializeIndexedDB();
  }, [initializeIndexedDB]);



  // Function to open the IndexedDB database
  const openIndexedDB = async () => {
    const openRequest = window.indexedDB.open('myDatabase', 1);

    return new Promise((resolve, reject) => {
      openRequest.onsuccess = (event) => {
        resolve(event.target.result);
      };

      openRequest.onerror = (event) => {
        console.error('Error opening IndexedDB:', event.target.error);
        reject(event.target.error);
      };
    });
  };

  // Function to store a word in IndexedDB
  const storeWordInIndexedDB = (wordData) => {
    openIndexedDB().then((db) => {
        console.log('Opened the database');
      const transaction = db.transaction(['words'], 'readwrite');
      console.log('Started transaction');
      const objectStore = transaction.objectStore('words');
      console.log('Accessed object store');
      objectStore.add(wordData);
      console.log('Added word to object store');
    });
  };

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
