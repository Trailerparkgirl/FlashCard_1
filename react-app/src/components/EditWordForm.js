import React, { useState } from 'react';

const EditWordForm = ({word, editWord}) => {
    const [wordValue, setValue] = useState(word.word);
    const [defiValue, setDefiValue] = useState(word.definition)

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editWord(wordValue, defiValue, word.id);
      };
  return (
    <form className="TodoForm">
    <input type="text" value={wordValue} onChange={(e) => setValue(e.target.value)} className="" placeholder='Update word' />
    <input type="text" value={defiValue} onChange={(e) => setDefiValue(e.target.value)} className="" placeholder='Update definition' />
    <button type="submit" className='' onClick={handleSubmit}>click</button>
  </form>
  )
}

export default EditWordForm;