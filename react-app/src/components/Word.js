import React from 'react';

const Word = ({word, editTrigger}) => {

  return (
    <div>
      <p>{word.word}</p>
      <div>
        <button onClick={()=>editTrigger(word.id)}>edit</button>
        {/* <button onClick={()=>deleteWord(word.id)}>delete</button> */}
      </div>
    </div>
  );
}

export default Word;