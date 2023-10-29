import React from "react";
import { WordProvider } from "../components/WordContext";
import { NewWordForm } from "../components/NewWordForm";

const AddWord = () => {

  return (
    <WordProvider>
      <div>
        <h1>get words memorized</h1>
        <NewWordForm />
      </div>
    </WordProvider>
  );
  
};
export default AddWord;
