import React from "react"
   
let SRContext = React.createContext({
        loadLangWords: () =>{},
        updateLangWords:()=>{},
        submitAnswer: () =>{}, 
        language: {},
        languages: [],
        allWords: {},
        words: []
    })
export default SRContext;