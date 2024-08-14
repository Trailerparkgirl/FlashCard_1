import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wordAdded } from "../features/wordsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [rndmWord, setRndmWord] = useState("click button below");
  const [rndmDefi, setRndmDefi] = useState("");
  const [flipper, setFlipper] = useState(true);
  const [aiResponse, setAiResponse] = useState(""); // State to store AI response

  const words = useSelector((state) => state.words);
  const length = words.length;

  // Restoring words from localStorage to redux store
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

  const getRndmId = (max) => {
    return Math.floor(Math.random() * max);
  }

  // Searching for the random word
  const generateRndmWord = (e) => {
    e.preventDefault();
    const rndmVal = words[getRndmId(length)];
    setRndmWord(rndmVal.word);
    setRndmDefi(rndmVal.definition);
    setFlipper(true);

    // Call AI model for the definition
    getAiResponse(rndmVal.word);
  }

  const flipWord = () => {
    setFlipper(!flipper);
  };

  // Function to call the Google Generative AI API and get a response
  const getAiResponse = async (word) => {
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI("AIzaSyCaUfNXRH1iY1maa-e36B5_iPNsPhJSDjU");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const prompt = `define ${word} with one sentence in english.`;
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      setAiResponse(response);  // Update state with AI response
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  }

  return (
    <div>
      {flipper ? (
        <h1 onClick={flipWord}>{rndmWord}</h1>
      ) : (
        <h1 onClick={flipWord}>{rndmDefi}</h1>
      )}
      <button onClick={generateRndmWord}>Generate a word</button>

      {/* Render AI response here */}
      {aiResponse && (
        <div>
          <h2>AI Definition:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default Home;