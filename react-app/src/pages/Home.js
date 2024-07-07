import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { wordAdded } from "../features/wordsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch()
  const [rndmWord, setRndmWord] = useState("click button below")
  const words = useSelector((state) => state.words)
  const length = words.length
  const [wordResponse, setWordResponse] = useState([{definition: "HELLO"}])

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

  function getRndmId(max) {
    return Math.floor(Math.random() * max);
  }

  //searching for the random word
  const getRndmWord = (e) => {
    e.preventDefault();
    const rndmVal = words[getRndmId(length)];
    setRndmWord(rndmVal.word);
  }

  const getDefinition = async (e) => {
    await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.value}`)
                             .then((response) => 
                                {
                                  console.log(response)
                                  if (response.status=200) {
                                    setWordResponse(response.data[0].meanings[0].definitions)
                                    console.log("wordResponse", wordResponse)
                                  }
                                })
                             .catch((error) => { return ["Error", []]})
    console.log("XAXAXA", e)
  }

  return (
    <div>
      <h1>{rndmWord}</h1>
      <div>
        <button onClick={getRndmWord}>generate a word</button>
      </div>
      <div>
        <input type="text" placeholder="Search definition of word" onChange={getDefinition} />
      </div>
      <div>
        <p>
            {wordResponse.map((value, index) => {
            return <li key={index}>{value.definition}</li>
          })}
        </p>
      </div>
    </div>

  )
};

export default Home; 