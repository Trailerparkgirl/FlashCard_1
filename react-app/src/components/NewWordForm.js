import React, {useContext, useState} from 'react'
import { WordContext } from './WordContext';

export const NewWordForm = () => {
    const [value, setValue] = useState('');

    const {addWord} = useContext(WordContext)

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value) {
          // add word
          addWord(value);
          // clear form after submission
          setValue('');
        }
      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} placeholder='What is the word?' />
    <button type="submit">Add Task</button>
  </form>
  )
}
