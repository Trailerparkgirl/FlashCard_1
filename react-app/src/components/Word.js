import React from 'react';

const Word = ({word, editTrigger, deleteWord}) => {

  return (
    <div>
      <p>{word.word} - {word.definition}</p>
      <div>
        <button onClick={()=>editTrigger(word.id)}>edit</button>
        <button onClick={()=>deleteWord(word.id)}>delete</button>
      </div>
    </div>
  );
}

export default Word;  