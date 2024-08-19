// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { nanoid } from '@reduxjs/toolkit'
// import { wordAdded } from './wordsSlice'


// export const AddWordForm = () => {
//   const [word, setWord] = useState('')
//   const [definition, setDefinition] = useState('')

//   const dispatch = useDispatch()

//   const onTitleChanged = (e) => setWord(e.target.value)
//   const onContentChanged = (e) => setDefinition(e.target.value)

//   const onSavePostClicked = (e) => {
//     e.preventDefault();
//     if (word && definition) {
//         const newWord = {
//             id: nanoid(),
//             isEditing: false,
//             word,
//             definition,
//           };
    
//           // Dispatch the wordAdded action to update the Redux store
//           dispatch(wordAdded(newWord));
    
//           // Store the new word in localStorage
//           const existingWords = JSON.parse(localStorage.getItem('words')) || [];
//           const updatedWords = [...existingWords, newWord];
//           localStorage.setItem('words', JSON.stringify(updatedWords));
    
//           setWord('');
//           setDefinition('');
//     }
//   }

//   return (
//     <section>
//       <h2>Add a New word</h2>
//       <form onSubmit={onSavePostClicked}>
//         <label htmlFor="postTitle">Word:</label>
//         <input
//           type="text"
//           id="word"
//           name="word"
//           value={word}
//           onChange={onTitleChanged}
//         />
//         <label htmlFor="postContent">Definition:</label>
//         <input
//           id="text"
//           name="wordDefinion"
//           value= {definition}
//           onChange={onContentChanged}
//         />
//         <button type="submit">
//           Save Word
//         </button>
//       </form>
//     </section>
//   )
// }

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { wordAdded } from './wordsSlice';
import { nanoid } from '@reduxjs/toolkit'


export const AddWordForm = () => {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');

    const dispatch = useDispatch();

    const onTitleChanged = (e) => setWord(e.target.value);
    const onContentChanged = (e) => setDefinition(e.target.value);
    
    const onSavePostClicked = async (e) => {
        e.preventDefault();
        if (word && definition) {
            try {
                const id = nanoid()
                const response = await fetch('http://localhost:5000/words', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({id, word, definition }),
                });

                const newWord = await response.json();
                
                // Dispatch the wordAdded action to update the Redux store
                dispatch(wordAdded(newWord));

                setWord('');
                setDefinition('');
                console.log(word, definition, id);
            } catch (error) {
                console.error('Failed to save the word:', error);
            }
        }
    };

    return (
        <section>
            <h2>Add a New Word</h2>
            <form onSubmit={onSavePostClicked}>
                <label htmlFor="word">Word:</label>
                <input
                    type="text"
                    id="word"
                    name="word"
                    value={word}
                    onChange={onTitleChanged}
                />
                <label htmlFor="definition">Definition:</label>
                <input
                    id="definition"
                    name="definition"
                    value={definition}
                    onChange={onContentChanged}
                />
                <button type="submit">Save Word</button>
            </form>
        </section>
    );
};
