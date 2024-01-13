import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { wordAdded } from "../features/wordsSlice";
import axios from 'axios';

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


const userInput = "how humans forget things?"

const callChatGPT = async (prompt) => {
    try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: prompt }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer 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`,
            },
          }
        );
    
        return response.data.choices[0].message.content;
      } catch (error) {
        console.error('Error calling ChatGPT:', error);
        return 'An error occurred while processing your request.';
      }
}

useEffect(() => {
  const fetchData = async () => {
    try {
      console.log("requeting");
      const response = await callChatGPT(userInput);
      console.log(response)
      // Handle the response here
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };

  fetchData(); // Call the fetchData function

}, []); // The empty dependency array means this effect will run once after the initial render




    return (
    <div>
      {flipper? (<h1 onClick={flipWord}>{rndmWord}</h1>): (<h1 onClick={flipWord}>{rndmDefi}</h1>)}
      <button onClick={generateRndmWord}>generate a word</button>
      {/* <callChatGPT/>  */}
    </div>)
  };
  
  export default Home; 