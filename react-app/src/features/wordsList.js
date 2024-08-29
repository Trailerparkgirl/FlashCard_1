import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wordAdded, wordEdited, wordDeleted, toggleIsEditing, dataLoaded } from './wordsSlice';
import EditWordForm from '../components/EditWordForm';
import Word from '../components/Word';

export const WordsList = () => {
  const words = useSelector((state) => state.words.words);
  const isDataLoaded = useSelector((state) => state.words.dataLoaded); // Access the dataLoaded flag
  const dispatch = useDispatch();

  // Fetch words from the MySQL database when the component mounts
  useEffect(() => {
    const fetchWords = async () => {
      if (!isDataLoaded) {  // Check if data has already been loaded
        try {
          const response = await fetch('http://localhost:5000/words');
          const data = await response.json();
          
          data.forEach((word) => {
            dispatch(wordAdded(word));
          });
          dispatch(dataLoaded());  // Set the dataLoaded flag to true
        } catch (error) {
          console.error('Failed to fetch words:', error);
        }
      }
    };

    fetchWords();
  }, [dispatch, isDataLoaded]);

  // Edit a word in the database and update the Redux store
  const editWord = async (editedWord, editedDefinition, id) => {
    try {
      const response = await fetch(`http://localhost:5000/words/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: editedWord, definition: editedDefinition }),
      });

      if (response.ok) {
        dispatch(wordEdited({ id, updatedWord: { word: editedWord, definition: editedDefinition } }));
        dispatch(toggleIsEditing({ id }));
      } else {
        console.error('Failed to edit the word');
      }
    } catch (error) {
      console.error('Failed to edit the word:', error);
    }
  };

  // Delete a word from the database and update the Redux store
  const deleteWord = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/words/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch(wordDeleted({ id }));
      } else {
        console.error('Failed to delete the word', response);
      }
    } catch (error) {
      console.error('Failed to delete the word:', error);
    }
  };

  console.log(words)

  return (
    <section className="posts-list">
      <h2>Words</h2>
      {words.map((word) =>
        word.isEditing ? (
          <EditWordForm key={word.id} word={word} editWord={editWord} />
        ) : (
          <Word key={word.id} word={word} editTrigger={() => dispatch(toggleIsEditing({ id: word.id }))} deleteWord={deleteWord} />
        )
      )}
    </section>
  );
};
