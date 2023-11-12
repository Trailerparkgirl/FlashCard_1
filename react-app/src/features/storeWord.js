import React from 'react';
import { useDispatch } from 'react-redux';
import { wordAdded } from './wordsSlice';

export const WordList = () => {
  const dispatch = useDispatch();

  // // Retrieve stored words from localStorage during component initialization
  // useEffect(() => {
  //   const storedWords = JSON.parse(localStorage.getItem('words')) || [];

  //   // Dispatch the wordAdded action for each stored word to update the Redux store
  //   storedWords.forEach((word) => {
  //     dispatch(wordAdded(word));
  //   });
  // }, [dispatch]);

  // // Rest of your WordList component code...
};