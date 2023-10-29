import React, {useContext} from "react";
import { WordContext } from "../components/WordContext";

const WordList = () => {
  const { words } = useContext(WordContext);

  return(
    <div>
      {words.map((word)=>{
      return  <p key={word.id}>{word.newword}</p>
      })}
    </div>
  )
}

export default WordList;  