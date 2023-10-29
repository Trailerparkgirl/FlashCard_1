import React, {createContext, useState} from "react";
import { v4 as uuidv4 } from "uuid";

export const WordContext = createContext();

export function WordProvider({children}){
    const [words, setWord]= useState([]);

    const addWord = (word)=>{
        setWord([...words, { id: uuidv4(), newword: word, isEditing: false}])
        console.log("aaaaa",words);
    }
    
    return (
        <WordContext.Provider value={{words, addWord}}>
            {children}
        </WordContext.Provider>
    );
}