import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { wordAdded } from "../features/wordsSlice";

const Home = () => {
  const dispatch = useDispatch()
  const [rndmWord, setRndmWord] = useState("click button below")
  const [rndmDefi, setRndmDefi] = useState("")
  const words = useSelector((state) => state.words)
  const length = words.length
  const [flipper, setFlipper] = useState(true);

  // restoring words from localStorage to redux store
  const storedWordsInLocal = JSON.parse(localStorage.getItem('words')) || [];

  // Iterate over storedWordsInLocal and add to Redux store if not present
  for (let i = 0; i < storedWordsInLocal.length; i++) {
    const checkWord = (word) => word.word === storedWordsInLocal[i].word;
    const result = words.filter(checkWord);

     // If the word is not present in the Redux store, add it
    if (result.length === 0) {
      dispatch(wordAdded(storedWordsInLocal[i]));
    }
  }

  const getRndmId = (max)=>{
    return Math.floor(Math.random()*max);
  }

  //searching for the random word
  const generateRndmWord = (e)=>{
    e.preventDefault();
    const rndmVal = words[getRndmId(length)];
    setRndmWord(rndmVal.word);
    setRndmDefi(rndmVal.definition)
    setFlipper(true)
  }
  const flipWord = () => {
    setFlipper(!flipper)
  };

    return (
    <div>
      {flipper? (<h1 onClick={flipWord}>{rndmWord}</h1>): (<h1 onClick={flipWord}>{rndmDefi}</h1>)}
      <button onClick={generateRndmWord}>generate a word</button>
    </div>)
  };
  
  export default Home;